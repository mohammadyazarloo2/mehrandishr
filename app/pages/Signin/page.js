import Image from "next/image";

export default function Signin() {
  return (
    <div class="login-section">
      <div class="login-section-main">
        <div class="login-section-1">
          <div class="img-profile-comapny">
            <Image width={100} height={100} src="/img/favicon.png" alt="logo" />
          </div>
          <div class="name-comapny">
            <span>آموزشگاه مهراندیش</span>
          </div>
          <div class="company-d">
            <span>
              آموزشگاه کامپیوتر تدریس دورهای برنامه نویسی و کامپیوتر زیر نظر
              سازمان فنی و حرفه ای کشور
            </span>
          </div>
          <div class="registers">
            <button class="google" type="button">
              عضویت با اکانت گوگل<i class="bi bi-google"></i>
            </button>
            <button class="github" type="button">
              عضویت با اکانت گیت هاب<i class="bi bi-github"></i>
            </button>
          </div>
        </div>
        <div class="login-section-2">
          <form method="post" class="form-login">
            <div class="input-group-addon">
              <label for="username">نام کاربری</label>

              <div class="username-addon">
                <input
                  type="text"
                  id="username"
                  required
                  class="username"
                  placeholder="نام کاربری"
                />
                <i class="bi bi-person-fill"></i>
              </div>
              <div class="username-alert"></div>
            </div>
            <div class="input-group-addon">
              <label for="password">کلمه عبور</label>
              <input
                type="password"
                required
                id="password"
                class="password"
                placeholder="کلمه عبور"
              />
            </div>
            <div class="remember">
              <input type="checkbox" id="remmberme" class="remmberme" />
              <label for="remmberme">مرا به خاطر بسپار</label>
            </div>

            <input type="submit" class="login-btn" value="ورود به سایت" />

            <div class="register-page">
              <label for="register-go">آیا عضو نشده اید؟</label>
              <button type="button" id="register-go" class="register-btn">
                عضویت در سایت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
