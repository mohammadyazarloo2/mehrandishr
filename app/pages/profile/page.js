"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronLeft,
  FaCamera,
  FaEdit,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaPlus,
  FaPen,
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [authorStats, setAuthorStats] = useState({
    publishedCount: 0,
    draftCount: 0,
    totalViews: 0,
  });

  const [recentArticles, setRecentArticles] = useState([]);

  const [authorData, setAuthorData] = useState({
    name: "",
    bio: "",
    slug: "",
    expertise: [],
    socialLinks: {
      website: "",
      twitter: "",
      linkedin: "",
      github: "",
    },
    avatar:"",
  });

  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  // Instead of directly using session
  const { data: session, update: sessionUpdate } = useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
      if (isAuthor && authorData.slug) {
        await fetchRecentArticles();
        await fetchAuthorStats();
      }
    };
    loadData();
  }, [isAuthor, authorData.slug]);

  const fetchAuthorStats = async () => {
    try {
      // دریافت آمار مقالات نویسنده
      const response = await fetch("/api/author/stats");
      const data = await response.json();
      setAuthorStats({
        publishedCount: data.publishedCount || 0,
        draftCount: data.draftCount || 0,
        totalViews: data.totalViews || 0,
      });
    } catch (error) {
      console.error("Error fetching author stats:", error);
    }
  };

  const fetchRecentArticles = async () => {
    try {
      const response = await fetch(`/api/articles/author/${authorData.name}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setRecentArticles(data.articles);
        setAuthorStats({
          publishedCount: data.stats.published,
          draftCount: data.stats.drafts,
          totalViews: data.stats.views,
        });
      }
    } catch (error) {
      console.error("Error fetching author articles:", error);
    }
  };

  const fetchData = async () => {
    try {
      const userResponse = await fetch("/api/user/profile");
      const userData = await userResponse.json();

      // Set user data with string values
      setUserData({
        name: userData.name || "",
        email: userData.email || "",
        
      });

      const authorCheckResponse = await fetch("/api/author/check");
      const { isAuthor } = await authorCheckResponse.json();
      setIsAuthor(isAuthor);

      if (isAuthor) {
        const authorResponse = await fetch("/api/author/profile");
        const authorData = await authorResponse.json();
        setAuthorData({
          avatar: authorData.avatar || "",
          name: authorData.name || "",
          bio: authorData.bio || "",
          slug: authorData.slug || "",
          expertise: authorData.expertise || [],
          socialLinks: {
            website: authorData.socialLinks?.website || "",
            twitter: authorData.socialLinks?.twitter || "",
            linkedin: authorData.socialLinks?.linkedin || "",
            github: authorData.socialLinks?.github || "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        // آپدیت آواتار در پروفایل کاربر
        if (isAuthor) {
          await handleUpdateAuthorProfile({
            ...authorData,
            avatar: data.url,
          });
        }

        if (isAuthor) {
          setAuthorData((prev) => ({ ...prev, avatar: data.url }));
        }
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "اطلاعات پروفایل" },
    { id: "author", label: "اطلاعات نویسنده", authorOnly: true },
    { id: "dashboard", label: "داشبورد نویسنده", authorOnly: true },
  ];

  const handleUpdateUserProfile = async () => {
    const response = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      }),
    });

    if (response.ok) {
      await sessionUpdate({
        ...session,
        user: {
          ...session?.user,
          name: userData.name,
          email: userData.email,
        },
      });
    }
  };

  const handleUpdateAuthorProfile = async () => {
    if (!isAuthor) return;

    const response = await fetch("/api/author/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar: authorData.avatar,
        name: authorData.name,
        bio: authorData.bio,
        expertise: authorData.expertise,
        socialLinks: authorData.socialLinks,
      }),
    });
  };

  const handleUpdateProfile = async () => {
    try {
      await handleUpdateUserProfile();
      if (isAuthor) {
        await handleUpdateAuthorProfile();
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Tabs */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <div className="flex space-x-4 border-b">
            {tabs.map(
              (tab) =>
                (!tab.authorOnly || isAuthor) && (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 -mb-px ${
                      activeTab === tab.id
                        ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                )
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              {/* Profile Content */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm text-gray-500">نام</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-800"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm text-gray-500">ایمیل</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Author Content */}
              {activeTab === "author" && isAuthor && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <Image
                        src={authorData.avatar}
                        alt="تصویر پروفایل"
                        fill
                        className="rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <FaCamera size={20} />
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">بیوگرافی</label>
                    <textarea
                      value={authorData.bio}
                      onChange={(e) =>
                        setAuthorData({ ...authorData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      rows={3}
                      className="w-full bg-transparent border-none focus:ring-0 text-gray-800 resize-none"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm text-gray-500">تخصص‌ها</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={authorData.expertise.join(", ")}
                        onChange={(e) => {
                          const expertise = e.target.value
                            .split(",")
                            .map((item) => item.trim());
                          setAuthorData({ ...authorData, expertise });
                        }}
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-800"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {authorData.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(authorData.socialLinks).map(
                      ([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <label className="text-sm text-gray-500 capitalize">
                            {key}
                          </label>
                          <input
                            type="url"
                            value={value}
                            onChange={(e) =>
                              setAuthorData({
                                ...authorData,
                                socialLinks: {
                                  ...authorData.socialLinks,
                                  [key]: e.target.value,
                                },
                              })
                            }
                            disabled={!isEditing}
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-800"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Cards */}
            {activeTab === "dashboard" && isAuthor && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* ... existing stats cards ... */}
                </div>

                {/* Articles List */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">مقالات من</h3>
                      <Link
                        href="/dashboard/articles/new"
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        <FaPlus />
                        مقاله جدید
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y">
                    {recentArticles?.map((article) => (
                      <div
                        key={article._id}
                        className="p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20">
                              <Image
                                src={article.image || "/default-article.jpg"}
                                alt={article.title}
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-lg">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <FaClock className="text-gray-400" />
                                  {article.readTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaEye className="text-gray-400" />
                                  {article.views} بازدید
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    article.status === "published"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {article.status === "published"
                                    ? "منتشر شده"
                                    : "پیش‌نویس"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/articles/edit/${article._id}`}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                          >
                            <FaEdit size={20} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Action Buttons for Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    ویرایش اطلاعات کاربری
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleUpdateUserProfile}
                      className="w-full bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      ذخیره اطلاعات کاربری
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        fetchData();
                      }}
                      className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      انصراف
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Action Buttons for Author Tab */}
            {activeTab === "author" && isAuthor && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    ویرایش اطلاعات نویسنده
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleUpdateAuthorProfile}
                      className="w-full bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      ذخیره اطلاعات نویسنده
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        fetchData();
                      }}
                      className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition flex items-center justify-center gap-2"
                    >
                      <FaTimes />
                      انصراف
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
