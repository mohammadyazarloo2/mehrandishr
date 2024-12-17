"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('/api/authors');
      const data = await response.json();
      setAuthors(data);
      setLoading(false);
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-8 animate-pulse">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-12 text-center">نویسندگان</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <Link 
            key={author._id}
            href={`/pages/authors/${author.name}`}
            className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
          >
            <img 
              src={author.avatar} 
              alt={author.name}
              className="w-24 h-24 rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            />
            <h2 className="text-xl font-bold text-center mb-4">{author.name}</h2>
            <p className="text-gray-600 text-center line-clamp-2">{author.bio}</p>
            <div className="mt-6 flex justify-center gap-4">
              {author.expertise.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
