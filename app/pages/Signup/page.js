"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { MdOutlineEmail } from "react-icons/md";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const {push}=useRouter()

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields necessary");
      return;
    }
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("user already exists");
        return;
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("user failed");
      }
    } catch (error) {
      console.log("error during registration", error);
    }
  };

  return (
    <div>
      <div class="login-section">
        <div class="login-section-main">
          <div class="login-section-1">
            <div class="img-profile-comapny">
              <Image
                src="/img/favicon.png"
                width={100}
                height={100}
                alt="comapny-logo"
              />
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
                <label for="email">پست الکترونیک</label>

                <div class="username-addon">
                  <input
                    type="text"
                    id="email"
                    required
                    class="email"
                    placeholder="پست الکترونیک"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdOutlineEmail />
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

              <input type="submit" class="login-btn" value="عضویت در سایت" />

              <div class="register-page">
                <label for="register-go">آیا عضو نشده اید؟</label>
                <button type="button" id="register-go" class="register-btn">
                  ورود به سایت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
