"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Head from "next/head";
import Image from "next/image";
import { products } from "@/app/data/products";

const data = products;

export default function Page({ params }) {
  const [activeTab, setActiveTab] = useState("description");

  const item = data.find(
    (item) =>
      item.title === decodeURIComponent(params.id.toString().replace(/-/g, " "))
  );
  const title = decodeURIComponent(params.id.toString().replace(/-/g, " "));
  console.log(title);
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
      <div class="breadcrumbs">
        <ul class="breadcrumb-nav">
          <li class="breadcrumb-item">
            <Link class="text-white hover:text-primary" href="/">
              صفحه اصلی
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class="text-white hover:text-primary" href="/pages/Products">
              محصولات
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class=" text-primary" href="#">
              {decodeURIComponent(params.id.toString().replace(/-/g, " "))}
            </Link>
          </li>
        </ul>
      </div>
      <div className="products-container">
        <div className="products-img">
          <Image src="/img/2.png" alt="" width={100} height={100} />
        </div>
        <div className="products-info">
          <div className="products-info-title">
            <h1> {item.title} </h1>
          </div>
          <div className="products-info-price">
            <span>مدرس :</span>
            <span>محمد یازرلو</span>
          </div>
          <div className="products-info-price">
            <span>قیمت :</span>
            <span> {item.price.toLocaleString()} تومان </span>
          </div>
          <div className="products-info-description">
            <span>توضیحات :</span>
            <p> {item.description} </p>
          </div>
        </div>
      </div>

      <div className="product-tabs mt-12 max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-xl p-2">
          <nav className="flex gap-2" aria-label="Tabs">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "description"
                  ? "bg-white shadow-md text-primary transform -translate-y-0.5"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("description")}
            >
              توضیحات و سرفصل‌ها
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "reviews"
                  ? "bg-white shadow-md text-primary transform -translate-y-0.5"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              نظرات و امتیازها
            </button>
          </nav>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                سرفصل‌های دوره
              </h3>
              <div className="grid gap-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {item}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-800">فصل {item}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        توضیحات مربوط به این فصل از دوره
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div
                  key={review}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">کاربر</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          کاربر {review}
                        </h4>
                        <p className="text-sm text-gray-500">2 روز پیش</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    این دوره عالی بود و من خیلی چیزها یاد گرفتم. مطالب کاملاً
                    کاربردی و به روز بودند.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="suggested-products mt-16 mb-8 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">محصولات مشابه</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {data
            .filter(
              (product) =>
                product.category === item.category && product.id !== item.id
            )
            .slice(0, 4)
            .map((product) => (
              <Link
                href={`/pages/Products/details/${product.title.replace(
                  / /g,
                  "-"
                )}`}
                key={product.id}
              >
                <div className="suggested-product-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/img/lan/html.png"
                      alt={product.title}
                      fill
                      className="object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">
                        {product.price.toLocaleString()} تومان
                      </span>
                      <span className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
