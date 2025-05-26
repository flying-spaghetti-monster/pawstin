declare module "*.scss";

// Define the CartItem type if not already defined or import it from the correct module
type CartItem = {
    id: string;
    qty: number;
    // add other properties as needed
};

interface CartStore {
    plis: CartItem[];
    qty: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}