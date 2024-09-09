"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlBasket } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
import { Autoplay } from "swiper/modules";


export default function Loading() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

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
            <Image src={""} width={50} height={50} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={""} width={50} height={50} alt="img" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={""} width={50} height={50} alt="img" />
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
            <Link href="/products">بیشتر</Link>
          </div>
        </div>

        <div className="products">
          <div className="flex-box">
            <div className="flex-box-inner">
              <div className="flex-box-front">
                <Image
                  src=""
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex-box-back">
                <Image
                  alt=""
                  className="flex-box-back-img"
                  src=""
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
                  src=""
                  width={100}
                  height={100}
                />
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="flex-box-back-body-title">
                    دوره html&css
                  </span>
                  <span className="flex-box-back-body-master">
                    مدرس : محمد یازرلو
                  </span>
                  <span className="flex-box-back-body-price">
                    10,000,000 تومان
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
                  src=""
                  width={100}
                  height={100}
                />
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="flex-box-back-body-title">دوره nodejs </span>
                  <span className="flex-box-back-body-master">
                    مدرس : محمد یازرلو
                  </span>
                  <span className="flex-box-back-body-price">
                    40,000,000 تومان
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

          <div className="flex-box">
            <div className="flex-box-inner">
              <div className="flex-box-front">
                <Image
                  src=""
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex-box-back">
                <Image
                  alt=""
                  className="flex-box-back-img"
                  src=""
                  width={100}
                  height={100}
                />
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="flex-box-back-body-title">دوره mysql</span>
                  <span className="flex-box-back-body-master">
                    مدرس : محمد یازرلو
                  </span>
                  <span className="flex-box-back-body-price">
                    20,000,000 تومان
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
              <Image src="" width={100} height={100} alt="" />
              <Image src="" width={100} height={100} alt="" />
              <Image src="" width={100} height={100} alt="" />
            </div>
          </div>
        </div>

        <div className="course-learning">
          <div className="course-learning-head">
            <h2>دورهای آموزشی</h2>
          </div>
          <div className="course-learning-body">
            <div className="images">
              <Image src="/img/html-css.jpg" width={100} height={100} alt="" />
              <Image src="/img/html-css.jpg" width={100} height={100} alt="" />
              <Image src="/img/html-css.jpg" width={100} height={100} alt="" />
              <Image src="/img/html-css.jpg" width={100} height={100} alt="" />
              <Image src="/img/html-css.jpg" width={100} height={100} alt="" />
              <Image src="/img/html-css.jpg" width={100} height={100} alt="" />
              <div className="arrows">
                <span> </span>
              </div>
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
          <div className="article-item">
            <div className="article-img">
              <Image src="/img/1.png" width={100} height={100} alt="" />
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
          <div className="article-item">
            <div className="article-img">
              <Image src="/img/1.png" width={100} height={100} alt="" />
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
          <div className="article-item">
            <div className="article-img">
              <Image src="/img/1.png" width={100} height={100} alt="" />
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
        </div>
      </div>
    </main>
  )
}
