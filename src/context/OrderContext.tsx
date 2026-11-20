import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { Order } from "../types/order.types";

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
}

const OrderContext = createContext<
    OrderContextType | undefined
>(undefined);

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider = ({
    children,
}: OrderProviderProps) => {
    const [orders, setOrders] = useState<Order[]>(() => {
        const savedOrders = localStorage.getItem("stylecart-orders");

        return savedOrders
            ? (JSON.parse(savedOrders) as Order[])
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "stylecart-orders",
            JSON.stringify(orders)
        );
    }, [orders]);

    const addOrder = (order: Order) => {
        setOrders((prev) => [order, ...prev]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error(
            "useOrders must be used inside OrderProvider"
        );
    }

    return context;
};