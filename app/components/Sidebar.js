"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Sidebar() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || "";
  const selectedTag = searchParams.get("tag") || "";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      let url = "/api/articles";
      if (categoryId) {
        url += `?category=${categoryId}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, [categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Your existing fetch calls
        const categoriesResponse = await fetch("/api/articles/category");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const tagsResponse = await fetch("/api/articles/tags");
        const tagsData = await tagsResponse.json();
        setTags(tagsData);

        const authorsResponse = await fetch("/api/authors");
        const authorsData = await authorsResponse.json();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="bg-white p-6 rounded-xl shadow-lg w-72 space-y-8">
      {isLoading ? (
        // Loading Skeleton
        <>
          {/* Categories Skeleton */}
          <div className="categories">
            <div className="h-8 bg-gray-200 w-32 rounded mb-4 animate-pulse" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center">
                  <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Tags Skeleton */}
          <div className="tags">
            <div className="h-8 bg-gray-200 w-32 rounded mb-4 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Authors Skeleton */}
          <div className="authors">
            <div className="h-8 bg-gray-200 w-32 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="categories">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              دسته‌بندی‌ها
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="transition-all hover:translate-x-2"
                >
                  <Link
                    href={`/pages/articles?category=${category._id}`}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                      categoryId === category._id
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-50 hover:bg-yellow-100"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-yellow-500 ml-2"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="tags">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              برچسب‌ها
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/pages/articles?tag=${tag}`}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    selectedTag === tag
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-yellow-100"
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="authors">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              نویسندگان
            </h3>
            <ul className="space-y-3">
              {authors.map((author) => (
                <li
                  key={author._id}
                  className="transition-all hover:translate-x-2"
                >
                  <Link
                    href={`/pages/articles?author=${author.name}`}
                    className={`block text-gray-600 hover:text-yellow-600 ${
                      searchParams.get("author") === author._id
                        ? "text-yellow-600 font-bold"
                        : ""
                    }`}
                  >
                    {author.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/pages/authors`}>
              همه نوسندگان
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}
