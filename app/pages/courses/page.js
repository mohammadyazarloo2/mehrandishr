"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          دوره‌های آموزشی
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link href={`/pages/courses/${course._id}`} key={course._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow relative"
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    course.enrollmentType === "online"
                      ? "bg-green-500"
                      : course.enrollmentType === "offline"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                />

                <div className="relative h-48">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600 font-bold">
                      {course.price.toLocaleString("fa-IR")} تومان
                    </span>
                    <span className="text-gray-500">
                      {course.duration} ساعت
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
