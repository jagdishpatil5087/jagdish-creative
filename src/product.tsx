"use client";
import React from "react";

const products = [
  {
    id: 1,
    title: "Cute Hugging Teddy Bear for Your Sweetheart ",
    image: "https://m.media-amazon.com/images/I/71LyxHucSsL._SL1500_.jpg",
    rating: "4.5",
    reviews: "8K+ ratings",
    description:
      "Super soft plush teddy bear perfect gift for girlfriend, boyfriend, birthdays and Valentine's day. Premium quality fabric.",
    amazon: "https://amzn.to/4qsTn8H",
    flipkart: "",
  },
  {
    id: 2,
    title: "Romantic Heart Teddy Bear for Your Sweetheart ",
    image: "https://m.media-amazon.com/images/I/617OBlRSVTL._SL1280_.jpg",
    rating: "4.3",
    reviews: "3K+ ratings",
    description:
      "Adorable heart holding teddy bear specially designed for romantic gifting occasions and surprises.",
    amazon: "https://amzn.to/4qp1x1K",
    flipkart: "",
  },
  {
    id: 3,
    title: "Teddy Bear for Your Sweetheart ",
    image: "https://m.media-amazon.com/images/I/61WBcBfY-+L._SL1280_.jpg",
    rating: "4.4",
    reviews: "5K+ ratings",
    description:
      "Cute small teddy perfect for surprise gifts, return gifts and decoration.",
    amazon: "https://amzn.to/4qmCWKZ",
    flipkart: "",
  },
];

const Product = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Increased max-width to allow space for 3 columns */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Best Teddy Bears for Gifting 💝
        </h1>

        {/* Product Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md border flex flex-col h-full transition-transform hover:-translate-y-1"
            >
              {/* Image Section - Fixed Height */}
              <div className="h-96 w-full p-10 overflow-hidden rounded-t-2xl ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full  hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 gap-3 mt-6">
                  {/* Amazon */}
                  <a
                    href={item.amazon || "#"}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`text-center py-2.5 rounded-xl text-sm font-semibold transition ${
                      item.amazon
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Buy now on Amazon
                  </a>
                </div>

                {/* Disclosure */}
                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  *As an Amazon Associate, I earn from qualifying purchases.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
