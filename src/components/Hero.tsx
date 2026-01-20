"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-amber-50 overflow-hidden h-[500px] md:h-[600px]">
      {/* Використовуємо звичайний div з фоновим зображенням замість Next.js Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src="/pensionatf.jpg" 
            alt="Пансіонат Сонячна Долина" 
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      
      {/* Накладаємо прозорий шар */}
      <div className="absolute inset-0 z-1 bg-amber-100 opacity-50"></div>
      
      {/* Контент */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 mb-6">
            Пансіонат &quot;Сонячна Долина&quot;
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-8">
            Місце, де про вас подбають з турботою та повагою.
            Комфортні умови проживання та професійний догляд.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contacts" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
            >
              Зв&apos;язатися з нами
            </Link>
            <Link 
              href="/services" 
              className="bg-white hover:bg-amber-100 text-amber-800 font-medium py-3 px-6 rounded-lg border border-amber-300 transition-colors text-center"
            >
              Наші послуги
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
