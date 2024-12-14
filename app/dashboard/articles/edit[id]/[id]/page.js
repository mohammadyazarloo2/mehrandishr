"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaArrowRight,
  FaSave,
  FaTimes,
  FaImage,
  FaTag,
  FaClock,
  FaEye,
} from "react-icons/fa";
import Editor from "@/components/Editor";

export default function EditArticle({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState({
    title: "",
    content: "",
    summary: "",
    tags: [],
    image: "",
    category: "",
    readTime: "",
    status: "draft",
    views: 0,
  });
  const [loading, setLoading] = useState(true);

  const handleImageUpload = async (event) => {
    if (!event || !event.target || !event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // Changed from "file" to "image"

    try {
      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setArticle({ ...article, image: data.url });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.id}`);
        const data = await response.json();
        if (data) {
          // Ensure all fields are populated from the fetched data
          setArticle({
            ...article,
            ...data,
            tags: data.tags || [],
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedArticle = {
      title: article.title,
      content: article.content,
      summary: article.summary,
      tags: article.tags,
      image: article.image,
      category: article.category,
      readTime: article.readTime,
      status: article.status,
      author: {
        name: article.author.name,
        avatar: article.author.avatar,
      },
    };

    const response = await fetch(`/api/articles/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArticle),
    });

    const data = await response.json();

    if (data.success) {
      router.push("/pages/articles");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowRight />
            <span>بازگشت</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">ویرایش مقاله</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <input
                type="text"
                value={article.title}
                onChange={(e) =>
                  setArticle({ ...article, title: e.target.value })
                }
                className="w-full text-2xl font-bold border-none focus:ring-0 text-gray-800 mb-4"
                placeholder="عنوان مقاله"
              />

              <textarea
                value={article.summary}
                onChange={(e) =>
                  setArticle({ ...article, summary: e.target.value })
                }
                className="w-full min-h-[100px] border-none focus:ring-0 text-gray-600 mb-4 bg-gray-50 rounded-lg p-4"
                placeholder="خلاصه مقاله..."
              />
              <Editor
                value={article.content}
                onChange={(e) =>
                  setArticle({ ...article, content: e.target.value })
                }
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={article.image || "/default-article.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <label className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow hover:bg-blue-50 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <FaImage className="text-blue-500" />
                </label>
              </div>
            </div>

            {/* Meta Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FaClock />
                <input
                  type="text"
                  value={article.readTime}
                  onChange={(e) =>
                    setArticle({ ...article, readTime: e.target.value })
                  }
                  className="flex-1 border-none focus:ring-0"
                  placeholder="زمان مطالعه"
                />
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaTag />
                <input
                  type="text"
                  value={article.tags.join(", ")}
                  onChange={(e) =>
                    setArticle({
                      ...article,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                  className="flex-1 border-none focus:ring-0"
                  placeholder="برچسب‌ها (با کاما جدا کنید)"
                />
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaEye />
                <span>{article.views || 0} بازدید</span>
              </div>

              <select
                value={article.status}
                onChange={(e) =>
                  setArticle({ ...article, status: e.target.value })
                }
                className="w-full p-2 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">پیش‌نویس</option>
                <option value="published">منتشر شده</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <FaSave />
                ذخیره
              </button>
              <button
                onClick={() => router.back()}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <FaTimes />
                انصراف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
