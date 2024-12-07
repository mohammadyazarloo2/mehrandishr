"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ArticlesByTag() {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/articles/tags");
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        setTags(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setTags([]);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchArticlesByTag = async () => {
      if (selectedTag) {
        try {
          const response = await fetch(
            `/api/articles?tag=${encodeURIComponent(selectedTag)}`
          );
          if (!response.ok) throw new Error("Failed to fetch articles");
          const data = await response.json();
          setArticles(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching articles:", error);
          setArticles([]);
        }
      } else {
        setArticles([]);
      }
    };
    fetchArticlesByTag();
  }, [selectedTag]);

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex gap-4 mb-8 flex-wrap">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/articles/tags?tag=${encodeURIComponent(tag)}`}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTag === tag
                ? "bg-yellow-400 text-white"
                : "bg-gray-100 hover:bg-yellow-100"
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="border rounded-lg p-4 shadow">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <Link
              href={`/articles/details/${article._id}`}
              className="text-yellow-500 hover:text-yellow-600"
            >
              ادامه مطلب
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
