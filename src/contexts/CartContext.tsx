// FILE PATH: src/contexts/CartContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApiProduct } from '@/lib/api';

export interface CartItem extends ApiProduct {
  image: string;
  category: ReactNode;
  quantity: number;
}

interface CartContextType {
  cart:                CartItem[];
  addToCart:           (product: ApiProduct) => boolean;
  removeFromCart:      (id: number) => void;
  updateQuantity:      (id: number, quantity: number) => void;
  clearCart:           () => void;
  cartTotal:           number;
  cartCount:           number;
  currency:            string;
  isCartOpen:          boolean;
  setIsCartOpen:       (open: boolean) => void;
  blockedMessage:      string | null;
  clearBlockedMessage: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('xpola_cart') || '[]'); }
    catch { return []; }
  });
  const [isCartOpen,     setIsCartOpen]     = useState(false);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('xpola_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ApiProduct): boolean => {
    // Block mixing Nigeria & Canada items
    if (cart.length > 0 && cart[0].country !== product.country) {
      const cartFlag = cart[0].country === 'NG' ? '🇳🇬 Nigeria' : '🇨🇦 Canada';
      const itemFlag = product.country   === 'NG' ? '🇳🇬 Nigeria' : '🇨🇦 Canada';
      setBlockedMessage(
        `You have items from the ${cartFlag} store. Clear your cart to add items from ${itemFlag}.`
      );
      setIsCartOpen(true);
      return false;
    }
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      const newItem: CartItem = {
        ...product,
        image: product.image_path || '',
        category: product.category_name || '',
        quantity: 1,
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart      = (id: number)            => setCart(prev => prev.filter(i => i.id !== id));
  const updateQuantity      = (id: number, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const clearCart           = ()                        => { setCart([]); localStorage.removeItem('xpola_cart'); };
  const clearBlockedMessage = ()                        => setBlockedMessage(null);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const currency  = cart[0]?.currency ?? 'NGN';

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, currency,
      isCartOpen, setIsCartOpen,
      blockedMessage, clearBlockedMessage,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
