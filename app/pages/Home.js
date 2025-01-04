"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { SlBasket } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { addToCart } from "../redux/cartSlice";
import { articles } from "../data/articles";
import { FaEye } from "react-icons/fa6";
import { CiShuffle } from "react-icons/ci";
import { IoPlaySkipBackCircle } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { BsFillSkipEndCircleFill } from "react-icons/bs";
import { FaRepeat } from "react-icons/fa6";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { AudioController } from "../utils/AudioController";
import { usePathname } from "next/navigation";
import ChatModal from "../components/ChatModal";

import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import Weather from "../components/Weather";
import HomeAudioPlayer from "../components/HomeAudioPlayer";

const courses = [
  {
    id: 1,
    logo: "/img/lan/ICDL.png",
  },
  {
    id: 2,
    logo: "/img/lan/html.png",
  },
  {
    id: 3,
    logo: "/img/lan/css.png",
  },
  {
    id: 4,
    logo: "/img/lan/bootstrap.png",
  },
  {
    id: 5,
    logo: "/img/lan/tailwind.webp",
  },
  {
    id: 6,
    logo: "/img/lan/javascript.webp",
  },
  {
    id: 7,
    logo: "/img/lan/nodejs.png",
  },
  {
    id: 8,
    logo: "/img/lan/mongodb.png",
  },
  {
    id: 9,
    logo: "/img/lan/reactjs.png",
  },
  {
    id: 10,
    logo: "/img/lan/nextjs.png",
  },
  {
    id: 11,
    logo: "/img/lan/mysql.webp",
  },
  {
    id: 12,
    logo: "/img/lan/php.png",
  },
  {
    id: 13,
    logo: "/img/lan/adobeillustrator.jfif",
  },
  {
    id: 14,
    logo: "/img/lan/aftereffect.jfif",
  },

  {
    id: 15,
    logo: "/img/lan/premier.jfif",
  },
  {
    id: 16,
    logo: "/img/lan/photoshop.jfif",
  },
  {
    id: 17,
    logo: "/img/lan/figma.jfif",
  },
];

