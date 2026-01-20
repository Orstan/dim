"use client";

import React from 'react';

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function PricingSection() {
  const pricingPlans: PricingPlan[] = [
    {
      name: 'Базовий',
      price: '15 000 грн/міс',
      description: 'Основний пакет послуг для комфортного проживання',
      features: [
        'Проживання в двомісній кімнаті',
        'Триразове харчування',
        'Участь у групових активностях',
        'Прибирання кімнати',
        'Зміна постільної білизни 1 раз на тиждень'
      ]
    },
    {
      name: 'Стандарт',
      price: '20 000 грн/міс',
      description: 'Розширений пакет послуг для комфортного проживання',
      features: [
        'Проживання в одномісній кімнаті',
        'Триразове харчування',
        'Індивідуальні та групові активності',
        'Щоденне прибирання кімнати',
        'Зміна постільної білизни 2 рази на тиждень',
        'Послуги прання та прасування'
      ],
      popular: true
    },
    {
      name: 'Преміум',
      price: '30 000 грн/міс',
      description: 'Повний пакет послуг для максимального комфорту',
      features: [
        'Проживання в покращеній одномісній кімнаті',
        "Чотириразове харчування з індивідуальним меню",
        'Індивідуальні та групові активності',
        'Щоденне прибирання кімнати',
        'Зміна постільної білизни за запитом',
        'Послуги прання та прасування',
        'Індивідуальний супровід на прогулянках',
        'Масаж та фізіотерапія'
      ]
    }
  ];

  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Вартість послуг</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Ми пропонуємо різні пакети послуг для задоволення потреб кожного мешканця. 
            Вартість може бути скоригована залежно від індивідуальних потреб.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg shadow-lg overflow-hidden ${
                plan.popular 
                  ? 'border-2 border-amber-500 transform md:-translate-y-4' 
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-amber-500 text-white text-center py-2 font-medium">
                  Найпопулярніший вибір
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-amber-700 mb-4">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="/contacts" 
                  className={`block text-center py-3 px-6 rounded-md transition-colors ${
                    plan.popular 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                  }`}
                >
                  Обрати пакет
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Потрібна додаткова інформація про вартість послуг?
          </p>
          <a 
            href="/contacts" 
            className="inline-block bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium py-2 px-6 rounded-md border border-amber-200 transition-colors"
          >
            Зв&apos;язатися з нами
          </a>
        </div>
      </div>
    </section>
  );
}
