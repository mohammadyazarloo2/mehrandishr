"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* تصویر شاخص */}
          <div className="relative h-96">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">
            {/* اطلاعات اصلی */}
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            {/* مشخصات کلی */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">مدت دوره</h3>
                <p>{course.duration}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">سطح دوره</h3>
                <p>{course.level}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">نوع دوره</h3>
                <p>{course.type}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">قیمت دوره</h3>
                <p>{course.price.toLocaleString("fa-IR")} تومان</p>
              </div>
            </div>

            {/* سرفصل‌ها */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">سرفصل‌ها</h2>
              <div className="space-y-4">
                {course.topics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{topic.title}</h3>
                      <span className="text-gray-500">{topic.duration}</span>
                    </div>
                    <p className="text-gray-600">{topic.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ویژگی‌های دوره */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">ویژگی‌های دوره</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* اطلاعات مدرس */}
            {course.instructor && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">مدرس دوره</h2>
                <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-xl">
                  <div className="relative w-24 h-24">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {course.instructor.name}
                    </h3>
                    <p className="text-gray-600">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* اطلاعات تکمیلی */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">نوع ثبت‌نام</h3>
                <p>{course.enrollmentType}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">تعداد بازدید</h3>
                <p>{course.views.toLocaleString("fa-IR")} بازدید</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
