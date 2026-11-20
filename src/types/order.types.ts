import type { CartItem } from "./cart.types";

export type PaymentMethod = "COD" | "UPI" | "CARD";

export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shipping: number;
    total: number;
    createdAt: string;
}