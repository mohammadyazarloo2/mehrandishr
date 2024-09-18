"use client";
import { SlBasket } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { useSession, signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaHouseLaptop } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { MdContactPhone } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { PiSignIn } from "react-icons/pi";
import { FcAbout } from "react-icons/fc";

export default function Header() {
  const [show, setShow] = useState(false);

  const [close, setClose] = useState(false);
  const [openp, setOpenP] = useState(false);

  const { data: session, status } = useSession();

  function openProject() {
    if (openp === true) {
      setOpenP(false);
    } else {
      setOpenP(true);
    }
  }

  function openMenu() {
    console.log(show);
    console.log(close);
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  function closeMenu() {
    if (close === true) {
      setClose(false);
    } else {
      setClose(true);
    }
  }

  return (
    <>
      <header>
        <div className="nav">
          <div className="nav-menu">
            <div className="nav-items flex">
              <div className="nav-logo">
                <Image
                  width={100}
                  height={100}
                  alt={"logo"}
                  src="/img/icon/logo.png"
                />
              </div>
              <ul>
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    صفحه اصلی
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="" className="nav-link">
                    دوره ها<i className="bi bi-chevron-down"></i>
                  </Link>
                  <ul>
                    <li>
                      <Link href="">دوره html</Link>
                    </li>
                    <li>
                      <Link href="">دوره css</Link>
                    </li>
                    <li>
                      <Link href="">دوره javascript</Link>
                    </li>
                    <li>
                      <Link href="">دوره html</Link>
                    </li>
                  </ul>
                </li>
                {status === "authenticated" ? (
                  <li className="nav-item">
                    <Link href="/pages/profile" className="nav-link">
                      پروفایل
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link href="/pages/Signin" className="nav-link">
                        صفحه ورود
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/pages/Signup" className="nav-link">
                        صفحه عضویت
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link href="" className="nav-link">
                    تماس با ما{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="" className="nav-link">
                    درباره ما
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-icon">
            <Link href="#" onClick={openMenu} className="dots">
              <BsThreeDotsVertical />
            </Link>

            <div className="icons-mob-left">
              <div className="profile">
                {status === "authenticated" && (
                  <div className="mega-pro" onClick={() => signOut()}>
                    <FaSignOutAlt />
                    {session.user.name}
                  </div>
                )}
                <div className="profile-show">
                  <Link href="/profile">ویرایش مشخصات</Link>
                  <Link href={""}>خروج</Link>
                </div>
              </div>

              <Link href="/" className="showbasket">
                <SlBasket />
                <span className="cart-quantity">0</span>
              </Link>
              <Link href="/">
                <i className="bi bi-headset red"></i>
              </Link>
            </div>
          </div>

          <div className={show === true ? "open menu-mobile" : "menu-mobile"}>
            <div className="clossidemob">
              <RiCloseLargeFill onClick={openMenu} />
            </div>
            <div className="menu-head">
              <div className="menu-head-img">
                <Image
                  alt="logo"
                  width={100}
                  height={100}
                  src="/img/favicon.png"
                  className="img-fluid"
                />
              </div>
              {status === "authenticated" ? (
                <div className="menu-head-user">
                  <h4> {session.user.name} </h4>
                  {status === "authenticated" && (
                    <div className="mega-pro" onClick={() => signOut()}>
                      <FaSignOutAlt />
                    </div>
                  )}
                </div>
              ) : (
                <div className="menu-head-user">
                  <h4>کاربر </h4>
                </div>
              )}
              <div className="menu-head-dropdown">
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
            <div className="menu-body">
              <ul>
                <li>
                  <Link href={"/"}>
                    <FaHouseLaptop />
                    صفحه اصلی
                  </Link>
                </li>
                {status === "authenticated" ? (
                  <li>
                    <Link href="/pages/profile">
                      <ImProfile />
                      پروفایل
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/pages/Signin">
                        <PiSignIn />
                        ورود
                      </Link>
                    </li>
                    <li>
                      <Link href="/pages/Signup">
                        <SiGnuprivacyguard />
                        عضویت
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link href="/">
                    <MdContactPhone />
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <FcAbout />
                    درباره ما
                  </Link>
                </li>
                {status === "authenticated" && (
                  <li>
                    <Link href="/pages/Signup" onClick={() => signOut()}>
                      <i className="bi bi-house"></i>خروج
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="menu-footer">
              <div className="menu-footer-icons">
                <FaXTwitter />
                <FaInstagram />
                <FaLinkedin />
                <SiTelegram />
              </div>
            </div>
          </div>
        </div>

        <div className="nav2">
          <div className="nav-icons">
            {/* <Image width={100} height={100} alt="" /> */}
          </div>
          <div className="nav2-tex">
            <div className="input-group">
              <input
                className="nav2-search"
                type="search"
                placeholder="جستجو ..."
              />
              <BsSearch />
            </div>
          </div>
          <button
            className="btn btn-green nav2-amir"
            onClick={openProject}
            type="button"
          >
            <div className="nav-amit-content">
              درخواست پروژه
              <GrProjects />
            </div>
            <span className="nav2-amir-overlay"></span>
          </button>
          <div className={openp === true ? "open requests" : "requests"}>
            <div className="overlay"></div>
            <div className="requests-body">
              <div className="requests-body-head">
                <h2>درخواست پروژه</h2>
                <RiCloseLargeFill onClick={openProject} />
              </div>
              <form className="requests-body-form">
                <div className="input-group">
                  <label>نام کاربری</label>
                  <input type="text" className="username" id="username" />
                </div>
                <div className="input-group">
                  <label>پست الکترونیک</label>
                  <input type="text" className="username" id="username" />
                </div>
                <div className="input-group">
                  <label>شماره تماس</label>
                  <input type="text" className="username" id="username" />
                </div>
                <div className="input-group">
                  <label>پیام یا تقاضا</label>
                  <textarea name="" rows="10" cols="8" id=""></textarea>
                </div>
                <button className="request-btn">ثبت درخواست</button>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
