// FILE PATH: src/hooks/usePaystack.ts
// Place this file at: src/hooks/usePaystack.ts

interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo (multiply NGN by 100)
  currency?: string;
  ref?: string;
  metadata?: Record<string, unknown>;
  onSuccess: (reference: { reference: string }) => void;
  onClose: () => void;
  onError?: (error: unknown) => void;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions & { callback: (ref: { reference: string }) => void; onClose: () => void }) => { openIframe: () => void };
    };
  }
}

const loadPaystackScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
};

export const usePaystack = (options: PaystackOptions) => {
  const initializePayment = async () => {
    try {
      await loadPaystackScript();
      if (typeof window.PaystackPop?.setup !== 'function') {
        throw new Error('Paystack checkout is not available');
      }

      // Paystack validates these two properties at runtime. Wrap the supplied
      // handlers so the SDK always receives real function values.
      const callback = (reference: { reference: string }) => {
        if (typeof options.onSuccess === 'function') options.onSuccess(reference);
      };
      const onClose = () => {
        if (typeof options.onClose === 'function') options.onClose();
      };

      const handler = window.PaystackPop.setup({
        key:      options.key,
        email:    options.email,
        amount:   options.amount,
        currency: options.currency || 'NGN',
        ref:      options.ref || `xpola_${Date.now()}`,
        metadata: options.metadata || {},
        callback,
        onClose,
      });
      if (!handler || typeof handler.openIframe !== 'function') {
        throw new Error('Paystack checkout could not be opened');
      }
      handler.openIframe();
    } catch (err) {
      console.error('Paystack initialization failed:', err);
      options.onError?.(err);
    }
  };

  return initializePayment;
};
