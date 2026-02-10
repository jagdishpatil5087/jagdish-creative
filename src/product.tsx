"use client";
import React from "react";

const products = [
  {
    id: 1,
    title: "Pillow Cushion Gift",
    image: "https://m.media-amazon.com/images/I/51lc7AZBVJL._SL1200_.jpg",
    rating: "4.5",
    reviews: "8K+ ratings",
    description:
      "Pillow Cushion Gift for Valentine's Day Anniversary Engagement Birthday Wife Husband Love Romantic Couple Gift with Cushion Filler (16 inch x 16 inch) (Design 29)",
    amazon: "https://amzn.to/4a7g0dY",
    flipkart: "",
  },
  {
    id: 1,
    title: "The Purple Tree Cute Panda Couple Customized Name Pillow ",
    image: "https://m.media-amazon.com/images/I/61UnwLOBrHL._SL1024_.jpg",
    rating: "4.5",
    reviews: "8K+ ratings",
    description:
      "The Purple Tree Cute Panda Couple Customized Name Pillow (Pack of 1,16x16 Inches) Valentine's Day Gift Couple Name Pillow, Personalized Gift for Girlfriend Boyfriend, Wife",
    amazon: "https://amzn.to/3O4n2Yo",
    flipkart: "",
  },
  {
    id: 2,
    title: "Heart Shaped Valentines Day Gift Box",
    image: "https://m.media-amazon.com/images/I/711UURikyxL._SL1500_.jpg",
    rating: "4.5",
    reviews: "8K+ ratings",
    description:
      "eCraftIndia Heart Shaped Valentines Day Gift Box with I Love You Message Teddy Bear 3 Red Roses Valentine Gift for Girlfriend Boyfriend Husband Wife Valentines Day Gift Valentine Day Decoration Items",
    amazon: "https://amzn.to/46B6GN1",
    flipkart: "",
  },
  {
    id: 3,
    title: "My Heart Beats Only for You Wooden Showpiece",
    image: "https://m.media-amazon.com/images/I/71gPrycs60L._SL1500_.jpg",
    rating: "4.5",
    reviews: "8K+ ratings",
    description:
      "eCraftIndia My Heart Beats Only for You Wooden Showpiece & Heart Shaped Gift Box Teddy Roses Valentine Gift for Girlfriend Boyfriend Husband Wife Valentines Day Gifts Valentine Day Decoration Items",
    amazon: "https://amzn.to/4raovek",
    flipkart: "",
  },
  {
    id: 4,
    title: "Flower Bouquet ",
    image: "https://m.media-amazon.com/images/I/619qYFWvgnL._SL1080_.jpg",
    rating: "4.5",
    reviews: "8K+ ratings",
    description:
      "SATYAM KRAFT 1 Pcs Artificial Flower Bouquet | Perfect Valentine Gift for Him Her Girlfriend Boyfriend Wife Husband | Romantic Decor for Anniversary, Wedding, Birthday (Rose Bouquet)",
    amazon: "https://amzn.to/4tnTQM9",
    flipkart: "",
  },

  {
    id: 5,
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
    id: 6,
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

// https://amzn.to/4qDsD5C

const Product = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Increased max-width to allow space for 3 columns */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Gifts That Say “I Love You” This Valentine 💞
        </h1>

        {/* Product Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md border flex flex-col h-full transition-transform hover:-translate-y-1"
            >
              {/* Image Section - Fixed Height */}
              <div className="h-70 w-full p-5 overflow-hidden rounded-t-2xl ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full  hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Section */}
              <div className="p-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-3 text-[12px] line-clamp-3">
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
