import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaTelegram, FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ستون اول - لوگو و توضیحات */}
          <div className="space-y-4">
            <Image src="/img/icon/logo.png" width={120} height={40} alt="Logo" className="mb-4" />
            <p className="text-sm leading-relaxed">
              آکادمی ما با ارائه آموزش‌های تخصصی و کاربردی، مسیر یادگیری شما را هموار می‌کند.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link href="#" className="hover:text-primary transition-colors">
                <FaInstagram size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaTelegram size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaTwitter size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          {/* ستون دوم - دسترسی سریع */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">صفحه اصلی</Link></li>
              <li><Link href="/courses" className="hover:text-primary transition-colors">دوره‌ها</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">وبلاگ</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">درباره ما</Link></li>
            </ul>
          </div>

          {/* ستون سوم - دوره های محبوب */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">دوره‌های محبوب</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">آموزش ری‌اکت</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">آموزش نکست</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">برنامه‌نویسی پایتون</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">طراحی UI/UX</Link></li>
            </ul>
          </div>

          {/* ستون چهارم - خبرنامه */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">عضویت در خبرنامه</h3>
            <p className="text-sm mb-4">برای اطلاع از آخرین دوره‌ها و تخفیف‌ها، در خبرنامه ما عضو شوید.</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
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
