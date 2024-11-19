import Sidebar from "@/app/components/Sidebar";
import { articles } from "@/app/data/articles";
import Link from "next/link";

export default function Articles() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12 relative">
        <span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-yellow-400 after:bottom-0 after:left-0">
          مقالات
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 rtl">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden group">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-yellow-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-6 border-t border-gray-100 pt-4">
                  <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4 ml-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </span>
                  <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4 ml-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime} دقیقه مطالعه
                  </span>
                </div>

                <Link
                  href={`/pages/articles/details/${encodeURIComponent(article.title.replace(/\s+/g, "-"))}`}
                  className="block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium py-3 px-4 rounded-xl transition duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                >
                  ادامه مطلب
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}