"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from "../../redux/settingsSlice";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar, FiUser, FiImage } from "react-icons/fi";

export default function AboutPage() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {settings?.about?.hero?.title || "درباره مهراندیش"}
          </h1>
          <p className="text-gray-600 text-lg">
            {settings?.about?.hero?.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] group">
              <Image
                src={settings?.about?.logo?.light}
                alt="چشم انداز مهراندیش"
                fill
                className="object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {settings?.about?.vision?.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {settings?.about?.vision?.content}
              </p>
              <ul className="space-y-4">
                {settings?.about?.features.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700 bg-yellow-50 p-3 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            تیم ما
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {settings?.about?.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full ring-4 ring-yellow-100"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center"> {member.role} </p>
                <div className="flex justify-center gap-4 mt-4">
                  {/* Social Media Icons */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="py-16 bg-gradient-to-b from-white to-yellow-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            {settings?.testimonials?.title}
          </h2>
          <p>{settings?.testimonials?.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {settings?.testimonials?.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full ring-4 ring-yellow-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className="text-yellow-400 fill-current w-5 h-5"
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {testimonial.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Workspace Gallery */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            گالری تصاویر محیط کار
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings?.about?.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="group h-[200px] relative overflow-hidden rounded-2xl aspect-video cursor-pointer shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-medium text-lg">
                      {image.alt}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-16 bg-gradient-to-b from-yellow-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {settings?.about?.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.count}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-[200px] w-full max-w-4xl aspect-video">
            <Image
              src={selectedImage.url}
              alt={selectedImage.title}
              fill
              className="object-contain"
            />
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-medium text-center">
              {selectedImage.title}
            </h3>
          </div>
        </motion.div>
      )}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            تجربه دانشجویان مهراندیش
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            داستان موفقیت دانشجویان ما را از زبان خودشان بشنوید
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {settings?.videoTestimonials.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + video.id * 0.1 }}
                className="group relative"
              >
                <div className="relative h-[200px] aspect-video rounded-2xl overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300"
                    >
                      <svg
                        className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 rounded-full text-white text-sm">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {video.name}
                  </h3>
                  <p className="text-gray-400">{video.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
