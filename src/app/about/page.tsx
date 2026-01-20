import type { Metadata } from "next";
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TeamSection from '../../components/TeamSection';

export const metadata: Metadata = {
  title: "Про пансіонат 'Сонячна Долина' | Безпечний догляд за літніми людьми біля Одеси",
  description:
    "Історія, місія та цінності пансіонату 'Сонячна Долина'. Безпечний приватний будинок для людей похилого віку з професійним доглядом, сімейною атмосферою та турботою про кожного мешканця. Частный дом престарелых с профессиональным уходом и заботой.",
  keywords: [
    // UA
    "про пансіонат Сонячна Долина",
    "безпечний будинок для людей похилого віку",
    "досвідчений персонал догляду за літніми",
    "сімейна атмосфера для літніх людей",
    // RU
    "пансионат Сонячная Долина Одесса",
    "безопасный дом престарелых",
    "опытный персонал ухода за пожилыми",
    "семейная атмосфера для пожилых",
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">Про пансіонат &quot;Сонячна Долина&quot;</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-amber-800 mb-8">
                Місце, де про вас подбають з турботою та повагою
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-12 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Наша історія</h2>
              <p className="text-gray-700 mb-6">
                Пансіонат &quot;Сонячна Долина&quot; був заснований у 2025 році з ініціативи людей, 
                які прагнули створити місце, де люди похилого віку могли б отримувати якісний 
                догляд у комфортних умовах, зберігаючи при цьому свою гідність та незалежність.
              </p>
              <p className="text-gray-700 mb-6">
                За роки роботи ми розвинули нашу інфраструктуру, розширили спектр послуг та сформували 
                команду висококваліфікованих фахівців, які щодня працюють над тим, щоб забезпечити 
                найкращий догляд для наших мешканців.
              </p>
              <p className="text-gray-700 mb-6">
                Сьогодні &quot;Сонячна Долина&quot; - це сучасний заклад, який поєднує професійний догляд, 
                комфортні умови проживання та домашню атмосферу, де кожен мешканець відчуває себе 
                важливим та оточеним турботою.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Наша місія</h2>
              <p className="text-gray-700 mb-6">
                Місія пансіонату &quot;Сонячна Долина&quot; - створити середовище, де люди похилого віку можуть 
                жити повноцінним життям, отримуючи необхідний догляд та підтримку, зберігаючи при 
                цьому свою гідність, незалежність та радість життя.
              </p>
              <p className="text-gray-700 mb-6">
                Ми прагнемо забезпечити індивідуальний підхід до кожного мешканця, враховуючи його 
                потреби, вподобання та стан здоров&apos;я, створюючи умови для активного та змістовного життя.
              </p>
            </div>
          </div>
        </section>
        
        <TeamSection />
        
        <section className="py-12 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Наші цінності</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src="/images/services/povaha.jpg"
                      alt="Повага та гідність"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">Повага та гідність</h3>
                    <p className="text-gray-700">
                      Ми ставимося до кожного мешканця з повагою та турботою, зберігаючи його гідність 
                      та право на особисте життя.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src="/images/services/profesializm.jpg"
                      alt="Професіоналізм"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">Професіоналізм</h3>
                    <p className="text-gray-700">
                      Наша команда складається з висококваліфікованих фахівців, які постійно 
                      вдосконалюють свої знання та навички.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src="/images/services/individualni.jpg"
                      alt="Індивідуальний підхід"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">Індивідуальний підхід</h3>
                    <p className="text-gray-700">
                      Ми розуміємо, що кожна людина унікальна, тому розробляємо індивідуальні програми 
                      догляду та підтримки для кожного мешканця.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 relative">
                    <Image
                      src="/images/services/bezpeka.jpg"
                      alt="Безпека та комфорт"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-800 mb-4">Безпека та комфорт</h3>
                    <p className="text-gray-700">
                      Ми створюємо безпечне та комфортне середовище, де наші мешканці можуть 
                      почуватися як вдома.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
