"use client";
import { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment-jalaali";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiMapPinLine } from "react-icons/ri";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const getWeatherIcon = (code) => {
    if (!code) return <WiDaySunny className="text-4xl text-yellow-500" />;
    if (code >= 200 && code < 300)
      return <WiThunderstorm className="text-4xl text-yellow-400" />;
    if (code >= 300 && code < 600)
      return <WiRain className="text-4xl text-blue-400" />;
    if (code >= 600 && code < 700)
      return <WiSnow className="text-4xl text-blue-200" />;
    if (code >= 700 && code < 800)
      return <WiCloudy className="text-4xl text-gray-400" />;
    return <WiDaySunny className="text-4xl text-yellow-500" />;
  };

  useEffect(() => {
    const fetchWeather = async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        // اول مختصات را به نام شهر فارسی تبدیل میکنیم
        const locationResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fa`
        );
        const locationData = await locationResponse.json();

        const API_KEY = "f6236fa149b1b70b02599662d457c536";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fa`
        );
        const data = await response.json();
        if (data) {
          setWeather({
            ...data,
            name: locationData.city || locationData.locality || "نامشخص",
          });
        }
      } catch (error) {
        console.log("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeather);
    }
  }, []);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = moment();
      setCurrentTime(now.format("HH:mm:ss"));
      setCurrentDate(now.format("jYYYY/jMM/jDD"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card"
      >
        <div className="weather-content">
          <div className="loading-spinner">درحال دریافت اطلاعات...</div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="weather-container"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        initial={{ height: 60 }}
        animate={{ height: isExpanded ? "auto" : 60 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="weather-luxury"
      >
        <div className="glass-card">
          <motion.div
            className="weather-preview"
            animate={{ opacity: isExpanded ? 0 : 1 }}
          >
            <div className="flex items-center gap-2">
              {weather?.weather && getWeatherIcon(weather.weather[0]?.id)}
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  {Math.round(weather?.main?.temp || 0)}°C
                </span>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <RiMapPinLine />
                  <span>{weather?.name}</span>
                </div>
              </div>
            </div>
            <IoMdArrowDropdown
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            className="weather-expanded"
          >
            <div className="datetime-display">
              <motion.div className="time">{currentTime}</motion.div>
              <div className="date">{currentDate}</div>
            </div>
            <div className="weather-content">
              {/* ... existing weather content ... */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
