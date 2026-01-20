import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-2 md:py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        {/* На мобільних пристроях зображення буде вгорі, а на десктопі - зліва */}
        <div className="block md:hidden mb-4">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Про наш пансіонат</h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl relative">
              <Image 
                src="/pensionat.jpg" 
                alt="Пансіонат Сонячна Долина" 
                fill 
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            {/* Заголовок відображається тільки на десктопі */}
            <div className="hidden md:block">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Про наш пансіонат</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              &quot;Сонячна Долина&quot; — це місце, де старші люди знаходять спокій, турботу й повагу.
            </p>
            
            <p className="text-gray-700 mb-4">
              Ми створили пансіонат, щоб кожен відчував себе як вдома — серед доброзичливої атмосфери, підтримки й щоденної уваги.
            </p>
            
            <p className="text-gray-700 mb-6">
              Це не просто заклад — це дім із серцем.
            </p>
            
            <Link 
              href="/about" 
              className="inline-block bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Дізнатися більше
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
