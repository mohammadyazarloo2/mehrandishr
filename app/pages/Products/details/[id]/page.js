import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Head from "next/head";

const data = [
  {
    id: 1,
    title: "دوره html and css",
    en_title: "html and css course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6300000,
    img: "/img/lan/html.png",
  },
  {
    id: 2,
    title: "دوره جاوا اسکریپت",
    en_title: "javascript course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 7500000,
    img: "/img/lan/javascript.webp",
  },
  {
    id: 3,
    title: "دوره php",
    en_title: "php course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 10000000,
    img: "/img/lan/php.png",
  },
  {
    id: 4,
    title: "دوره nodejs",
    en_title: "nodejs course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 8000000,
    img: "/img/lan/nodejs.png",
  },
  {
    id: 5,
    title: "دوره reactjs",
    en_title: "reactjs course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 8000000,
    img: "/img/lan/reactjs.png",
  },
  {
    id: 6,
    title: "دوره nextjs",
    en_title: "nextjs course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 8000000,
    img: "/img/lan/nextjs.png",
  },
  {
    id: 7,
    title: "دوره tailwindcss",
    en_title: "tailwindcss course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6500000,
    img: "/img/lan/tailwind.webp",
  },
  {
    id: 8,
    title: "دوره bootstrap",
    en_title: "bootstrap course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6500000,
    img: "/img/lan/bootstrap.png",
  },
  {
    id: 9,
    title: "دوره jquery",
    en_title: "jquery course",
    description: "آموزش در دو دوره مقدماتی و پیشرفته",
    price: 6500000,
    img: "/img/lan/empty.jpg",
  },
  {
    id: 10,
    title: "دوره ICDL",
    en_title: "icdl course",
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

export default function Page({ params }) {
  const item = data.find((item) => item.title === decodeURIComponent(params.id.toString().replace(/-/g, " ")));
  const title=decodeURIComponent(params.id.toString().replace(/-/g, " "));
  console.log(title);
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
      <div class="breadcrumbs">
        <ul class="breadcrumb-nav">
          <li class="breadcrumb-item">
            <Link class="breadcrumb-link" href="/">
              صفحه اصلی
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class="breadcrumb-link" href="/pages/Products">
              محصولات
            </Link>
          </li>
          <FaChevronLeft color="#fff" />
          <li class="breadcrumb-item">
            <Link class="breadcrumb-link active" href="#">
              {decodeURIComponent(params.id.toString().replace(/-/g, " "))}
            </Link>
          </li>
        </ul>
      </div>
      <div className="products-container">
        <div className="products-img">
          <img src="/img/2.png" alt="" />
        </div>
        <div className="products-info">
          <div className="products-info-title">
            <h1> {item.title}  </h1>
          </div>
          <div className="products-info-price">
            <span>مدرس :</span>
            <span>محمد یازرلو</span>
          </div>
          <div className="products-info-price">
            <span>قیمت :</span>
            <span> {item.price.toLocaleString()} تومان </span>
          </div>
          <div className="products-info-description">
            <span>توضیحات :</span>
            <p> {item.description} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
