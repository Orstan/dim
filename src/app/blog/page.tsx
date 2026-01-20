import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Блог | Пансіонат 'Сонячна Долина' | Одеса, с. Лески",
  description: "Корисні статті та новини від пансіонату 'Сонячна Долина'. Поради щодо догляду за літніми людьми, новини нашого закладу та інша корисна інформація.",
  keywords: "блог пансіонату, догляд за літніми людьми, поради, новини пансіонату, Одеса, с.Лески",
};

// Дані для блог-статей
const blogPosts = [
  {
    id: 1,
    title: "Здорове харчування для літніх людей: особливості та рекомендації",
    excerpt: "Поради щодо організації здорового харчування для людей похилого віку. Особливості дієти, корисні продукти та режим харчування.",
    date: "10 січня 2026",
    slug: "zdorove-harchuvannya",
    image: "/images/blog/pitanie.jpg",
    category: "Харчування"
  },
  {
    id: 2,
    title: "5 порад для підтримки здоров'я літніх людей у 2026 році",
    excerpt: "Нові методики та рекомендації щодо догляду за здоров'ям людей похилого віку з урахуванням сучасних медичних досліджень.",
    date: "15 січня 2026",
    slug: "5-porad-dlya-zdorovya-2026",
    image: "/images/blog/pidtrimka.png",
    category: "Здоров'я"
  },
  {
    id: 3,
    title: "Як технології допомагають у догляді за літніми людьми",
    excerpt: "Огляд сучасних технологічних рішень, які ми впровадили в пансіонаті 'Сонячна Долина' для покращення якості життя наших мешканців.",
    date: "5 січня 2026",
    slug: "tehnologii-v-doglyadi-2026",
    image: "/images/blog/tehnologii.png",
    category: "Технології"
  },
  {
    id: 4,
    title: "Святкування Нового Року в пансіонаті 'Сонячна Долина'",
    excerpt: "Як ми відзначили новорічні свята в нашому пансіонаті. Фотозвіт та враження наших мешканців.",
    date: "2 січня 2026",
    slug: "noviy-rik-2026",
    image: "/images/blog/novy-rik.jpg",
    category: "Події"
  },
  {
    id: 5,
    title: "«Я тягар»: як змінити це відчуття у літніх людей",
    excerpt: "Поради психологів щодо подолання відчуття «тягаря» у літніх людей та рекомендації для родичів, як допомогти своїм близьким.",
    date: "18 січня 2026",
    slug: "ya-tyagar",
    image: "/images/blog/tahar.png",
    category: "Психологія"
  },
  {
    id: 6,
    title: "Психологічна підтримка літніх людей: важливі аспекти",
    excerpt: "Поради від наших психологів щодо спілкування з літніми родичами та підтримки їхнього емоційного здоров'я.",
    date: "20 грудня 2025",
    slug: "psyhologichna-pidtrymka",
    image: "/images/blog/pidtrymka.jpg",
    category: "Психологія"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-amber-100">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Блог пансіонату "Сонячна Долина"</h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Корисні статті, поради та новини про догляд за літніми людьми від фахівців нашого пансіонату
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 border border-amber-200">
              <div className="relative h-48 w-full">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{post.date}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-2 text-gray-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center text-amber-700 hover:text-amber-900 font-medium"
                >
                  Читати далі
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
