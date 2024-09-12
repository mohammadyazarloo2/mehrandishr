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
      <div className="bottem-img bottem-img-pre"></div>

      <div className="bottom">
        <div className="bottom-head">
          <span className="bottom-head-title">جدیدترین ها</span>
          <div className="bottom-head-more">
            <Link href="/products">بیشتر</Link>
          </div>
        </div>

        <div className="products">
          <div className="preload flex-box">
            <div className="flex-box-inner">
              <div className="flex-box-front"></div>
              <div className="flex-box-back">
                <div className="flex-box-back-img"></div>
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="preload flex-box-back-body-title"> </span>
                  <span className="preload flex-box-back-body-master">
                  </span>
                  <span className="preload flex-box-back-body-price">
                  </span>
                  <button className="preload flex-box-back-body-button">
                  </button>
                </div>
                <div className="preload addbasket">
                </div>
              </div>
            </div>
          </div>

          <div className="preload flex-box">
            <div className="flex-box-inner">
              <div className="flex-box-front"></div>
              <div className="flex-box-back">
                <div className="flex-box-back-img"></div>
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="preload flex-box-back-body-title">
                  </span>
                  <span className="preload flex-box-back-body-master">
                  </span>
                  <span className="preload flex-box-back-body-price">
                  </span>
                  <button className="preload flex-box-back-body-button">
                  </button>
                </div>
                <div className="preload addbasket">
                </div>
              </div>
            </div>
          </div>

          <div className="preload flex-box">
            <div className="flex-box-inner">
              <div className="flex-box-front">
              </div>
              <div className="flex-box-back">
                <div className="flex-box-back-img"></div>
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="preload flex-box-back-body-title"> </span>
                  <span className="preload flex-box-back-body-master">
                  </span>
                  <span className="preload flex-box-back-body-price">
                  </span>
                  <button className="preload flex-box-back-body-button">
                  </button>
                </div>
                <div className="preload addbasket">
                </div>
              </div>
            </div>
          </div>

          <div className="preload flex-box">
            <div className="flex-box-inner">
              <div className="flex-box-front">
              </div>
              <div className="flex-box-back">
                <div className="flex-box-back-img"></div>
                <span className="flex-box-back-overlay"></span>
                <div className="flex-box-back-body">
                  <span className="preload flex-box-back-body-title"> </span>
                  <span className="preload flex-box-back-body-master">
                  </span>
                  <span className="preload flex-box-back-body-price">
                  </span>
                  <button className="preload flex-box-back-body-button">
                  </button>
                </div>
                <div className="preload addbasket">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-home">
        <div className="preload about-home-head">
        </div>
        <div className="about-home-body">
          <div className="prelaod about-me-content">
            <p>
            </p>
            <p>
            </p>
            <p>
            </p>
            <p>
            </p>
            <p>
            </p>
          </div>
          <div className="about-me-images">
            <div className="preload images">
              <Image src="" width={100} height={100} alt="" />
              <Image src="" width={100} height={100} alt="" />
              <Image src="" width={100} height={100} alt="" />
            </div>
          </div>
        </div>

        <div className="prelod course-learning">
          <div className="prelod course-learning-head">
            <h2> </h2>
          </div>
          <div className="prelod course-learning-body">
            <div className="imager preload">
              <div className="arrows">
                <span> </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="preload course-padcast">
        <div className="preload course-padcast-head">
          <h2></h2>
        </div>
        <div className="course-padcast-body">
          <div className="preload course-padcast-content">
            <p>
            </p>
            <p>
            </p>
            <p>
            </p>
            <p>
            </p>
            <p>
            </p>
          </div>
          <div className="preload course-padcast-player">
            <div className="player">
              <div className="player-img">
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

      <div className="preload article">
        <div className="article-head">
          <span> </span>
          <Link href="" className="article-more">
            
          </Link>
        </div>
        <div className="article-body">
          <div className="article-item">
            <div className="article-img">
            <span></span>
            </div>
            <div className="article-content">
              <span className="title"> </span>
              <p>  </p>
            </div>
            <div className="article-footer">
              <span className="views"> </span>
              <Link href="" className="article-more">
                 
              </Link>
            </div>
          </div>
          <div className="article-item">
            <div className="article-img">
            <span></span>
            </div>
            <div className="article-content">
              <span className="title"> </span>
              <p>  </p>
            </div>
            <div className="article-footer">
              <span className="views"> </span>
              <Link href="" className="article-more">
              </Link>
            </div>
          </div>
          <div className="article-item">
            <div className="article-img">
            <span></span>
            </div>
            <div className="article-content">
              <span className="title"> </span>
              <p></p>
            </div>
            <div className="article-footer">
              <span className="views"> </span>
              <Link href="" className="article-more">
              </Link>
            </div>
          </div>
          <div className="article-item">
            <div className="article-img">
              <span></span>
            </div>
            <div className="article-content">
              <span className="title"> </span>
              <p>  </p>
            </div>
            <div className="article-footer">
              <span className="views">140 views</span>
              <Link href="" className="article-more">
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
