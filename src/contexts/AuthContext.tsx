// FILE PATH: src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
  authApi, wishlistApi, loyaltyApi, notificationsApi, referralApi,
  UserProfile, SavedAddress, WishlistItem, LoyaltyTransaction,
  Notification, Referral,
} from '@/lib/api';

export type { SavedAddress, UserProfile };

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  // Auth
  register: (email: string, password: string, firstName: string, lastName: string, phone: string, country: string, referralCode?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (current: string, next: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  // Profile
  updateUserProfile: (data: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'phone'>>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  refreshUser: () => Promise<void>;
  // Addresses
  addAddress: (addr: Omit<SavedAddress, 'id'>) => Promise<void>;
  updateAddress: (id: string, addr: Partial<SavedAddress>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  // Wishlist
  wishlist: WishlistItem[];
  wishlistLoading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlistRestock: (id: string, notify: boolean) => Promise<void>;
  // Loyalty
  loyaltyPoints: number;
  loyaltyTier: string;
  loyaltyHistory: LoyaltyTransaction[];
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  // Referral
  referralCode: string;
  referralStats: { referred: number; completed: number; bonusEarned: number };
  referrals: Referral[];
}

const AuthContext = createContext<AuthContextValue | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loyaltyTier, setLoyaltyTier] = useState('bronze');
  const [loyaltyHistory, setLoyaltyHistory] = useState<LoyaltyTransaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({ referred: 0, completed: 0, bonusEarned: 0 });
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // ── Restore session on mount ───────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('xpola_token');
    if (!token) { setLoading(false); return; }
    authApi.getProfile()
      .then(profile => { setUser(profile); loadUserData(); })
      .catch(() => { localStorage.removeItem('xpola_token'); })
      .finally(() => setLoading(false));
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      setWishlistLoading(true);
      const [w, lb, lh, n, r] = await Promise.allSettled([
        wishlistApi.getAll(),
        loyaltyApi.getBalance(),
        loyaltyApi.getHistory(),
        notificationsApi.getAll(),
        referralApi.getCode(),
      ]);
      if (w.status === 'fulfilled') setWishlist(w.value);
      if (lb.status === 'fulfilled') { setLoyaltyPoints(lb.value.points); setLoyaltyTier(lb.value.tier); }
      if (lh.status === 'fulfilled') setLoyaltyHistory(lh.value);
      if (n.status === 'fulfilled') setNotifications(n.value);
      if (r.status === 'fulfilled') { setReferralCode(r.value.code); setReferralStats(r.value.stats); }
    } finally {
      setWishlistLoading(false);
    }
  }, []);

  // ── refreshUser: re-fetches profile from API and updates user state ────────
  // Call this after email verification so emailVerified flips to true without
  // requiring a logout/login cycle.
  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('xpola_token');
    if (!token) return;
    try {
      const freshProfile = await authApi.getProfile();
      setUser(freshProfile);
    } catch (err) {
      console.error('[AuthContext] refreshUser failed:', err);
    }
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string, phone: string, country: string, referralCode?: string) => {
    const { token, user: profile } = await authApi.register({ email, password, firstName, lastName, phone, country, referralCode });
    localStorage.setItem('xpola_token', token);
    setUser(profile);
    loadUserData();
  };

  const login = async (email: string, password: string) => {
    const { token, user: profile } = await authApi.login(email, password);
    localStorage.setItem('xpola_token', token);
    setUser(profile);
    loadUserData();
  };

  const logout = () => {
    localStorage.removeItem('xpola_token');
    setUser(null);
    setWishlist([]); setNotifications([]); setLoyaltyPoints(0);
    setLoyaltyTier('bronze'); setLoyaltyHistory([]);
    setReferralCode(''); setReferrals([]);
  };

  const resetPassword = async (email: string) => { await authApi.resetPassword(email); };
  const changePassword = async (current: string, next: string) => { await authApi.changePassword(current, next); };
  const deleteAccount = async (password: string) => { await authApi.deleteAccount(password); logout(); };

  const updateUserProfile = async (data: Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'phone'>>) => {
    await authApi.updateProfile(data);
    setUser(prev => prev ? { ...prev, ...data } : prev);
  };

  const uploadAvatar = async (file: File) => {
    const { url } = await authApi.uploadAvatar(file);
    setUser(prev => prev ? { ...prev, avatar: url } : prev);
  };

  const addAddress = async (addr: Omit<SavedAddress, 'id'>) => {
    const { id } = await authApi.addAddress(addr);
    const newAddr: SavedAddress = { ...addr, id };
    setUser(prev => {
      if (!prev) return prev;
      const addresses = addr.isDefault
        ? [...prev.addresses.map(a => ({ ...a, isDefault: false })), newAddr]
        : [...prev.addresses, newAddr];
      return { ...prev, addresses };
    });
  };

  const updateAddress = async (id: string, addr: Partial<SavedAddress>) => {
    await authApi.updateAddress(id, addr);
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.map(a => a.id === id ? { ...a, ...addr } : a) } : prev);
  };

  const deleteAddress = async (id: string) => {
    await authApi.deleteAddress(id);
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : prev);
  };

  const setDefaultAddress = async (id: string) => {
    await authApi.setDefaultAddress(id);
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === id })) } : prev);
  };

  // ── Wishlist ───────────────────────────────────────────────────────────────
  const addToWishlist = async (productId: string) => {
    const { id } = await wishlistApi.add(productId);
    setWishlist(prev => [...prev, { id, productId, product: {} as any, addedAt: new Date().toISOString(), notifyOnRestock: false }]);
  };

  const removeFromWishlist = async (id: string) => {
    await wishlistApi.remove(id);
    setWishlist(prev => prev.filter(w => w.id !== id));
  };

  const isInWishlist = (productId: string) => wishlist.some(w => w.productId === productId);

  const toggleWishlistRestock = async (id: string, notify: boolean) => {
    await wishlistApi.toggleRestock(id, notify);
    setWishlist(prev => prev.map(w => w.id === id ? { ...w, notifyOnRestock: notify } : w));
  };

  // ── Notifications ──────────────────────────────────────────────────────────
  const markNotificationRead = async (id: string) => {
    await notificationsApi.markRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = async () => {
    await notificationsApi.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      register, login, logout, resetPassword, changePassword, deleteAccount,
      updateUserProfile, uploadAvatar, refreshUser,
      addAddress, updateAddress, deleteAddress, setDefaultAddress,
      wishlist, wishlistLoading, addToWishlist, removeFromWishlist,
      isInWishlist, toggleWishlistRestock,
      loyaltyPoints, loyaltyTier, loyaltyHistory,
      notifications, unreadCount, markNotificationRead, markAllNotificationsRead,
      referralCode, referralStats, referrals,
    }}>
      {children}
    </AuthContext.Provider>
  );
};