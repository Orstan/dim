import type { Metadata } from "next";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FaqSection from '../../components/FaqSection';

export const metadata: Metadata = {
  title: "Часті запитання про пансіонат для літніх людей | Вартість, умови, оформлення",
  description:
    "Відповіді на часті запитання про пансіонат 'Сонячна Долина': вартість проживання, умови догляду, документи для заселення, медичний нагляд та безпека. Частые вопросы о пансионате для пожилых людей под Одессой.",
  keywords: [
    // UA
    "скільки коштує пансіонат для літніх людей Одеса",
    "як обрати пансіонат для батьків",
    "які документи потрібні для поселення в пансіонат",
    "що входить у вартість догляду за літніми",
    // RU
    "цена пансионата для пожилых людей Одесса",
    "как выбрать пансионат для родителей",
    "какие документы нужны для оформления в пансионат",
    "что входит в стоимость ухода за пожилыми",
  ],
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">Часті запитання</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-amber-800 mb-8">
                Відповіді на найпоширеніші запитання про проживання в пансіонаті &quot;Сонячна Долина&quot;
              </p>
            </div>
          </div>
        </div>
        
        <FaqSection />
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Залишились запитання?</h2>
              <p className="text-gray-700 mb-8">
                Якщо ви не знайшли відповідь на своє запитання, будь ласка, зв&apos;яжіться з нами. 
                Наші менеджери з радістю нададуть вам всю необхідну інформацію та допоможуть 
                вирішити будь-які питання.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contacts" 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Зв&apos;язатися з нами
                </a>
                <a 
                  href="/about" 
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Дізнатися більше про нас
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
