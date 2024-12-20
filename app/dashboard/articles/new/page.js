"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaImage, FaSave, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function NewArticle() {
  const [article, setArticle] = useState({
    title: "",
    author: {
      name: "",
      avatar: "",
    },
    tags: [],
    summary: "",
    content: "",
    podcast: {
      url: "",
      duration: "",
      size: "",
    },
    tableOfContents: [],
    relatedArticles: [],
    excerpt: "",
    image: "",
    category: "",
    readTime: "",
    views: 0,
    date: new Date().toISOString(),
    slug: "",
  });
  const [categories, setCategories] = useState([]);

  const [tagInput, setTagInput] = useState("");
  const [podcastFile, setPodcastFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      if (status === "unauthenticated") {
        router.push("/pages/Signin");
        return;
      }

      try {
        const response = await fetch("/api/author/check");
        const data = await response.json();
        
        if (!data.isAuthor) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking author status:", error);
        router.push("/");
      }
    };

    checkAuthorization();
  }, [status, router]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // نمایش پیش‌نمایش
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

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

  const handlePodcastUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const size = (file.size / (1024 * 1024)).toFixed(2) + " MB";
    const audioUrl = URL.createObjectURL(file);

    const audio = new Audio(audioUrl);
    audio.onloadedmetadata = async () => {
      const duration = Math.round(audio.duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      const durationStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload/podcast", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.url) {
          setArticle({
            ...article,
            podcast: {
              url: data.url,
              duration: durationStr,
              size: size,
            },
          });
          setPodcastFile({
            file,
            previewUrl: audioUrl,
            duration: duration,
          });
        }
      } catch (error) {
        console.error("Error uploading podcast:", error);
      }
    };
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !article.tags.includes(newTag)) {
        setArticle({
          ...article,
          tags: [...article.tags, newTag],
        });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setArticle({
      ...article,
      tags: article.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/articles/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
      });

      if (response.ok) {
        window.location.href = "/pages/articles";
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            عنوان مقاله
          </label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            خلاصه مقاله
          </label>
          <textarea
            value={article.summary}
            onChange={(e) =>
              setArticle({ ...article, summary: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            محتوای مقاله
          </label>
          <Editor
            value={article.content}
            onChange={(content) => setArticle({ ...article, content })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            برچسب‌ها
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                <span className="mr-1">#</span>
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="برچسب را وارد کنید و Enter بزنید"
          />
          <p className="mt-1 text-sm text-gray-500">
            برچسب‌ها را با Enter یا کاما از هم جدا کنید
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            دسته‌بندی
          </label>
          <select
            value={article.category}
            onChange={(e) =>
              setArticle({ ...article, category: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            زمان مطالعه
          </label>
          <input
            type="text"
            value={article.readTime}
            onChange={(e) =>
              setArticle({ ...article, readTime: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="مثال: ۵ دقیقه"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            پادکست
          </label>

          <div className="flex items-center space-x-4 space-x-reverse">
            <input
              type="file"
              accept="audio/*"
              onChange={handlePodcastUpload}
              className="hidden"
              id="podcast-upload"
            />
            <label
              htmlFor="podcast-upload"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              آپلود فایل صوتی
            </label>
          </div>

          {podcastFile && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{podcastFile.file.name}</span>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span>{article.podcast.size}</span>
                  <span>{article.podcast.duration}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => {
                    if (isPlaying) {
                      audioRef.current.pause();
                    } else {
                      audioRef.current.play();
                    }
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
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
                  )}
                </button>

                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={podcastFile.duration}
                    value={currentTime}
                    onChange={(e) => {
                      const time = parseFloat(e.target.value);
                      setCurrentTime(time);
                      audioRef.current.currentTime = time;
                    }}
                    className="w-full"
                  />
                </div>

                <span className="text-sm text-gray-600">
                  {formatTime(currentTime)} / {article.podcast.duration}
                </span>
              </div>

              <audio
                ref={audioRef}
                src={podcastFile.previewUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            تصویر شاخص
          </label>

          <div className="flex items-center space-x-4 space-x-reverse">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              انتخاب تصویر
            </label>
          </div>

          {imagePreview && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt="پیش‌نمایش تصویر"
                fill
                className="object-cover"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setArticle({ ...article, image: "" });
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FaSave className="inline mr-2" />
            ذخیره مقاله
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <FaTimes className="inline mr-2" />
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
