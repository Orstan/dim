"use client";

import { useState, FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Функція для обробки відправки форми: відкриваємо WhatsApp з підготовленим текстом
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof window === 'undefined') {
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('from_name') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const topic = (formData.get('topic') as string) || '';
    const message = (formData.get('message') as string) || '';

    const topicText = topic
      ? `Тема: ${topic}\n`
      : '';

    const text =
      `Привіт! Я з сайту Сонячна Долина.%0A` +
      `Ім'я: ${name}%0A` +
      `Телефон: ${phone}%0A` +
      topicText.replace('\n', '%0A') +
      `Повідомлення: ${message}`;

    const whatsappUrl = `https://wa.me/380971133480?text=${text}`;

    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setFormSubmitted(true);
    form.reset();
  };
  
  const callPhone = (phoneNumber: string) => {
    // Використовуємо протокол tel: для відкриття програми для дзвінків
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">Контакти</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-amber-800 mb-8">
                Зв&apos;яжіться з нами для отримання додаткової інформації або запису на екскурсію
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">Наші контакти</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-amber-900">Адреса</h3>
                        <p className="text-gray-700">м.Одеса, с.Лески, вул.Шевченка, 4Б</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-amber-900">Телефон</h3>
                        <p className="text-gray-700">
                          <span 
                            className="cursor-pointer hover:text-amber-700 transition-colors" 
                            onClick={() => callPhone('+380974757157')}
                            title="Натисніть, щоб зателефонувати"
                          >+380974757157</span>
                        </p>
                        <p className="text-gray-700 mt-1">
                          <a 
                            href="https://wa.me/380971133480?text=Привіт!%20Я%20з%20сайту%20Сонячна%20Долина.%20Мені%20потрібна%20інформація%20про..."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-amber-700"
                          >Написати в WhatsApp</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-amber-900">Зворотний зв&apos;язок</h3>
                        <p className="text-gray-700">
                          Використовуйте форму на цій сторінці
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-amber-900">Графік роботи</h3>
                        <p className="text-gray-700">Пн-Пт: 9:00 - 18:00</p>
                        <p className="text-gray-700">Сб-Нд: 10:00 - 16:00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="font-semibold text-lg text-amber-900 mb-4">Як до нас дістатися</h3>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-2">
                        <strong>Громадським транспортом:</strong> Автобуси №123, №456 до зупинки &quot;Затишна&quot;
                      </p>
                      <p className="text-gray-700">
                        <strong>Автомобілем:</strong> Зручний заїзд з вул. Головної, є безкоштовна парковка
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">Напишіть нам</h2>
                  
                  {formSubmitted ? (
                    <div className="p-4 bg-green-100 text-green-700 rounded-md">
                      <p className="font-medium">Дякуємо за ваше повідомлення!</p>
                      <p>Ми зв&apos;яжемося з вами найближчим часом.</p>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Приховані поля для EmailJS */}
                      <input type="hidden" name="subject" value="Нове повідомлення з сайту Сонячна Долина" />
                      <input type="hidden" name="site_name" value="Сонячна Долина" />
                      <input type="hidden" name="date" value={new Date().toLocaleDateString('uk-UA')} />
                      <input type="hidden" id="from_email" name="from_email" value="" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="from_name" className="block text-gray-700 mb-1">Ім&apos;я *</label>
                          <input 
                            type="text" 
                            id="from_name"
                            name="from_name"
                            className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Ваше ім&apos;я"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-1">Телефон *</label>
                          <input 
                            type="tel" 
                            id="phone"
                            name="phone"
                            className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="+380 97 47 57 157"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="topic" className="block text-gray-700 mb-1">Тема</label>
                        <select 
                          id="topic"
                          name="topic"
                          className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="">Оберіть тему</option>
                          <option value="info">Загальна інформація</option>
                          <option value="tour">Запис на екскурсію</option>
                          <option value="price">Вартість послуг</option>
                          <option value="vacancy">Вакансії</option>
                          <option value="other">Інше</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-gray-700 mb-1">Повідомлення *</label>
                        <textarea 
                          id="message"
                          name="message"
                          rows={5}
                          className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Ваше повідомлення"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="privacy" 
                          className="mt-1 mr-2"
                          required
                        />
                        <label htmlFor="privacy" className="text-gray-700 text-sm">
                          Я погоджуюся з <a href="/privacy" className="text-amber-700 hover:underline">політикою конфіденційності</a> та даю згоду на обробку моїх персональних даних
                        </label>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:bg-amber-400 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Надсилання...' : 'Надіслати'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Карта проїзду</h2>
              <p className="text-gray-700 mb-8">
                Пансіонат &quot;Сонячна Долина&quot; розташований у мальовничому та тихому селі Лески поблизу Одеси
              </p>
              
              <div className="h-96 rounded-lg overflow-hidden border-2 border-amber-300 bg-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2756.8!2d30.815330704893505!3d46.562977253371635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDMzJzQ2LjciTiAzMMKwNDgnNTUuMiJF!5e0!3m2!1suk!2sua!4v1234567890123!5m2!1suk!2sua"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта розташування пансіонату Сонячна Долина"
                />
              </div>
            </div>
          </div>
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}
