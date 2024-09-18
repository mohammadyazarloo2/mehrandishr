"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

export default function Signin() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { push } = useRouter();

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        name,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("invalid credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      setError("Invalid credentials");
      console.log(error);
    }
  };

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
          <form onSubmit={handleSubmit} method="post" class="form-login">
            <div class="input-group-addon">
              <label for="username">نام کاربری</label>

              <div class="username-addon">
                <input
                  type="text"
                  id="username"
                  required
                  class="username"
                  placeholder="نام کاربری"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FaRegUser />
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
                onChange={(e) => setPassword(e.target.value)}
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
