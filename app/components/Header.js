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
import { FaUserGraduate } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { SiAmazongames } from "react-icons/si";
import KeyboardGame from "./KeyboardGame";
import { IoClose } from "react-icons/io5";
import ProjectRequest from "./ProjectRequest";
import { FaKeyboard } from "react-icons/fa";
import { VscSnake } from "react-icons/vsc";
import SnakeGame from "./games/SnakeGame";
import { PiExam } from "react-icons/pi";

export default function Header() {
  const [show, setShow] = useState(false);

  const [close, setClose] = useState(false);
  const [openp, setOpenP] = useState(false);
  const [proMenu, setProMenu] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [game, setGame] = useState("");
  const [azmoonModal, setAzmoonModal] = useState(false);

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

  function openProMenu() {
    if (proMenu === true) {
      setProMenu(false);
    } else {
      setProMenu(true);
    }
  }

  function openGames() {
    if (openGame === true) {
      setOpenGame(false);
    } else {
      setOpenGame(true);
    }
  }

  function openAzmoon() {
    if (azmoonModal === true) {
      setAzmoonModal(false);
    } else {
      setAzmoonModal(true);
    }
  }

  function chooseGame(game) {
    if (game === "") {
      setGame("");
    } else {
      setGame(game);
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
              <Link href="/" className="showbasket">
                <SlBasket />
                <span className="cart-quantity">0</span>
              </Link>

              <div
                className={
                  openGame === true ? "gamenetover show" : "gamenetover"
                }
              >
                <div className="gamenet">
                  <div className="game-close" onClick={() => openGames()}>
                    <IoClose />
                  </div>

                  {game === "keyboard-game" ? (
                    <KeyboardGame
                      openGame={game}
                      back={() => chooseGame("")}
                      onClose={() => openGames()}
                    />
                  ) : game === "snake-game" ? (
                    <SnakeGame back={() => chooseGame("")} />
                  ) : (
                    <>
                      <div className="gamenet-title">
                        <span>بازی های آموزشی</span>
                      </div>
                      <div className="gamenet-items">
                        <div
                          className="keyboaard-game"
                          onClick={() => chooseGame("keyboard-game")}
                        >
                          <FaKeyboard />
                          <span>کیبورد</span>
                        </div>
                        <div
                          className="snake-game"
                          onClick={() => chooseGame("snake-game")}
                        >
                          <VscSnake />
                          <span>مار بازی</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="games">
                <SiAmazongames onClick={() => openGames()} />
              </div>
              <div className="azmoon">
                <PiExam onClick={() => openAzmoon()} />
              </div>

              {azmoonModal === true ? (
                <div className="azmoon-modal">
                  <div className="azmoon-body">
                    <div
                      className="azmoon-modal-close"
                      onClick={() => openAzmoon()}
                    >
                      <IoClose />
                    </div>
                    <div className="azmoon-modal-content">
                      <div className="azmoon-modal-title">
                        <span>آزمون آنلاین</span>
                      </div>
                      <div className="azmoon-modal-items">
                        <div className="azmoon-modal-item">
                          <div className="azmoon-modal-item-title">
                            <span>آزمون های آموزشی</span>
                          </div>
                          <div className="azmoon-modal-item-content">
                            <div className="azmoon-modal-item-content-item">
                              <div className="azmoon-modal-item-content-item-title">
                                <span>آزمون های آموزشی</span>
                              </div>
                              <div className=""></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="profile">
                {status === "authenticated" && (
                  <div className="mega-pro" onClick={() => openProMenu()}>
                    <FaUserGraduate />
                    <span>{session.user.name}</span>
                  </div>
                )}
                <div
                  className={
                    proMenu === true ? "profile-show open" : "profile-show"
                  }
                >
                  <Link href="/pages/profile">
                    <FaUserEdit />
                    <span>ویرایش مشخصات</span>
                  </Link>
                  {status === "authenticated" && (
                    <Link href={""} onClick={() => signOut()}>
                      <FaSignOutAlt />
                      <span>خروج</span>
                    </Link>
                  )}
                </div>
              </div>

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
            <ProjectRequest onClose={() => openProject()} />
          </div>
        </div>
      </header>
    </>
  );
}
