export interface MerchOrder {
    orderId: string;
    name: string;
    email: string;
    phone: string | null;
    amount: number;
    status: string;
    size: string;
}