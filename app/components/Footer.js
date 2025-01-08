'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaTelegram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from '../redux/settingsSlice';

export default function Footer() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);

  useEffect(() => {
      dispatch(fetchSettings());
    }, [dispatch]);

  return (
    <footer className="bg-zinc-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ستون اول - لوگو و توضیحات */}
          <div className="space-y-4">
            <Image src={settings?.general?.logo?.light} width={120} height={40} alt="Logo" className="mb-4" />
            <p className="text-sm leading-relaxed">
              {settings?.general?.description}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <FaTelegram size={24} />
              </Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="hover:text-yellow-400 transition-colors">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          {/* ستون دوم - دسترسی سریع */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-400 transition-colors">صفحه اصلی</Link></li>
              <li><Link href="/courses" className="hover:text-yellow-400 transition-colors">دوره‌ها</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-400 transition-colors">وبلاگ</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition-colors">درباره ما</Link></li>
            </ul>
          </div>

          {/* ستون سوم - دوره های محبوب */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">دوره‌های محبوب</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">آموزش ری‌اکت</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">آموزش نکست</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">برنامه‌نویسی پایتون</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">طراحی UI/UX</Link></li>
            </ul>
          </div>

          {/* ستون چهارم - خبرنامه */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white"> {settings?.features?.newsletter?.title} </h3>
            <p className="text-sm mb-4"> {settings?.features?.newsletter?.subtitle}  </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
              />
              <button className="w-full px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-400/90 transition-colors">
                عضویت
              </button>
            </form>
          </div>
        </div>

        {/* بخش کپی‌رایت */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>تمامی حقوق برای آکادمی محفوظ است © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
