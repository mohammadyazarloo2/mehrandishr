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
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });

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

        // Update view count
        await fetch(`/api/products/updateViews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: params.id }),
        });
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

  const fetchReviews = async () => {
    try {
      console.log("Fetching reviews for product:", params.id);
      const response = await fetch(`/api/reviews?productId=${params.id}`);
      const data = await response.json();
      console.log("Fetched reviews:", data);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newReview.rating) {
        alert("لطفا امتیاز را انتخاب کنید");
        return;
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newReview,
          productId: params.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطا در ثبت نظر");
      }

      // Clear form and refresh reviews
      setNewReview({ name: "", email: "", rating: 0, comment: "" });
      fetchReviews();
      alert("نظر شما با موفقیت ثبت شد");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message || "خطا در ثبت نظر");
    }
  };

  useEffect(
    () => {
      if (product?.category) {
        fetchCategoryName(product.category);
      }
      fetchReviews();
    },
    [product],
    [params.id]
  );

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
          {categoryName && (
            <>
              <li class="breadcrumb-item">
                <Link class="text-white hover:text-primary" href="#">
                  {categoryName}
                </Link>
              </li>
              <FaChevronLeft color="#fff" />
            </>
          )}

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
          <div className="products-info-title flex justify-between items-center">
            <h1> {product.title} </h1>
            <div className="products-info-price">
              <span>تعداد بازدید:</span>
              <span>{product.views || 0}</span>
            </div>
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
            <span>
              {" "}
              {new Intl.NumberFormat("fa-IR", {
                style: "decimal",
                maximumFractionDigits: 0,
              }).format(product.price)}{" "}
              تومان{" "}
            </span>
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
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <span>سرفصل‌های دوره</span>
                <span className="text-sm font-normal text-gray-500">
                  ({product?.chapters?.length} جلسه)
                </span>
              </h3>

              <div className="grid gap-4">
                {product?.chapters?.map((chapter, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden
            ${
              expandedChapter === index
                ? "shadow-lg border-yellow-200"
                : "hover:border-gray-300 border-gray-100"
            }`}
                  >
                    {/* Chapter Header */}
                    <div
                      onClick={() =>
                        setExpandedChapter(
                          expandedChapter === index ? null : index
                        )
                      }
                      className="flex items-center gap-4 p-4 cursor-pointer group"
                    >
                      <div className="relative">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 font-bold transition-transform group-hover:scale-110">
                          {chapter.order}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                          {chapter.title}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">
                          {chapter.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-gray-400">
                        <span className="text-sm">
                          {chapter.duration} دقیقه
                        </span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            expandedChapter === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {expandedChapter === index && (
                      <div className="bg-gray-50 p-4 border-t border-gray-100">
                        <div className="flex gap-3 pr-14">
                          <button
                            onClick={() =>
                              window.open(chapter.videoUrl, "_blank")
                            }
                            className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>مشاهده آنلاین</span>
                          </button>

                          <a
                            href={chapter.videoUrl}
                            download
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            <span>دانلود ویدیو</span>
                          </a>
                        </div>
                      </div>
                    )}
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
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        نام شما
                      </label>
                      <input
                        type="text"
                        value={newReview.name}
                        onChange={(e) =>
                          setNewReview({ ...newReview, name: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        value={newReview.email}
                        onChange={(e) =>
                          setNewReview({ ...newReview, email: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="ایمیل خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>
                  {/* Update the rating stars */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      امتیاز شما
                    </label>
                    <div className="flex gap-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setNewReview({ ...newReview, rating: star })
                          }
                          className={`text-2xl ${
                            newReview.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } hover:text-yellow-400 transition-colors`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Update the comment textarea */}
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="نظر خود را بنویسید..."
                    required
                  ></textarea>
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
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">
                            {review.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {review.comment}
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
