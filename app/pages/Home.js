"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlBasket } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useCart } from '@/contexts/CartContext'

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

export default function Index() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const { addToCart } = useCart()

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
            <SwiperSlide>
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
                      <span className="flex-box-back-body-title">دوره php</span>
                      <span className="flex-box-back-body-master">
                        مدرس : محمد یازرلو
                      </span>
                      <span className="flex-box-back-body-price">
                        30,000,000 تومان
                      </span>
                      <button className="flex-box-back-body-button">
                        ادامه مطلب
                      </button>
                    </div>
                    <div
                      className="addbasket"
                      onClick={() =>
                        addToCart({
                          title: "دوره php",
                          price: "30,000,000",
                          image: "/img/javascript.png",
                        })
                      }
                    >
                      <SlBasket />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
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
                      <span className="flex-box-back-body-title">دوره php</span>
                      <span className="flex-box-back-body-master">
                        مدرس : محمد یازرلو
                      </span>
                      <span className="flex-box-back-body-price">
                        30,000,000 تومان
                      </span>
                      <button className="flex-box-back-body-button">
                        ادامه مطلب
                      </button>
                    </div>
                    <div className="addbasket">
                      <SlBasket />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
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
                      <span className="flex-box-back-body-title">دوره php</span>
                      <span className="flex-box-back-body-master">
                        مدرس : محمد یازرلو
                      </span>
                      <span className="flex-box-back-body-price">
                        30,000,000 تومان
                      </span>
                      <button className="flex-box-back-body-button">
                        ادامه مطلب
                      </button>
                    </div>
                    <div className="addbasket">
                      <SlBasket />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
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
                      <span className="flex-box-back-body-title">دوره php</span>
                      <span className="flex-box-back-body-master">
                        مدرس : محمد یازرلو
                      </span>
                      <span className="flex-box-back-body-price">
                        30,000,000 تومان
                      </span>
                      <button className="flex-box-back-body-button">
                        ادامه مطلب
                      </button>
                    </div>
                    <div className="addbasket">
                      <SlBasket />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
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
                      <span className="flex-box-back-body-title">دوره php</span>
                      <span className="flex-box-back-body-master">
                        مدرس : محمد یازرلو
                      </span>
                      <span className="flex-box-back-body-price">
                        30,000,000 تومان
                      </span>
                      <button className="flex-box-back-body-button">
                        ادامه مطلب
                      </button>
                    </div>
                    <div className="addbasket">
                      <SlBasket />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="about-home">
        <div className="about-home-head">
          <h2>درباره ما</h2>
        </div>
        <div className="about-home-body">
          <div className="about-me-content">
            <p>
              در آموزشگاه مهراندیش راختر و اسان تر یادبگیرید با توجه به نیازهای
              روز دنیا افراد نیازمند یادگیری زبان های برنامه نویسی مبی باشد در
              آموزشگاه مهر اندیش با توجه به تکنولوژی های روز دنیا و به صورت
              اصولی آموزش ببنید تا همیشه در عرصه رقابت ماندگار و پر قدرت بمانید
              در اینجا ما دادن تمرینات متفاوت مهارت و تجربه خود را به شما انتقال
              داده تا بتوانید دانش و مهارت برنامه نویسی رو کسب بکنید برنامه
              نویسی مختص رده سنی خاصی نمی باشد و شما می توانید کودکان خود را با
              این دنیای پر رمز و راز اشنا کنید
            </p>
          </div>
          <div className="about-me-images">
            <div className="images">
              <Image src="/img/1.png" width={100} height={100} alt="" />
              <Image src="/img/2.png" width={100} height={100} alt="" />
              <Image src="/img/3.jpg" width={100} height={100} alt="" />
            </div>
          </div>
        </div>

        <div className="course-learning">
          <div className="course-learning-head">
            <h2>دورهای آموزشی</h2>
          </div>
          <div className="course-learning-body">
            <div className="images">
              {courses.map((item, index) => {
                return (
                  <Image
                    key={index}
                    src={item.logo}
                    width={100}
                    height={100}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="images">
              {courses.map((item, index) => {
                return (
                  <Image
                    key={index}
                    src={item.logo}
                    width={100}
                    height={100}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="course-padcast">
        <div className="course-padcast-head">
          <h2>پادکست</h2>
        </div>
        <div className="course-padcast-body">
          <div className="course-padcast-content">
            <p>
              در این بخش سوالات پرتکرار و رایج برنامه نویسی همراه با معرفی زبان
              ها اظلاعاتی در اختیار کاربران این وبسایت قرار میگیرد که به بوسیله
              ان کاربران م توانند دانش جزیی پیدا کرده و با چشمان باز تری مسیر
              خود را در زبان های برنامه نویسی پیدا کنند
            </p>
          </div>
          <div className="course-padcast-player">
            <div className="player">
              <div className="player-img">
                <Image src="/img/1.png" width={100} height={100} alt="" />
              </div>
              <div className="player-actions">
                <i className="bi bi-skip-end-circle"></i>
                <i className="bi bi-play-circle"></i>
                <i className="bi bi-skip-start-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="article">
        <div className="article-head">
          <span>جدیدترین مقالات</span>
          <Link href="" className="article-more">
            بیشتر
          </Link>
        </div>
        <div className="article-body">
          <Swiper
            dir="rtl"
            grabCursor={true}
            navigation={true}
            rewind={true}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation]}
            pagination={true}
            className="courseblog"
          >
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="article-item">
                <div className="article-img">
                  <Image src="/img/1.png" alt="" width={100} height={100} />
                </div>
                <div className="article-content">
                  <span className="title">طراحی وبسایت</span>
                  <p>طراحی صفحات وب</p>
                </div>
                <div className="article-footer">
                  <span className="views">140 views</span>
                  <Link href="" className="article-more">
                    بیشتر بخوانید
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  );
}
