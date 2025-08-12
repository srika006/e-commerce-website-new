import React, { useContext } from "react";
import { PageContainer } from "../context/PageContextProvider";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(PageContainer);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Empty Cart"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
        <p className="text-gray-400 mt-2">Start adding some products!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                  ${item.price}
                </p>
              </div>
            </div>

           
            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <button
                onClick={() => decreaseQty(item.id)}
                className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                −
              </button>
              <span className="text-lg font-medium">{item.qty}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                +
              </button>
            </div>

              
            <div className="flex flex-col items-end mt-3 md:mt-0">
              <p className="font-bold text-gray-800 dark:text-white">
                ${(item.price * item.qty).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:text-red-700 mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex justify-end mt-6 border-t pt-4">
        <h3 className="text-xl font-bold">
          Total:{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            ${total.toFixed(2)}
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Cart;
