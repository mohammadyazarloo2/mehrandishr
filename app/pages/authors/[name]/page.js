"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthorDetailPage({ params }) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await fetch(`/api/author/${params.name}`);
      const data = await response.json();
      setAuthor(data);
      setLoading(false);
    };
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/articles/author/${params.name}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching author articles:", error);
      }
    };

    fetchAuthor();
    fetchArticles();
  }, [params.name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-8 animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8" />
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-violet-100"
              />
              <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
              <p className="text-gray-600 mb-6">{author.bio}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {author.expertise?.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 bg-violet-50 text-violet-600 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-12">
              {author.socialLinks?.website && (
                <a
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
                  </svg>
                </a>
              )}
              {author.socialLinks?.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
              {author.socialLinks?.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {author.socialLinks?.github && (
                <a
                  href={author.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Author's Articles */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                مقالات {author?.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles?.map((authorArticle) => (
                  <Link
                    key={authorArticle._id}
                    href={`/articles/${authorArticle.slug}`}
                    className="group bg-gray-50 rounded-xl p-6 hover:bg-violet-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
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
                        {authorArticle.readTime} دقیقه مطالعه
                      </span>
                      <span>•</span>
                      <span>{authorArticle.date}</span>
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-violet-600 transition-colors">
                      {authorArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {authorArticle.excerpt}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {authorArticle.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-violet-50/50 text-violet-600 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
