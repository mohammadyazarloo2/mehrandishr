"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Head from "next/head";
import Image from "next/image";

export default function Page({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await fetch(`/api/articles/findcategory`, {
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
    if (article?.category) {
      fetchCategoryName(article.category);
    }
  }, [article]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.id}`);
        const data = await response.json();

        // Get author name from the correct path in article data
        const authorResponse = await fetch(`/api/author/${data.author.name}`);
        const authorData = await authorResponse.json();

        setArticle({
          ...data,
          author: authorData,
        });

        await fetch(`/api/articles/updateViews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleId: params.id }),
        });
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        {/* Hero Section Skeleton */}
        <div className="relative h-[60vh] w-full bg-gray-200 animate-pulse">
          <div className="absolute bottom-10 lg:bottom-0 md:bottom-0 right-0 left-0 z-20 p-4 md:p-8 lg:p-12">
            <div className="container mx-auto">
              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-8 w-24 bg-white/20 rounded-full" />
                ))}
              </div>
              {/* Title skeleton */}
              <div className="h-12 md:h-16 bg-white/20 rounded-lg w-3/4 mb-4" />
              {/* Author info skeleton */}
              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20" />
                  <div className="h-6 w-32 bg-white/20 rounded" />
                </div>
                <div className="h-6 w-32 bg-white/20 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Summary box skeleton */}
            <div className="bg-violet-50 rounded-2xl p-8 mb-12">
              <div className="h-8 bg-violet-200/50 rounded w-48 mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-violet-200/50 rounded w-full" />
                <div className="h-4 bg-violet-200/50 rounded w-5/6" />
                <div className="h-4 bg-violet-200/50 rounded w-4/6" />
              </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              ))}
            </div>

            {/* Podcast section skeleton */}
            <div className="mt-16 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8">
              <div className="h-8 bg-violet-200/50 rounded w-48 mb-6" />
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-64" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                </div>
                <div className="h-12 bg-gray-200 rounded-lg w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-pulse">در حال بارگذاری...</div>
  //     </div>
  //   );
  // }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">مقاله مورد نظر یافت نشد</h1>
          <Link
            href="/pages/articles"
            className="text-violet-600 hover:text-violet-700"
          >
            بازگشت به لیست مقالات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <img
          src={article.image}
          className="w-full h-full object-cover"
          alt={article.title}
        />
        <div className="absolute bottom-10 lg:bottom-0 md:bottom-0 right-0 left-0 z-20 p-4 md:p-8 lg:p-12 text-white">
          <div className="container mx-auto">
            <div className="flex items-center flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
              {article.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/pages/articles?tag=${tag}`}
                  className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm"
                >
                  {tag}
                </Link>
              ))}
              <div className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm">
                <p>{article.views?.toLocaleString("fa-IR") || "0"} بازدید</p>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-200 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <img
                  // src={article.author.avatar}
                  src={article.author?.avatar}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
                <span>{article.author?.name}</span>
              </div>
              <span className="hidden md:block">|</span>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span>{article.readTime} دقیقه مطالعه</span>
              </div>
              <span>{article.date}</span>
            </div>
          </div>

          <button className="fixed md:absolute bottom-4 md:bottom-8 left-4 md:left-8 z-30 px-4 md:px-6 py-2.5 md:py-3.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-500 flex items-center gap-2 md:gap-3 group border border-white/20 hover:border-white/40 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="font-medium tracking-wide text-xs md:text-sm">
              ذخیره مقاله
            </span>
          </button>
        </div>
        <div className="absolute bottom-0 right-4 md:right-10 z-30">
          <nav className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-md px-3 md:px-6 py-2 md:py-3 rounded-lg border border-white/20">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-1 md:gap-2 text-xs md:text-sm"
            >
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="hidden sm:inline">خانه</span>
            </Link>

            <span className="text-white/40">
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <Link
              href="/pages/articles"
              className="text-white/70 hover:text-white transition-colors duration-300 text-xs md:text-sm"
            >
              مقالات
            </Link>

            <span className="text-white/40">
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <Link
              href="/pages/articles"
              className="text-white/70 hover:text-white transition-colors duration-300 text-xs md:text-sm"
            >
              {categoryName}
            </Link>

            <span className="text-white/40">
              <svg
                className="w-3 h-3 md:w-4 md:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-white font-medium text-xs md:text-sm truncate max-w-[100px] sm:max-w-[200px] md:max-w-none">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Podcast Section */}
      <div className="mt-16 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-violet-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
            />
          </svg>
          پادکست این مقاله
        </h3>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-10 h-10 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-1">{article.title}</h4>
              <p className="text-gray-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {article.readTime} دقیقه
              </p>
            </div>
          </div>
          <audio className="w-full custom-audio" controls>
            <source src={article.podcast?.url} type="audio/mpeg" />
            مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
          </audio>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16 relative">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg rtl">
            <div className="bg-violet-50 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-violet-900 mb-4">
                خلاصه مقاله
              </h2>
              <p className="text-violet-700">{article.summary}</p>
            </div>

            <div className="space-y-6">{article.content}</div>

            {/* Table of Contents */}
            {/* <div className="sticky top-72 right-[calc(50%+24rem)] w-64 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">فهرست مطالب</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {item.tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    className="hover:text-violet-600 cursor-pointer"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          {/* Share Section */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-purple-600 text-transparent bg-clip-text">
              اشتراک‌گذاری مقاله
            </h3>
            <div className="flex gap-4 bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-2xl">
              <button className="p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                <svg
                  className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                <svg
                  className="w-6 h-6 text-blue-400 group-hover:text-blue-500 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
                <svg
                  className="w-6 h-6 text-green-500 group-hover:text-green-600 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-violet-600 to-purple-600 text-transparent bg-clip-text">
              مقالات مرتبط
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {article.relatedArticles?.map((relatedId) => {
                const related = data.find(
                  (article) => article.id === relatedId
                );
                if (!related) return null;

                return (
                  <div
                    key={related.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={related.image}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-8">
                      <h4 className="font-bold text-lg mb-3 group-hover:text-violet-600 transition-colors duration-300">
                        {related.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                      <Link
                        href={`/pages/articles/details/${encodeURIComponent(
                          related.title.replace(/\s+/g, "-")
                        )}`}
                        className="mt-4 flex items-center justify-between"
                      >
                        <span className="text-sm text-violet-500 font-medium">
                          ادامه مطلب
                        </span>
                        <span className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center group-hover:bg-violet-100 transition-colors duration-300">
                          <FaChevronLeft className="w-4 h-4 text-violet-500" />
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
