import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const data = [
  {
    id: 1,
    title: "دوره html & css",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6300000,
    img: "/img/lan/html.png",
  },
  {
    id: 2,
    title: "دوره جاوا اسکریپت",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 7500000,
    img: "/img/lan/javascript.webp",
  },
  {
    id: 3,
    title: "دوره php",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 10000000,
    img: "/img/lan/php.png",
  },
  {
    id: 4,
    title: "دوره nodejs",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 8000000,
    img: "/img/lan/nodejs.png",
  },
  {
    id: 5,
    title: "دوره reactjs",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 8000000,
    img: "/img/lan/reactjs.png",
  },
  {
    id: 6,
    title: "دوره nextjs",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 8000000,
    img: "/img/lan/nextjs.png",
  },
  {
    id: 7,
    title: "دوره tailwindcss",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6500000,
    img: "/img/lan/tailwind.webp",
  },
  {
    id: 8,
    title: "دوره bootstrap",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6500000,
    img: "/img/lan/bootstrap.png",
  },
  {
    id: 9,
    title: "دوره jquery",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6500000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 10,
    title: "دوره ICDL",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 4700000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 11,
    title: "دوره photoshop",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 12000000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 12,
    title: "دوره illustrator",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 12000000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 13,
    title: "دوره figman and zeplin",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 5000000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 14,
    title: "دوره after effect",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 12000000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 15,
    title: "دوره premier",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 12000000,
    img: "/img/lan/empty.jpg",
  },
];

export default function Products() {
  return (
    <main>
      <div class="breadcrumbs">
        <ul class="breadcrumb-nav">
          <li class="breadcrumb-item">
            <Link class="breadcrumb-link" href="/">
              صفحه اصلی
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class="breadcrumb-link active" href="#">
              محصولات
            </Link>
          </li>
        </ul>
      </div>

      <div class="products-page">
        <div class="products-sidebar">
          <div class="product-sidebar-over">
            <div class="product-sidebar-category">
              <div class="product-sidebar-category-head">
                <h2>دسته بندی</h2>
                <i class="bi bi-chevron-bar-down"></i>
              </div>
              <div class="product-sidebar-category-body">
                <ul>
                  <li>شلوار</li>
                  <li>مانتو</li>
                  <li>پیرهن</li>
                  <li>کمربند</li>
                  <li>کلاه</li>
                </ul>
              </div>
            </div>

            <div class="product-sidebar-brand">
              <div class="product-sidebar-brand-head">
                <h2>برند ها</h2>
                <i class="bi bi-chevron-bar-down"></i>
              </div>
              <div class="product-sidebar-brand-body">
                <ul>
                  <li>شلوار</li>
                  <li>مانتو</li>
                  <li>پیرهن</li>
                  <li>کمربند</li>
                  <li>کلاه</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="products-grid">
          <div class="products-grid-over">
            <div class="product-filter">
              <div class="product-filter-buttons">
                <button class="product-filter-btn">ارزانترین</button>
                <button class="product-filter-btn">گرانترین</button>
                <button class="product-filter-btn">جدیدترین</button>
                <button class="product-filter-btn">پربازدیدترین</button>
                <button class="product-filter-btn">پرفروشترین</button>
              </div>
              <select class="product-filter-select">
                <option value="asc">نزولی</option>
                <option value="desc">صعودی</option>
              </select>
            </div>

            <div class="products-items">
              {data.map((item, index) => {
                return (
                  <div class="p-item" key={index}>
                    <div class="p-item-img">
                      <Image
                        width={100}
                        height={100}
                        alt="product"
                        src={item.img}
                      />
                    </div>
                    <div class="p-item-content">
                      <div class="p-item-title"> {item.title} </div>
                      <div class="p-item-foot">
                        <div class="p-item-foot-prices">
                          <span class="p-item-price-org">
                            {" "}
                            {item.price.toLocaleString()}{" "}
                          </span>
                          <span class="p-item-price-off">120</span>
                        </div>
                        <div class="p-item-basket">
                          <Link
                            href={`/pages/products/details/${item.title.replace(
                              /\s+/g,
                              "-"
                            )}`}
                          >
                            خرید
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
