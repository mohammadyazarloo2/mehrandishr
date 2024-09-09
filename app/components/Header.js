import { SlBasket } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";


export default function Header() {
  return (
    <>
      <header>
        <div className="nav">
          <div className="nav-menu">
            <div className="nav-items flex">
              <div className="nav-logo">
                <Image width={100} height={100} alt={'logo'} src="/img/icon/logo.png" />
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
                <li className="nav-item">
                  <Link href="" className="nav-link">
                    صفحه ورود
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/pages/Signup" className="nav-link">
                    صفحه عضویت
                  </Link>
                </li>
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
            <Link href="#" className="dots">
              <i className="bi bi-three-dots-vertical"></i>
            </Link>

            <div className="icons-mob-left">
              <div className="profile">
                <Link className="mega-pro" href="/">
                  <i className="bi bi-person-circle"></i>
                </Link>
                <div className="profile-show">
                  <Link href="/profile">ویرایش مشخصات</Link>
                  <Link href={''}>خروج</Link>
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

          <div className="menu-mobile">
            <i className="bi bi-x close-menu"></i>
            <div className="menu-head">
              <div className="menu-head-img">
                <Image alt="logo" width={100} height={100} src="/img/favicon.png" className="img-fluid" />
              </div>
              <div className="menu-head-user">
                <h4>علی اسفندیاری</h4>
              </div>
              <div className="menu-head-dropdown">
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
            <div className="menu-body">
              <ul>
                <li>
                  <i className="bi bi-house"></i>صفحه اصلی
                </li>
                <li>عضویت</li>
              </ul>
            </div>
            <div className="menu-footer">
              <div className="menu-footer-icons">
                <i className="bi bi-twitter"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-linkedin"></i>
                <i className="bi bi-telegram"></i>
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
              <i className="bi bi-search"></i>
            </div>
          </div>
          <button className="btn btn-green nav2-amir" type="button">
            درخواست پروژه
          </button>
          <div className="requests">
            <div className="overlay"></div>
            <div className="requests-body">
              <div className="requests-body-head">
                <h2>درخواست پروژه</h2>
                <i className="bi bi-x close-request"></i>
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
