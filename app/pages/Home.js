"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
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
import { products } from "@/app/data/products";
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
import {
  setCurrentPodcast,
  setIsPlaying,
  setCurrentTime,
  setDuration,
} from "../redux/audioSlice";
import { podcasts } from "../data/podcasts";

import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

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
const data = products;

export default function Index() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off, one, all
  const currentPodcast = useSelector((state) => state.audio.currentPodcast);
  const isPlaying = useSelector((state) => state.audio.isPlaying);
  const currentTime = useSelector((state) => state.audio.currentTime);
  const duration = useSelector((state) => state.audio.duration);

  // آپدیت handleLoadMetadata
  const handleLoadMetadata = (e) => {
    dispatch(setDuration(e.target.duration));
    dispatch(setCurrentTime(0));
  };

  // تابع تغییر حالت تکرار
  const handleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("one");
    else if (repeatMode === "one") setRepeatMode("all");
    else setRepeatMode("off");
  };

  // و تابع handleAudioEnd رو هم اینطور آپدیت میکنیم
  const handleAudioEnd = () => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setIsPlaying(true);
      }
    } else {
      let nextPodcast;

      if (isShuffleOn) {
        const availableIndices = podcasts
          .map((_, index) => index)
          .filter(
            (index) =>
              index !== podcasts.findIndex((p) => p.id === currentPodcast.id)
          );
        const randomIndex =
          availableIndices[Math.floor(Math.random() * availableIndices.length)];
        nextPodcast = podcasts[randomIndex];
      } else {
        const currentIndex = podcasts.findIndex(
          (p) => p.id === currentPodcast.id
        );
        const nextIndex = (currentIndex + 1) % podcasts.length;
        nextPodcast = podcasts[nextIndex];
      }

      setCurrentPodcast(nextPodcast);
      setIsPlaying(true);
    }
  };

  const handleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  // تابع کنترل صدا
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // تابع قطع/وصل صدا
  const handleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSeek = (e) => {
    const timelineWidth = e.currentTarget.clientWidth;
    const clickPosition = timelineWidth - e.nativeEvent.offsetX;
    const seekTime = (clickPosition / timelineWidth) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (isShuffleOn) {
      const availableIndices = podcasts
        .map((_, index) => index)
        .filter(
          (index) =>
            index !== podcasts.findIndex((p) => p.id === currentPodcast.id)
        );
      const randomIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      setCurrentPodcast(podcasts[randomIndex]);
    } else {
      const currentIndex = podcasts.findIndex(
        (p) => p.id === currentPodcast.id
      );
      const nextIndex = (currentIndex + 1) % podcasts.length;
      setCurrentPodcast(podcasts[nextIndex]);
    }
    setIsPlaying(false);
  };
  const handlePrev = () => {
    const currentIndex = podcasts.findIndex((p) => p.id === currentPodcast.id);
    const prevIndex =
      currentIndex === 0 ? podcasts.length - 1 : currentIndex - 1;
    setCurrentPodcast(podcasts[prevIndex]);
    setIsPlaying(false);
  };

  // آپدیت handleTimeUpdate
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));

      if (audioRef.current.currentTime >= audioRef.current.duration - 0.5) {
        handleAudioEnd();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Audio play failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentPodcast, isPlaying]);

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

  return (
    <main>
      <div className="bottem-img">
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
          <SwiperSlide>
            <Image src={"/img/1.jpg"} width={50} height={50} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={"/img/2.jpg"} width={50} height={50} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={"/img/1.jpg"} width={50} height={50} alt="img" />
          </SwiperSlide>
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

        <div className="products">
          <Swiper
            dir="rtl"
            grabCursor={true}
            rewind={true}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            pagination={true}
            className="mySwiper2"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex-box">
                  <div className="flex-box-inner">
                    <div className="flex-box-front">
                      <Image
                        src="/img/javascript.png"
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex-box-back">
                      <Image
                        alt=""
                        className="flex-box-back-img"
                        src="/img/ada38506e144d7940c4a5fea1358cbfa.jpg"
                        width={100}
                        height={100}
                      />
                      <span className="flex-box-back-overlay"></span>
                      <div className="flex-box-back-body">
                        <span className="flex-box-back-body-title">
                          {" "}
                          {item.title}{" "}
                        </span>
                        <span className="flex-box-back-body-master">
                          مدرس : محمد یازرلو
                        </span>
                        <span className="flex-box-back-body-price">
                          {item.price}
                        </span>
                        <button className="flex-box-back-body-button">
                          ادامه مطلب
                        </button>
                      </div>
                      <div
                        className="addbasket"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              title: item.title,
                              price: item.price,
                              image: "/img/javascript.png",
                            })
                          )
                        }
                      >
                        <SlBasket />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="about-home relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-yellow-50">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-50 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="about-home-head mb-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
            درباره ما
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
          <div className="about-me-images perspective-1000">
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="course-padcast-head text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-all duration-300">
              پادکست‌های برنامه‌نویسی
            </h2>
          </div>

          <div className="course-padcast-body flex flex-col lg:flex-row items-center gap-12">
            <div className="course-padcast-content transform hover:-translate-y-2 transition-all duration-500">
              <div className="backdrop-blur-lg bg-white/80 p-8 rounded-3xl shadow-2xl hover:shadow-purple-200/50">
                <p className="leading-relaxed text-gray-700 text-lg">
                  در این بخش سوالات پرتکرار و رایج برنامه نویسی همراه با معرفی
                  زبان‌ها، اطلاعاتی در اختیار کاربران قرار می‌گیرد تا با دیدی
                  روشن‌تر مسیر خود را در دنیای برنامه‌نویسی پیدا کنند
                </p>
              </div>
            </div>

            <div className="course-padcast-player flex-1">
              <div className="player bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-500">
                <audio
                  ref={audioRef}
                  src={currentPodcast.audioSrc}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadMetadata}
                  onEnded={handleAudioEnd}
                />

                <div className="player-img relative mb-8 group perspective">
                  <div className="relative transform transition-all duration-700 group-hover:rotate-6 preserve-3d">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <Image
                      src={currentPodcast.image}
                      width={200}
                      height={200}
                      alt={currentPodcast.title}
                    />
                  </div>
                </div>

                <div className="podcast-info mb-6 text-center">
                  <h3 className="text-xl font-bold">{currentPodcast.title}</h3>
                  <p className="text-gray-600">{currentPodcast.description}</p>
                  <span className="text-sm">{currentPodcast.duration}</span>
                </div>

                <div className="space-y-6">
                  <div
                    className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform origin-left hover:scale-x-105 transition-transform"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>

                  <div className="player-actions flex flex-col gap-4">
                    <div className="flex justify-center items-center gap-8">
                      <button
                        onClick={handleShuffle}
                        className={`text-3xl ${
                          isShuffleOn ? "text-purple-600" : "text-gray-700"
                        } hover:text-purple-600 transform hover:scale-110 transition-all`}
                      >
                        <CiShuffle />
                      </button>
                      <button
                        onClick={handlePrev}
                        className="text-4xl text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all"
                      >
                        <IoPlaySkipBackCircle />
                      </button>
                      <button
                        onClick={handlePlayPause}
                        className="text-5xl text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all"
                      >
                        {isPlaying ? <CiPause1 /> : <CiPlay1 />}
                      </button>
                      <button
                        onClick={handleNext}
                        className="text-4xl text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all"
                      >
                        <BsFillSkipEndCircleFill />
                      </button>
                      <button
                        onClick={handleRepeat}
                        className={`text-3xl ${
                          repeatMode !== "off"
                            ? "text-purple-600"
                            : "text-gray-700"
                        } hover:text-purple-600 transform hover:scale-110 transition-all relative`}
                      >
                        <FaRepeat />
                        {repeatMode === "one" && (
                          <span className="absolute -top-2 -right-2 text-xs">
                            1
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleMute}
                          className="text-xl text-gray-700 hover:text-purple-600"
                        >
                          {isMuted || volume === 0 ? (
                            <FaVolumeMute />
                          ) : (
                            <FaVolumeUp />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gray-200 rounded-full accent-purple-500"
                        />
                      </div>
                      <div className="flex text-sm text-gray-600 font-medium gap-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>/</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="article bg-gradient-to-b from-gray-50 to-white">
        <div className="article-head flex justify-between items-center mb-8">
          <span className="text-2xl pb-4 font-bold text-gray-800 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1/2 after:h-1 after:bg-yellow-400">
            جدیدترین مقالات
          </span>
          <Link href="" className="article-more">
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
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            modules={[Navigation, Autoplay]}
            className="articles-slider"
          >
            {articles.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="article-card group hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/img/1.png"
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
                          140
                        </span>
                        <span className="flex items-center gap-1">
                          <LuClock />5 دقیقه
                        </span>
                      </div>

                      <Link
                        href="/article/1"
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
