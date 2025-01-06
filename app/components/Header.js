"use client";
import { SlBasket } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
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
import { FaComputer } from "react-icons/fa6";
import { TbHtml } from "react-icons/tb";
import { MdOutlineCss } from "react-icons/md";
import { AiOutlineJavaScript } from "react-icons/ai";
import { TbBrandPhp } from "react-icons/tb";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { decraceQuantity, removeFromCart, addToCart } from "../redux/cartSlice";
import ExamsCategory from "./exams/ExamsCategory";
import { fetchSettings } from "../redux/settingsSlice";

export default function Header() {
  const [show, setShow] = useState(false);

  const [close, setClose] = useState(false);
  const [openp, setOpenP] = useState(false);
  const [proMenu, setProMenu] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [game, setGame] = useState("");

  const [azmoonModal, setAzmoonModal] = useState(false);
  const [azmoon, setAzmoon] = useState(false);
  const [basket, setBasket] = useState(false);

  const { data: session, status } = useSession();
  // const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showExamModal, setShowExamModal] = useState(false);
  const settings = useSelector((state) => state.settings.data);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const openExamModal = () => {
    setShowExamModal(!showExamModal);
  };
  function showBasket() {
    if (basket === true) {
      setBasket(false);
    } else {
      setBasket(true);
    }
  }

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

  function openAzmoonModal() {
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

  function chooseAzmoon(azmoon) {
    if (azmoon === "") {
      setAzmoon("");
    } else {
      setAzmoon(azmoon);
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
                  src={settings?.general?.logo?.light}
                />
              </div>
              <ul>
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    صفحه اصلی
                  </Link>
                </li>

                <li className="relative group nav-item">
                  <Link href="" className="nav-link flex items-center gap-1">
                    <span className="flex items-center gap-2">
                      <FaComputer className="text-xl text-blue-500" />
                      دوره ها
                    </span>
                    <i className="bi bi-chevron-down transition duration-300 group-hover:rotate-180"></i>
                  </Link>

                  <div className="absolute top-full right-0 w-[1000px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                    <div className="grid grid-cols-12 gap-6 p-8">
                      {/* منوی اصلی */}
                      <div className="col-span-3 border-l border-gray-100">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">
                          دسته‌بندی دوره‌ها
                        </h3>
                        <ul className="space-y-1">
                          <li className="group/item relative">
                            <Link
                              href="/courses/frontend"
                              className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-all"
                            >
                              <TbHtml className="text-xl text-blue-500" />
                              <span>برنامه‌نویسی فرانت‌اند</span>
                            </Link>
                          </li>
                          <li className="group/item relative">
                            <Link
                              href="/courses/backend"
                              className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-50 transition-all"
                            >
                              <TbBrandPhp className="text-xl text-purple-500" />
                              <span>برنامه‌نویسی بک‌اند</span>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* دوره‌های محبوب */}
                      <div className="col-span-6">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">
                          دوره‌های پرطرفدار
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Link
                            href="/course/react"
                            className="group/course block p-4 rounded-xl hover:bg-gray-50 transition-all"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <AiOutlineJavaScript className="text-2xl" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800 group-hover/course:text-blue-600 transition-colors">
                                  دوره جامع React
                                </h4>
                                <p className="text-sm text-gray-500">
                                  ۴۵ ساعت آموزش
                                </p>
                              </div>
                            </div>
                          </Link>

                          <Link
                            href="/course/nodejs"
                            className="group/course block p-4 rounded-xl hover:bg-gray-50 transition-all"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                <TbBrandPhp className="text-2xl" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800 group-hover/course:text-green-600 transition-colors">
                                  دوره Node.js
                                </h4>
                                <p className="text-sm text-gray-500">
                                  ۳۵ ساعت آموزش
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* بخش ویژه */}
                      <div className="col-span-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white">
                          <h3 className="font-bold text-lg mb-3">تخفیف ویژه</h3>
                          <p className="text-sm mb-4 text-blue-100">
                            با خرید اشتراک ویژه، به تمام دوره‌ها دسترسی پیدا
                            کنید!
                          </p>
                          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                            خرید اشتراک
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  </>
                )}
                <li className="nav-item">
                  <Link href="/pages/articles" className="nav-link">
                    مقالات
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/pages/contact" className="nav-link">
                    تماس با ما{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/pages/about" className="nav-link">
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
              <div className="showbasket">
                <SlBasket onClick={() => showBasket()} />
                <span className="cart-quantity">
                  {cart.length > 0 ? (
                    <span className="cart-counter">{cart.length}</span>
                  ) : (
                    0
                  )}
                </span>
              </div>

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
                <PiExam onClick={() => openExamModal()} />
              </div>

              {showExamModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <ExamsCategory
                      onClose={openExamModal}
                      isOpen={showExamModal}
                    />
                  </div>
                </div>
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
                  </>
                )}
                <li>
                  <Link href="/pages/contact">
                    <MdContactPhone />
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/pages/about">
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

        <div className={`cart-controls ${basket === true ? "show" : ""}`}>
          <div className="cart-item-controls">
            <div className="cart-item-head">
              <div className="cart-item-head-title">سبد خرید</div>
              <IoClose onClick={() => showBasket()} />
            </div>
            {cart.length > 0 ? (
              cart.map((product) => (
                <>
                  <div className="cart-item">
                    <div className="cart-item-title">{product.title}</div>
                    <div className="cart-item-action">
                      <button
                        className="cart-item-minus"
                        onClick={() => dispatch(decraceQuantity(product.title))}
                      >
                        -
                      </button>
                      <span>
                        {cart.find((item) => item.title === product.title)
                          ?.quantity || 0}
                      </span>
                      <button
                        className="cart-item-pluse"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => dispatch(removeFromCart(product.title))}
                    >
                      <MdRemoveShoppingCart />
                    </button>
                  </div>
                </>
              ))
            ) : (
              <h2 className=" rounded-md p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800">
                سبد خرید شما خالی می باشد
              </h2>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
