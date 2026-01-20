"use client";
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// Ініціалізуємо EmailJS тільки на клієнті
if (typeof window !== 'undefined') {
  // Ініціалізуємо EmailJS з публічним ключем
  emailjs.init('886XgBgir1aeXVhA_');
}

export default function ContactSection() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });

  // Функція для копіювання тексту в буфер обміну
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Скопійовано в буфер обміну!');
      })
      .catch(err => {
        console.error('Помилка при копіюванні: ', err);
      });
  };
  
  // Відправка форми за допомогою EmailJS
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Перевіряємо, чи ми на клієнті
    if (typeof window === 'undefined') {
      console.error('Форма не може бути відправлена на сервері');
      return;
    }
    
    if (form.current) {
      const currentForm = form.current;
      const formData = new FormData(currentForm);

      const name = (formData.get('from_name') as string) || '';
      const message = (formData.get('message') as string) || '';

      setStatus({ submitting: true, submitted: false, error: false, message: '' });

      const text =
        `Привіт! Я з сайту Сонячна Долина.%0A` +
        `Ім'я: ${name}%0A` +
        `Повідомлення: ${message}`;

      const whatsappUrl = `https://wa.me/380971133480?text=${text}`;

      window.open(whatsappUrl, '_blank');

      setStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: 'Відкрито чат у WhatsApp. Завершіть відправку повідомлення у додатку.'
      });
      currentForm.reset();
    }
  };
  
  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-amber-700 text-white p-8">
              <h2 className="text-3xl font-bold mb-6">Зв&apos;яжіться з нами</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg">Адреса</h3>
                    <p>м.Одеса, с.Лески, вул.Шевченка, 4Б</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg">Телефон</h3>
                    <p>
                      <span 
                        className="cursor-pointer hover:text-amber-200 transition-colors" 
                        onClick={() => copyToClipboard('+380 97 47 57 157')}
                        title="Натисніть, щоб скопіювати"
                      >+380 97 47 57 157</span>
                    </p>
                    <p>
                      <a 
                        href="https://wa.me/380971133480?text=Привіт!%20Я%20з%20сайту%20Сонячна%20Долина.%20Мені%20потрібна%20інформація%20про..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer hover:text-amber-200 transition-colors"
                      >Написати в WhatsApp</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p>
                      <span 
                        className="cursor-pointer hover:text-amber-200 transition-colors" 
                        onClick={() => copyToClipboard('dolyna@soniachna.com')}
                        title="Натисніть, щоб скопіювати"
                      >dolyna@soniachna.com</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg">Графік роботи</h3>
                    <p>Пн-Пт: 9:00 - 18:00</p>
                    <p>Сб-Нд: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Напишіть нам</h3>
              
              {status.submitted ? (
                <div className={`p-4 rounded-md ${status.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  <p className="font-medium">{status.message}</p>
                  {!status.error && <p>Ми зв&apos;яжемося з вами найближчим часом.</p>}
                </div>
              ) : (
                <form 
                  ref={form}
                  onSubmit={sendEmail} 
                  className="space-y-4"
                >
                  {/* Приховані поля для додаткових даних */}
                  <input type="hidden" name="subject" value="Нове повідомлення з сайту Сонячна Долина" />
                  <input type="hidden" name="site_name" value="Сонячна Долина" />
                  <input type="hidden" name="date" value={new Date().toLocaleDateString('uk-UA')} />
                  
                  <div>
                    <label htmlFor="from_name" className="block text-gray-700 mb-1">Ім&apos;я</label>
                    <input 
                      type="text" 
                      id="from_name"
                      name="from_name"
                      className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ваше ім&apos;я"
                      required
                    />
                  </div>
                  
                  {/* Приховане технічне поле Email для шаблону EmailJS */}
                  <input type="hidden" id="from_email" name="from_email" value="" />
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-1">Повідомлення</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Ваше повідомлення"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:bg-amber-400 disabled:cursor-not-allowed"
                    disabled={status.submitting}
                  >
                    {status.submitting ? 'Надсилання...' : 'Надіслати'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
