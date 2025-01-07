"use client";
import { SlBasket } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import {
  FaBook,
  FaEnvelope,
  FaHome,
  FaInfo,
  FaInstagram,
  FaLock,
} from "react-icons/fa";
import { FaPerson, FaPersonRifle, FaXTwitter } from "react-icons/fa6";
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
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

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
                <li className="relative group nav-item">
                  <Link href="/" className="nav-link flex items-center gap-1">
                    <span className="flex items-center gap-2">
                      <FaHome className="text-xl text-gray-800" />
                      صفحه اصلی
                    </span>
                    <i className="bi bi-chevron-down transition duration-300 group-hover:rotate-180"></i>
                  </Link>
                </li>

                <li className="relative group nav-item">
                  <Link href="" className="nav-link flex items-center gap-1">
                    <span className="flex items-center gap-2">
                      <FaComputer className="text-xl text-gray-800" />
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
                          {categories.map(
                            (category) =>
                              category.parent === "main" &&
                              category.isActive && (
                                <li key={category._id} className="group/item">
                                  <Link
                                    href={`/courses/${category.sub}`}
                                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-all"
                                  >
                                    {/* {getCategoryIcon(category.sub)} */}
                                    <span>{category.name}</span>
                                  </Link>
                                </li>
                              )
                          )}
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
                  <li className="relative group nav-item">
                    <Link
                      href="/pages/profile"
                      className="nav-link flex items-center gap-1"
                    >
                      <FaPerson className="text-xl text-gray-800" />
                      پروفایل
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="relative group nav-item">
                      <Link
                        href="/pages/Signin"
                        className="nav-link flex items-center gap-1"
                      >
                        <FaLock className="text-xl text-gray-800" />
                        صفحه ورود
                      </Link>
                    </li>
                  </>
                )}
                <li className="relative group nav-item">
                  <Link
                    href="/pages/articles"
                    className="nav-link flex items-center gap-1"
                  >
                    <FaBook className="text-xl text-gray-800" />
                    مقالات
                  </Link>
                </li>
                <li className="relative group nav-item">
                  <Link
                    href="/pages/contact"
                    className="nav-link flex items-center gap-1"
                  >
                    <FaEnvelope className="text-xl text-gray-800" />
                    تماس با ما{" "}
                  </Link>
                </li>
                <li className="relative group nav-item">
                  <Link
                    href="/pages/about"
                    className="nav-link flex items-center gap-1"
                  >
                    <FaInfo className="text-xl text-gray-800" />
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

          <div
            className={`fixed inset-y-0 right-0 w-80 bg-white/90 backdrop-blur-lg transform transition-transform duration-300 ease-out shadow-2xl z-50 ${
              show ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={openMenu}
              className="absolute top-4 left-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <RiCloseLargeFill className="text-2xl" />
            </button>

            {/* Header Section */}
            <div className="p-6 border-b border-gray-100">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  alt="logo"
                  src="/img/favicon.png"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>

              <div className="text-center">
                {status === "authenticated" ? (
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800">
                      {session.user.name}
                    </h4>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      کاربر فعال
                    </span>
                  </div>
                ) : (
                  <h4 className="font-medium text-gray-600">کاربر مهمان</h4>
                )}
              </div>
            </div>

            {/* Menu Items */}
            <nav className="py-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                  >
                    <FaHouseLaptop className="text-xl text-gray-400 group-hover:text-blue-500" />
                    <span>صفحه اصلی</span>
                  </Link>
                </li>

                <li className="border-b border-gray-100">
                  <button
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    className="w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FaComputer className="text-xl text-gray-400 group-hover:text-blue-500" />
                      <span>دوره‌ها</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 transform ${
                        isCoursesOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                      isCoursesOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="py-2">
                      {categories.map(
                        (category) =>
                          category.parent === "main" &&
                          category.isActive && (
                            <Link
                              key={category._id}
                              href={`/courses/${category.sub}`}
                              className="flex items-center gap-3 px-8 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                            >
                              {/* {getCategoryIcon(category.sub)} */}
                              <span>{category.name}</span>
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                </li>

                {status === "authenticated" ? (
                  <li>
                    <Link
                      href="/pages/profile"
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                    >
                      <ImProfile className="text-xl text-gray-400 group-hover:text-blue-500" />
                      <span>پروفایل</span>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/pages/Signin"
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                    >
                      <PiSignIn className="text-xl text-gray-400 group-hover:text-blue-500" />
                      <span>ورود</span>
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    href="/pages/contact"
                    className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                  >
                    <MdContactPhone className="text-xl text-gray-400 group-hover:text-blue-500" />
                    <span>تماس با ما</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/pages/about"
                    className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                  >
                    <FcAbout className="text-xl text-gray-400 group-hover:text-blue-500" />
                    <span>درباره ما</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FaXTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-700 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <SiTelegram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="nav2">
          <div className="nav-icons">
            {/* <Image width={100} height={100} alt="" /> */}
          </div>
          <div className="nav2-tex">
            <div className="relative group w-[70%]">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg shadow-amber-500/10 transition-all duration-300 hover:shadow-amber-500/20 hover:bg-white/20">
                <input
                  className="bg-transparent outline-none w-full text-gray-800 focus:border-none focus:ring-0 focus:placeholder:text-amber-500 transition-colors"
                  type="search"
                  placeholder="جستجوی دوره، مقاله، مدرس ..."
                />
                <BsSearch className="h-5 w-5 text-gray-600 group-hover:text-amber-500 group-hover:rotate-12 transition-all duration-500" />
              </div>
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-xl transition-all duration-500 group-hover:blur-3xl" />
            </div>
          </div>
          <button
            className="relative group overflow-hidden btn btn-green"
            onClick={openProject}
            type="button"
          >
            <div className="nav-amit-content relative z-10 flex items-center gap-2 px-4 py-2">
              <span className="font-medium">درخواست پروژه</span>
              <GrProjects className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-150" />
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
