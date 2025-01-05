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
