import { articles } from "../data/articles";
import Link from "next/link";

const categories = [...new Set(articles.map((article) => article.category))];
const tags = [...new Set(articles.flatMap((article) => article.tags || []))];
const authors = [...new Set(articles.map((article) => article.author.name))];

export default function Sidebar() {
  return (
    <aside className="bg-white p-6 rounded-xl shadow-lg w-72 space-y-8">
      <div className="categories">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">دسته‌بندی‌ها</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="transition-all hover:translate-x-2">
              <Link 
                href={`/category/${category}`}
                className="text-gray-600 hover:text-yellow-400 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="tags">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">برچسب‌ها</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link 
              key={tag} 
              href={`/tag/${tag}`} 
              className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-yellow-400 hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="authors">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">نویسندگان</h3>
        <ul className="space-y-3">
          {authors.map((author) => (
            <li key={author} className="transition-transform hover:translate-x-2">
              <Link 
                href={`/author/${author}`}
                className="flex items-center gap-3 text-gray-600 hover:text-yellow-400"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {author[0]}
                </div>
                {author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}