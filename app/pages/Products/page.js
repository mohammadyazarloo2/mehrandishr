"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { products } from "@/app/data/products";
import { useState } from "react";

export default function Products() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); // تعداد محصولات در هر صفحه
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...products].sort((a, b) =>
      order === "asc" ? a.id - b.id : b.id - a.id
    );
    setSortedProducts(sorted);
  };

  const handlePrice = (order) => {
    const sorted = [...products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div class="breadcrumbs">
        <ul class="breadcrumb-nav">
          <li class="breadcrumb-item">
            <Link class="text-white hover:text-primary" href="/">
              صفحه اصلی
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class="text-primary" href="#">
              محصولات
            </Link>
          </li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      

        <div className="flex items-start gap-8">
          {/* Sidebar */}
          <aside className="w-64 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">دسته‌بندی</h3>
                <ul className="space-y-2">
                  {["شلوار", "مانتو", "پیراهن", "کمربند", "کلاه"].map((cat) => (
                    <li
                      key={cat}
                      className="cursor-pointer hover:text-primary transition"
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">برندها</h3>
                <ul className="space-y-2">
                  {["نایک", "آدیداس", "پوما", "ریبوک"].map((brand) => (
                    <li
                      key={brand}
                      className="cursor-pointer hover:text-primary transition"
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {["ارزان‌ترین", "گران‌ترین", "جدیدترین", "پربازدیدترین"].map(
                    (filter) => (
                      <button
                        key={filter}
                        onClick={() =>
                          handlePrice(filter === "ارزان‌ترین" ? "asc" : "desc")
                        }
                        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition"
                      >
                        {filter}
                      </button>
                    )
                  )}
                </div>

                <select
                  value={sortOrder}
                  onChange={(e) => handleSort(e.target.value)}
                  className="rounded-lg border-gray-200 focus:ring-primary"
                >
                  <option value="asc">نزولی</option>
                  <option value="desc">صعودی</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src='/img/lan/html.png'
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-primary font-bold">
                          {product.price.toLocaleString()} تومان
                        </span>
                        {product.discount && (
                          <span className="text-sm text-gray-500 line-through mr-2">
                            {(product.price * 1.2).toLocaleString()} تومان
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/pages/Products/details/${encodeURIComponent(
                          product.title.replace(/\s+/g, "-")
                        )}`}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                      >
                        خرید
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
            <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  {Array.from({
                    length: Math.ceil(sortedProducts.length / productsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}
