// src/components/PaystackButton.tsx
//
// Example usage of the usePaystack hook.
// Replace react-paystack's <PaystackButton> with this component.

import { usePaystack } from '../hooks/usePaystack';

interface Props {
  email: string;
  amountNGN: number;      // pass in Naira — we convert to kobo internally
  cartId?: string;
  label?: string;
  className?: string;
  onSuccess: (ref: { reference: string; status: string }) => void;
  onClose: () => void;
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

export default function PaystackButton({
  email,
  amountNGN,
  cartId,
  label = 'Pay Now',
  className = '',
  onSuccess,
  onClose,
}: Props) {
  const initializePayment = usePaystack({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: amountNGN * 100,   // convert NGN → kobo
    currency: 'NGN',
    ref: cartId ? `xpola_${cartId}_${Date.now()}` : undefined,
    onSuccess,
    onClose,
  });

  return (
    <button
      onClick={initializePayment}
      className={className}
    >
      {label}
    </button>
  );
}
