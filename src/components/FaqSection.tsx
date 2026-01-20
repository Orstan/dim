"use client";

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqItems: FaqItem[] = [
    {
      question: 'Як відбувається процес заселення до пансіонату?',
      answer: 'Процес заселення починається з консультації та знайомства з пансіонатом. Ми запрошуємо вас на екскурсію, щоб ви могли оцінити умови проживання та поспілкуватися з персоналом. Після цього проводимо індивідуальну оцінку для подальшого догляду. Далі оформлюються необхідні документи, обирається пакет послуг та кімната. Ми допомагаємо з переїздом та адаптацією до нового місця проживання.'
    },
    {
      question: 'Чи можна відвідувати родичів у пансіонаті?',
      answer: 'Так, ми заохочуємо регулярні відвідування родичів. Години відвідування: з 10:00 до 19:00 щодня. Також можливе проживання родичів у гостьових кімнатах за попереднім бронюванням (додаткова плата). Ми розуміємо важливість підтримки сімейних звязків для благополуччя наших мешканців.'
    },
    {
      question: 'Як організоване харчування в пансіонаті?',
      answer: 'Харчування в нашому пансіонаті організоване з урахуванням вікових особливостей та індивідуальних потреб мешканців. Ми пропонуємо 4-разове харчування: сніданок, другий сніданок, обід та вечеря. Меню складається дієтологом та включає різноманітні страви з якісних продуктів. Для мешканців з особливими дієтичними потребами розробляється індивідуальне меню.'
    },
    {
      question: 'Які речі можна привезти з собою при заселенні?',
      answer: 'При заселенні ви можете привезти особисті речі: одяг, взуття, засоби гігієни, улюблені книги, фотографії, невеликі предмети декору. Також можна привезти деякі меблі (крісло, тумбочку, настільну лампу) для створення більш домашньої атмосфери. Перед заселенням ми надаємо детальний список рекомендованих речей та обговорюємо індивідуальні побажання.'
    },
    {
      question: 'Чи є знижки для довготривалого проживання?',
      answer: 'Так, ми пропонуємо знижки при оплаті за 3, 6 та 12 місяців наперед. Розмір знижки залежить від обраного пакету послуг та терміну проживання. При оплаті за 3 місяці знижка становить 5%, за 6 місяців - 7%, за 12 місяців - 10%. Детальну інформацію можна отримати у наших менеджерів.'
    },
    {
      question: 'Як організоване дозвілля мешканців?',
      answer: 'Ми пропонуємо різноманітні активності для наших мешканців: групові заняття фізичними вправами, творчі майстер-класи, музичні та літературні вечори, настільні ігри, перегляд фільмів, екскурсії та прогулянки на свіжому повітрі. Також ми організовуємо святкування днів народження та державних свят. Програма активностей складається з урахуванням інтересів та можливостей наших мешканців.'
    }
  ];

  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Часті запитання</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Відповіді на найпоширеніші запитання про проживання в пансіонаті &quot;Сонячна Долина&quot;
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden ${
                  openIndex === index ? 'border-amber-500' : 'border-gray-200'
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-medium text-amber-900">{item.question}</span>
                  <svg 
                    className={`w-5 h-5 text-amber-700 transform ${openIndex === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="p-5 bg-amber-50 border-t border-amber-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-6">
              Не знайшли відповідь на своє запитання? Зв&apos;яжіться з нами, і ми з радістю надамо вам додаткову інформацію.
            </p>
            <a 
              href="/contacts" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Зв&apos;язатися з нами
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
