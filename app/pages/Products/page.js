"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Products() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  // ابتدا دسته‌بندی‌های اصلی را جدا می‌کنیم
  const mainCategories = categories.filter((cat) => cat.parent === "main");
  const subCategories = categories.filter((cat) => cat.parent !== "main");
  const [brands, setBrands] = useState([]);

  const fetchProducts = async (page = 1, categoryId = null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: productsPerPage.toString(),
      });

      if (categoryId) {
        const selectedCategory = categories.find(
          (cat) => cat._id === categoryId
        );

        if (selectedCategory?.parent === "main") {
          const subCategories = categories.filter(
            (cat) => cat.sub === selectedCategory.name
          );
          const allCategoryIds = [
            categoryId,
            ...subCategories.map((sub) => sub._id),
          ];
          params.set("category", allCategoryIds.join(","));
        } else {
          params.set("category", categoryId);
        }
      }
      

      // Construct final URL
      const url = `/api/products?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
      // setTotalPages(Math.ceil(data.data.total / productsPerPage));
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchProducts(newPage, activeCategory);
    router.push(
      `/pages/Products?page=${newPage}${
        activeCategory ? `&category=${activeCategory}` : ""
      }`
    );
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      console.log("Fetched Categories:", data); // برای دیدن داده‌های دریافتی
      setCategories(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      // Ensure we're setting an array
      setBrands(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrands([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchCategories();
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = parseInt(urlParams.get("page")) || 1;
      const categoryParam = urlParams.get("category");
      setCurrentPage(pageParam);
      fetchBrands();
      await fetchProducts(pageParam, categoryParam);
    };

    init();
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    const sorted = [...products].sort((a, b) =>
      order === "asc" ? a.id - b.id : b.id - a.id
    );
    setSortedProducts(sorted);
  };

  const handlePrice = (order) => {
    const sorted = [...products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
  };

  const handleCategoryClick = async (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    await fetchProducts(1, categoryId);
    // Update URL with category
    router.push(`/pages/Products?category=${categoryId}&page=1`, undefined, {
      shallow: true,
    });
  };

  // ابتدا دسته‌بندی‌ها را گروه‌بندی می‌کنیم
  const groupedCategories = categories.reduce((acc, category) => {
    if (category.parent === "main") {
      if (!acc[category._id]) {
        acc[category._id] = {
          main: category,
          subs: [],
        };
      }
    } else {
      const parentCategory = categories.find((c) => c._id === category.parent);
      if (parentCategory) {
        if (!acc[parentCategory._id]) {
          acc[parentCategory._id] = {
            main: parentCategory,
            subs: [],
          };
        }
        acc[parentCategory._id].subs.push(category);
      }
    }
    return acc;
  }, {});

  const LoadingSkeleton = () => (
    <main className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="breadcrumbs">
        <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-64" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start gap-8">
          {/* Sidebar Skeleton */}
          <aside className="w-64 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Categories Skeleton */}
              <div className="mb-6">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-24 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className="h-4 bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Brands Skeleton */}
              <div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-20 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="h-4 bg-gray-200 animate-pulse rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            {/* Filters Bar Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="h-10 w-24 bg-gray-200 animate-pulse rounded-full"
                    />
                  ))}
                </div>
                <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-lg" />
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                >
                  {/* Image skeleton */}
                  <div className="h-56 bg-gray-200 animate-pulse" />

                  <div className="p-6">
                    {/* Title skeleton */}
                    <div className="h-8 bg-gray-200 rounded-lg mb-3 animate-pulse" />

                    {/* Description skeleton */}
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>

                    {/* Price skeleton */}
                    <div className="flex justify-between items-center mb-6 border-t border-gray-100 pt-4">
                      <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
                    </div>

                    {/* Button skeleton */}
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="h-10 w-10 bg-gray-200 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <main className="bg-gray-50 min-h-screen">
      <div class="breadcrumbs">
        <ul class="breadcrumb-nav">
          <li class="breadcrumb-item">
            <Link class="text-white hover:text-primary" href="/">
              صفحه اصلی
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class="text-primary" href="#">
              محصولات
            </Link>
          </li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start gap-8">
          {/* Sidebar */}
          <aside className="w-64 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">دسته‌بندی</h3>
                <ul className="space-y-2">
                  {categories
                    .filter((cat) => cat.parent === "main")
                    .map((mainCat) => (
                      <li key={mainCat._id}>
                        <div
                          onClick={() => handleCategoryClick(mainCat._id)}
                          className={`cursor-pointer font-bold mb-2 ${
                            activeCategory === mainCat._id
                              ? "text-yellow-400"
                              : "hover:text-yellow-400"
                          }`}
                        >
                          {mainCat.name}
                          <span className="text-sm text-gray-500 ml-2">
                            (
                            {
                              categories.filter(
                                (sub) => sub.sub === mainCat.name
                              ).length
                            }
                            )
                          </span>
                        </div>
                        <ul className="pr-4 space-y-1">
                          {categories
                            .filter(
                              (sub) =>
                                sub.parent === "sub" && sub.sub === mainCat.name
                            )
                            .map((subCat) => (
                              <li
                                key={subCat._id}
                                onClick={() => handleCategoryClick(subCat._id)}
                                className={`cursor-pointer text-sm ${
                                  activeCategory === subCat._id
                                    ? "text-yellow-400"
                                    : "hover:text-yellow-400"
                                }`}
                              >
                                {subCat.name}
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                  <li
                    onClick={() => {
                      setActiveCategory(null);
                      fetchProducts(1);
                      router.push("/pages/Products?page=1");
                    }}
                    className="cursor-pointer text-gray-500 hover:text-yellow-400 transition mt-4"
                  >
                    نمایش همه
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">برندها</h3>
                <ul className="space-y-2">
                  {Array.isArray(brands) &&
                    brands.map((brand) => (
                      <li
                        key={brand._id}
                        onClick={() => {
                          fetchProducts(1, null, brand._id);
                        }}
                        className="cursor-pointer hover:text-yellow-400 transition"
                      >
                        {brand.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {["ارزان‌ترین", "گران‌ترین", "جدیدترین", "پربازدیدترین"].map(
                    (filter) => (
                      <button
                        key={filter}
                        onClick={() =>
                          handlePrice(filter === "ارزان‌ترین" ? "asc" : "desc")
                        }
                        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-yellow-400 hover:text-white transition"
                      >
                        {filter}
                      </button>
                    )
                  )}
                </div>

                <select
                  value={sortOrder}
                  onChange={(e) => handleSort(e.target.value)}
                  className="rounded-lg border-gray-200 focus:ring-yellow-400"
                >
                  <option value="asc">نزولی</option>
                  <option value="desc">صعودی</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden group">
                    <img
                      src={product?.images}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-yellow-600 transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-6 border-t border-gray-100 pt-4">
                      <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                        قیمت: {product.price.toLocaleString()} تومان
                      </span>
                    </div>

                    <Link
                      href={`/pages/Products/details/${product._id}`}
                      className="block w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium py-3 px-4 rounded-xl transition duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
                    >
                      مشاهده محصول
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                {totalPages > 0 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === index + 1
                              ? "bg-yellow-400 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
