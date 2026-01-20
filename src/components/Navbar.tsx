"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <header className="bg-gradient-to-r from-amber-400 to-amber-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Мобільний вигляд з логотипом зліва та кнопкою меню справа */}
        <div className="flex justify-between items-center md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image 
                src="/logo.png" 
                alt="Логотип Сонячна Долина" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-amber-800 font-bold text-xl">Сонячна Долина</span>
          </Link>
          
          <button 
            className="text-amber-900 focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Відкрити меню"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Десктопний вигляд */}
        <div className="hidden md:flex flex-row items-center">
          <div className="flex-shrink-0 w-1/4 flex justify-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Логотип Сонячна Долина" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-amber-800 font-bold text-xl">Сонячна Долина</span>
            </Link>
          </div>
          
          {/* Навігація по центру */}
          <nav className="flex justify-center w-2/4">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  Послуги
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  Галерея
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-amber-900 hover:text-amber-600 transition-colors text-lg font-medium">
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Пустий блок справа для балансу */}
          <div className="w-1/4"></div>
        </div>
      </div>
      
      {/* Мобільне меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-amber-400 to-amber-200 border-t border-amber-300 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Головна
            </Link>
            <Link 
              href="/about" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Про нас
            </Link>
            <Link 
              href="/services" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Послуги
            </Link>
            <Link 
              href="/blog" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Блог
            </Link>
            <Link 
              href="/gallery" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Галерея
            </Link>
            <Link 
              href="/faq" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/contacts" 
              className="text-amber-900 hover:text-amber-600 transition-colors py-2 px-4 rounded-md hover:bg-amber-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакти
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
