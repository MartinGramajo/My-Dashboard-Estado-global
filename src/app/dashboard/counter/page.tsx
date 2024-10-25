
// prc - para crear el component page

import { CartCounter } from "@/app/shopping-cart/components";
import type { Metadata } from "next";


// mr snippets
export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Counter client side',
};


export default function CounterPage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>
        Productos en el carrito
      </span>

      <CartCounter value={20} />


    </div>
  );
}
