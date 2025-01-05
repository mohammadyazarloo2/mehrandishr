"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  FaRegUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaKey,
  FaGraduationCap,
  FaBook,
  FaCertificate,
} from "react-icons/fa";

export default function Signin() {
  const [activeTab, setActiveTab] = useState("password");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [verificationInputs, setVerificationInputs] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return router.push("/");
  }

  // Add this function for handling single digit inputs
  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newInputs = [...verificationInputs];
    newInputs[index] = value;
    setVerificationInputs(newInputs);
    setVerificationCode(newInputs.join(""));

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Add resend functionality
  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    await handleEmailVerification();
    setResendTimer(120);

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleEmailVerification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "email", email }),
      });

      const data = await response.json();
      if (data.success) {
        setShowVerification(true);
        setMessage("کد تایید به ایمیل شما ارسال شد");
      }
    } catch (error) {
      setError("خطا در ارسال کد تایید");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneVerification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "phone", phone }),
      });

      const data = await response.json();
      if (data.success) {
        setShowVerification(true);
        setMessage("کد تایید به شماره موبایل شما ارسال شد");
      }
    } catch (error) {
      setError("خطا در ارسال کد تایید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      if (activeTab === "email") {
        if (!showVerification) {
          // Send verification code
          const response = await fetch("/api/auth/send-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "email", email }),
          });

          const data = await response.json();
          if (data.success) {
            setShowVerification(true);
            setMessage("کد تایید به ایمیل شما ارسال شد");
            setIsLoading(false);
            return;
          }
        } else {
          // Login with verification code
          const signInResponse = await signIn("credentials", {
            type: "email",
            email,
            verificationCode,
            redirect: false,
            callbackUrl: "/",
          });

          console.log("SignIn response:", signInResponse);

          if (!signInResponse?.error) {
            router.replace("/");
            return;
          }
        }
      }
      if (activeTab === "password") {
        await handlePasswordLogin();
        return;
      }

      setError("لطفا اطلاعات را بررسی و مجددا تلاش کنید");
    } catch (error) {
      console.log("Submit Error:", error);
      setError("خطا در برقراری ارتباط");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        type: "password",
        email,
        password,
        redirect: false,
      });

      if (!res?.error) {
        router.replace("/dashboard");
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      setError("خطا در برقراری ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-700">در حال ارسال کد تایید...</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading && <LoadingSpinner />}
      <div className="max-w-5xl w-full flex bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Right Section - Branding & Features */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-yellow-400 hover:via-[#ffdb00] to-yellow-600 p-12 relative">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
          <div className="relative h-full flex flex-col justify-between z-10">
            <div className="space-y-8">
              <div className="text-center">
                <Image
                  width={140}
                  height={140}
                  src="/img/favicon.png"
                  alt="logo"
                  className="mx-auto mb-8 hover:scale-105 transition-transform duration-300"
                />
                <h2 className="text-4xl font-bold text-white mb-4">
                  آموزشگاه مهراندیش
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  همراه شما در مسیر یادگیری و پیشرفت حرفه‌ای
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <FaGraduationCap className="text-2xl" />,
                  title: "آموزش تخصصی",
                  desc: "دوره‌های پیشرفته برنامه‌نویسی",
                },
                {
                  icon: <FaBook className="text-2xl" />,
                  title: "منابع آموزشی",
                  desc: "دسترسی به جدیدترین منابع",
                },
                {
                  icon: <FaCertificate className="text-2xl" />,
                  title: "مدرک معتبر",
                  desc: "گواهینامه رسمی فنی و حرفه‌ای",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rtl:space-x-reverse hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-blue-100 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              خوش آمدید
            </h2>
            <p className="text-gray-600 mt-2">
              به پنل کاربری مهراندیش وارد شوید
            </p>
          </div>

          {/* Login Tabs */}
          <div className="flex rounded-2xl bg-gray-100/50 p-1.5 mb-8">
            {[
              { id: "password", icon: <FaKey />, label: "رمز عبور" },
              { id: "phone", icon: <FaPhone />, label: "موبایل" },
              { id: "email", icon: <FaEnvelope />, label: "ایمیل" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                  ${
                    activeTab === tab.id
                      ? "bg-white shadow-lg shadow-blue-500/10 text-blue-600 scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Tab */}
            {activeTab === "password" && (
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام کاربری یا ایمیل
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                      placeholder="نام کاربری یا ایمیل خود را وارد کنید"
                    />
                    <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز عبور
                  </label>
                  <div className="relative group">
                    <input
                      type="password"
                      required
                      className="block w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                      placeholder="رمز عبور خود را وارد کنید"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>
              </div>
            )}

            {/* Phone Tab */}
            {activeTab === "phone" && (
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره موبایل
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      required
                      className="block w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                      placeholder="09123456789"
                      pattern="^09[0-9]{9}$"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      dir="ltr"
                    />
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>

                {showVerification && (
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      کد تایید
                    </label>
                    <input
                      type="text"
                      required
                      className="block w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="کد تایید را وارد کنید"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Email Tab */}
            {activeTab === "email" && (
              <div className="space-y-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    پست الکترونیک
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      className="block w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pl-12"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      dir="ltr"
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>

                {showVerification && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      کد تایید
                    </label>
                    <div className="flex gap-2 justify-between" dir="ltr">
                      {verificationInputs.map((digit, index) => (
                        <input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          className="w-12 h-12 text-center text-xl border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={digit}
                          onChange={(e) =>
                            handleCodeChange(index, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !digit && index > 0) {
                              const prevInput = document.getElementById(
                                `code-${index - 1}`
                              );
                              if (prevInput) {
                                prevInput.focus();
                                prevInput.select();
                              }
                            }
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendTimer > 0}
                        className={`text-sm ${
                          resendTimer > 0
                            ? "text-gray-400"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        {resendTimer > 0
                          ? `ارسال مجدد کد تا ${resendTimer} ثانیه دیگر`
                          : "ارسال مجدد کد تایید"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {message && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm text-center">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 via-[#ffdb00] to-yellow-500 text-gray-900 rounded-xl font-medium
    hover:from-yellow-500 hover:via-[#ffdb00] hover:to-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 
    transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {activeTab === "password"
                ? "ورود به سایت"
                : showVerification
                ? "تایید و ورود"
                : "دریافت کد تایید"}
            </button>

            {activeTab === "password" && (
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="mr-2 block text-sm text-gray-700"
                  >
                    مرا به خاطر بسپار
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    فراموشی رمز عبور
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