export default function Index() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const [isReady, setIsReady] = useState(false);
  // const [currentPodcast, setCurrentPodcast] = useState(0);

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const [viewCount, setViewCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const [sliders, setSliders] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchSliders = async () => {
      const res = await fetch("/api/slider");
      const data = await res.json();
      setSliders(data);
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, articlesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/articles"),
        ]);
        const productsData = await productsRes.json();
        const articlesData = await articlesRes.json();

        setProducts(Array.isArray(productsData.data) ? productsData.data : []);
        setArticles(Array.isArray(articlesData) ? articlesData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const recordPageView = async () => {
      await fetch("/api/analytics/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: "/home" }),
      });
    };

    recordPageView();
  }, []);

  useEffect(() => {
    const images = document.querySelectorAll(".course-image");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("center");
          } else {
            entry.target.classList.remove("center");
          }
        });
      },
      {
        root: document.querySelector(".scroll-container"),
        threshold: 1.0,
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  console.log(products);

  const LoadingSkeleton = () => (
    <main>
      {/* Hero Section Skeleton */}
      <div className="bottem-img">
        <div className="h-[60vh] bg-gray-200 animate-pulse rounded-b-2xl" />
      </div>

      {/* Products Section Skeleton */}
      <div className="bottom">
        <div className="bottom-head">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="h-48 bg-gray-200 animate-pulse rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-8 bg-gray-200 animate-pulse rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className="about-home relative">
        <div className="container mx-auto px-4 py-16">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg mb-8" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-4 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-40 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Podcast Section Skeleton */}
      <div className="course-padcast relative py-20">
        <div className="container mx-auto px-4">
          <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg mb-12 mx-auto" />
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-4 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section Skeleton */}
      <div className="article">
        <div className="article-head">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-xl overflow-hidden shadow">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-8 bg-gray-200 animate-pulse rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <main>
      {status === "authenticated" && <ChatModal />}
      <div className="bottem-img">
        <div className="absolute top-4 left-50 z-10">
          <Weather />
        </div>
        <Swiper
          dir="rtl"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider._id}>
              <Link href={slider.link}>
                <Image
                  src={slider.image}
                  width={1200}
                  height={400}
                  alt={slider.title}
                  className="w-full h-auto"
                />
                <div className="slider-content">
                  <h2>{slider.title}</h2>
                  <p>{slider.description}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>

      <div className="bottom">
        <div className="bottom-head">
          <span className="bottom-head-title">جدیدترین ها</span>
          <div className="bottom-head-more">
            <Link href="/pages/Products">بیشتر</Link>
          </div>
        </div>

        <div className="products-section">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group relative overflow-hidden rounded-[40px] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20">
                  <div className="flex h-[400px] transform flex-col transition-all duration-700">
                    {/* Front Card */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50/95 via-white/90 to-amber-100/80 backdrop-blur-md">
                      <Image
                        src={item?.images?.[0] || "/img/default-product.jpg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        priority
                      />
                    </div>

                    {/* Back Card */}
                    <div className="absolute inset-0 z-20 flex translate-y-full flex-col items-center justify-center bg-gradient-to-br from-amber-500/95 via-yellow-500/95 to-orange-400/95 p-8 text-white backdrop-blur-xl transition-all duration-700 group-hover:translate-y-0">
                      <div
                        className="absolute -top-12 right-6 z-10 rounded-3xl bg-white/20 p-3 hover:bg-white/30 cursor-pointer"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              title: item.title,
                              price: item.price,
                              image:
                                item?.images?.[0] || "/img/default-product.jpg",
                            })
                          )
                        }
                      >
                        <SlBasket className="h-5 w-5" />
                      </div>

                      <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                      <p className="mb-5 text-white/90">مدرس: محمد یازرلو</p>

                      <div className="mb-8 flex items-center gap-2">
                        <span className="text-3xl font-black">
                          {item.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-white/80">تومان</span>
                      </div>

                      <Link
                        href={`/pages/Products/details/${item._id}`}
                        className="w-full rounded-3xl bg-white/20 px-8 py-4 font-medium backdrop-blur-xl transition-all duration-500 hover:bg-white/30 hover:scale-105"
                      >
                        مشاهده دوره
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="about-home relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-50 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div> */}
        <div className="about-home-head mb-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            درباره ما
            <span className="text-sm text-gray-600 mr-4">
              <FaEye className="inline ml-1" />
              {viewCount} بازدید
            </span>
          </h2>
        </div>
        <div className="about-home-body container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="about-me-content transform hover:-translate-y-2 transition-all duration-500">
            <div className="backdrop-blur-lg bg-white/80 p-8 rounded-3xl shadow-2xl hover:shadow-yellow-200/50">
              <p className="leading-relaxed text-gray-700 text-lg">
                در آموزشگاه مهراندیش راختر و اسان تر یادبگیرید با توجه به
                نیازهای روز دنیا افراد نیازمند یادگیری زبان های برنامه نویسی مبی
                باشد در آموزشگاه مهر اندیش با توجه به تکنولوژی های روز دنیا و به
                صورت اصولی آموزش ببنید تا همیشه در عرصه رقابت ماندگار و پر قدرت
                بمانید در اینجا ما دادن تمرینات متفاوت مهارت و تجربه خود را به
                شما انتقال داده تا بتوانید دانش و مهارت برنامه نویسی رو کسب
                بکنید برنامه نویسی مختص رده سنی خاصی نمی باشد و شما می توانید
                کودکان خود را با این دنیای پر رمز و راز اشنا کنید
              </p>
            </div>
          </div>
          <div className="about-me-images perspective-1000 mt-5">
            <div className="images grid grid-cols-3 gap-6">
              {["/img/1.png", "/img/2.png", "/img/3.jpg"].map((src, index) => (
                <div
                  key={index}
                  className="group relative transform transition-all duration-500 hover:scale-110 hover:z-10"
                  style={{ transform: `translateZ(${index * 20}px)` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative">
                    <Image
                      src={src}
                      width={200}
                      height={200}
                      alt=""
                      className="rounded-xl w-full h-auto object-cover transform transition-all duration-500 group-hover:rotate-6"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="course-learning">
          <div className="course-learning-head">
            <h2>دورهای آموزشی</h2>
          </div>
          <div className="course-learning-body">
            <div className="scroll-container">
              <div className="primary-images">
                {courses.map((item, index) => (
                  <Image
                    key={index}
                    src={item.logo}
                    width={100}
                    height={100}
                    alt=""
                    className="course-image"
                  />
                ))}
              </div>
              <div className="secondary-images">
                {courses.map((item, index) => (
                  <Image
                    key={index}
                    src={item.logo}
                    width={100}
                    height={100}
                    alt=""
                    className="course-image"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-padcast relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-100">
          <div className="liquid-blobs">
            <div
              className="liquid-blob absolute right-0"
              style={{
                background: "rgba(250, 204, 21, 0.3)",
                width: "400px",
                height: "400px",
                animation: "floatingBlobOne 30s linear infinite",
              }}
            ></div>

            <div
              className="liquid-blob absolute right-0"
              style={{
                background: "rgba(252, 211, 77, 0.3)",
                width: "350px",
                height: "350px",
                animation: "floatingBlobTwo 25s linear infinite",
              }}
            ></div>

            <div
              className="liquid-blob absolute right-0"
              style={{
                background: "rgba(251, 191, 36, 0.3)",
                width: "300px",
                height: "300px",
                animation: "floatingBlobThree 35s linear infinite",
              }}
            ></div>
          </div>
        </div>

        <HomeAudioPlayer />
      </div>
      <div className="article bg-gradient-to-b from-gray-50 to-white">
        <div className="article-head flex justify-between items-center mb-8">
          <span className="text-2xl pb-4 font-bold text-gray-800 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1/2 after:h-1 after:bg-yellow-400">
            جدیدترین مقالات
          </span>
          <Link href="/pages/articles" className="article-more">
            بیشتر
          </Link>
        </div>
        <div className="article-body">
          <Swiper
            dir="rtl"
            grabCursor={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            rewind={true}
            slidesPerView={1}
            spaceBetween={24}
            // autoplay={{
            //   delay: 3500,
            //   disableOnInteraction: false,
            // }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Navigation, Autoplay]}
            className="articles-slider"
          >
            {Array.isArray(articles) &&
              articles.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="article-card group hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white">
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt="عنوان مقاله"
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {item.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaEye />
                            {item.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <LuClock />
                            {item.readTime || "5 دقیقه"}
                          </span>
                        </div>

                        <Link
                          href={`/pages/articles/details/${item._id}`}
                          className="text-blue-600 p-2 border border-solid border-yellow-400 hover:text-blue-700 text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          مطالعه
                          <FaArrowLeft />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </main>
  );
}
