// FILE PATH: src/lib/orderService.ts

import { apiFetch } from '@/lib/api';
import type { Order } from '@/lib/api';

export type { Order };

export interface OrderItem {
  id:       number | string;
  name:     string;
  price:    number;
  quantity: number;
  currency: string;
  image:    string;
  category: string;
}

// snake_case to match PHP backend expectations
export interface CreateOrderPayload {
  customer_name:    string;
  customer_email:   string;
  customer_phone:   string;
  delivery_address: string;
  delivery_city:    string;
  delivery_state:   string;
  delivery_area_id?: number;
  delivery_fee:     number;
  discount_code?:   string;
  subtotal:         number;
  total_amount:     number;
  currency?:        string;
  country:          string;
  payment_method?:  string;
  idempotency_key?: string;
  order_items:      OrderItem[];
  notes?:           string;
}

export const saveOrder = async (
  payload: CreateOrderPayload,
): Promise<{ order_ref: string; id: number; server_total?: number }> => {
  const token = localStorage.getItem('xpola_token');
  const d = await apiFetch<{ success: boolean; order_ref: string; id: number; server_total?: number }>(
    '/orders.php',
    { method: 'POST', body: JSON.stringify(payload) },
    token,
  );
  return { order_ref: d.order_ref, id: d.id, server_total: d.server_total };
};

export const fetchUserOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem('xpola_token');
  const d = await apiFetch<{ success: boolean; data: Order[] }>('/orders.php', {}, token);
  return d.data;
};

export const fetchOrderByRef = async (ref: string): Promise<Order | null> => {
  const token = localStorage.getItem('xpola_token');
  try {
    const d = await apiFetch<{ success: boolean; data: Order }>(
      `/orders.php?ref=${encodeURIComponent(ref)}`, {}, token,
    );
    return d.data;
  } catch { return null; }
};

export const fetchDeliveryFees = async (country: 'NG' | 'CA') => {
  const d = await apiFetch<{ data: { id: number; area: string; state: string; country: string; fee: number }[] }>(
    `/delivery_fees.php?country=${country}&active=1`
  );
  return d.data;
};