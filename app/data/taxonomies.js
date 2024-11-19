import { articles } from './articles'

// استخراج همه دسته‌بندی‌های یکتا
export const categories = [...new Set(articles.map(article => article.category))]

// استخراج همه تگ‌های یکتا
export const tags = [...new Set(articles.flatMap(article => article.tags || []))]

// استخراج نویسندگان یکتا
export const authors = [...new Set(articles.map(article => article.author.name))]

// گروه‌بندی مقالات بر اساس دسته‌بندی
export const articlesByCategory = categories.reduce((acc, category) => {
  acc[category] = articles.filter(article => article.category === category)
  return acc
}, {})

// گروه‌بندی مقالات بر اساس تگ
export const articlesByTag = tags.reduce((acc, tag) => {
  acc[tag] = articles.filter(article => article.tags?.includes(tag))
  return acc
}, {})

// گروه‌بندی مقالات بر اساس نویسنده
export const articlesByAuthor = authors.reduce((acc, author) => {
  acc[author] = articles.filter(article => article.author.name === author)
  return acc
}, {})
