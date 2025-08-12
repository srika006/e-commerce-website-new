import { useState,useContext } from "react";
import {PageContainer} from "../context/PageContextProvider";

const Productitems = ({ product }) => {
  const [bool, setBool] = useState(true);
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(PageContainer);

  return (
    <div
      key={product.id}
      className="flex flex-col w-full m-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
     
      <div className=" bg-gray-50 dark:bg-gray-700 ">
        <img
          src={product.image}
          alt={product.title}
          className=" h-75 w-full object-cover p-4 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow p-4 text-center">
        <h1 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 mb-2">
          {product.title}
        </h1>
        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">
          ${product.price}
        </p>

        
        {bool ? (
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2 rounded-full shadow-md transition-colors duration-200"
             onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </button>
            <p className="text-lg font-medium text-gray-800 dark:text-white">
              {count}
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              onClick={() => {
                if (count <= 1) {
                  setBool(true);
                  setCount(1);
                } else {
                  setCount((prev) => prev - 1);
                }
              }}
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productitems;
