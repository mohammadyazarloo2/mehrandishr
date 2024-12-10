"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Head from "next/head";
import Image from "next/image";

export default function Page({ params }) {
  const [activeTab, setActiveTab] = useState("description");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await fetch(`/api/category/findcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: categoryId }),
      });
      const data = await response.json();
      setCategoryName(data.message.name);
    } catch (error) {
      console.log("Error fetching category:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/findproduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: params.id }),
        });
        const data = await response.json();
        setProduct(data.message);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProduct();
    }
  }, [params.id]);

  useEffect(() => {
    if (product?.category) {
      fetchCategoryName(product.category);
    }
  }, [product]);

  const LoadingSkeleton = () => (
    <div>
      {/* Breadcrumb Skeleton */}
      <div className="breadcrumbs">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-6 w-24 bg-gray-200 animate-pulse rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="products-container">
        {/* Product Image Skeleton */}
        <div className="products-img">
          <div className="h-96 w-full bg-gray-200 animate-pulse rounded-xl" />
        </div>

        {/* Product Details Skeleton */}
        <div className="products-info">
          <div className="space-y-6">
            {/* Title */}
            <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-3/4" />

            {/* Instructor */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-4 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section Skeleton */}
      <div className="product-tabs mt-12 max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-xl p-2">
          <div className="flex gap-2">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-12 flex-1 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Tab Content Skeleton */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
              >
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Products Skeleton */}
      <div className="suggested-products mt-16 mb-8 px-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 animate-pulse rounded" />
                <div className="flex justify-between items-center">
                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return loading ? (
    <LoadingSkeleton />
  ) : (
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
              {product.title}
            </Link>
          </li>
        </ul>
      </div>
      <div className="products-container">
        <div className="products-img">
          <img src={product?.images} alt="" width={100} height={100} />
        </div>
        <div className="products-info">
          <div className="products-info-title">
            <h1> {product.title} </h1>
          </div>
          <div className="products-info-price">
            <span>دسته‌بندی :</span>
            <span>{categoryName}</span>
          </div>
          <div className="products-info-price">
            <span>مدرس :</span>
            <span>محمد یازرلو</span>
          </div>
          <div className="products-info-price">
            <span>قیمت :</span>
            <span> {product.price.toLocaleString()} تومان </span>
          </div>
          <div className="products-info-description">
            <span>توضیحات :</span>
            <div className="space-y-6">
              {product.description.includes("<") ? (
                <div
                  className="prose prose-lg rtl max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <div className="prose prose-lg rtl">{product.description}</div>
              )}
            </div>
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
            <div className="space-y-8">
              {/* فرم ثبت نظر جدید */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-6">ثبت نظر جدید</h3>
                <form className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        نام شما
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="نام خود را وارد کنید"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="ایمیل خود را وارد کنید"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      امتیاز شما
                    </label>
                    <div className="flex gap-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      متن نظر
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="نظر خود را بنویسید..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    ثبت نظر
                  </button>
                </form>
              </div>

              {/* نمایش نظرات قبلی */}
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
            </div>
          )}
        </div>
      </div>

      <div className="suggested-products mt-16 mb-8 px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">محصولات مشابه</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* {data
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
                      <span className="text-green-500 font-bold">
                        {product.price.toLocaleString()} تومان
                      </span>
                      <span className="bg-yellow-400/10 text-primary text-sm py-1 px-3 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))} */}
        </div>
      </div>
    </div>
  );
}
