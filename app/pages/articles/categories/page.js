'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ArticlesByCategory() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    // دریافت دسته‌بندی‌ها
    const fetchCategories = async () => {
      const response = await fetch('/api/articles/category')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    // دریافت مقالات بر اساس دسته‌بندی
    const fetchArticlesByCategory = async () => {
      if (selectedCategory) {
        const response = await fetch(`/api/articles?category=${selectedCategory}`)
        const data = await response.json()
        setArticles(data)
      }
    }
    fetchArticlesByCategory()
  }, [selectedCategory])

  return (
    <div className="container mx-auto p-4 rtl">
      <div className="flex gap-4 mb-8">
        {categories.map((category) => (
          <a
            key={category._id}
            href={`/articles/categories?category=${category._id}`}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100'
            }`}
          >
            {category.name}
          </a>
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
            <a
              href={`/articles/${article._id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              ادامه مطلب
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
