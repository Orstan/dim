"use client";
import { useState, useEffect } from 'react';

export default function CallbackPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });
  const [closed, setClosed] = useState(false);

  // Функція для генерації унікального ID сесії
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Показуємо попап при кожному відкритті сторінки
  useEffect(() => {
    // Перевіряємо, чи це нова сесія
    const currentSessionId = localStorage.getItem('currentSessionId');
    const browserSessionId = sessionStorage.getItem('browserSessionId');
    
    // Якщо немає ID сесії в sessionStorage або він відрізняється від збереженого в localStorage,
    // це означає, що користувач закрив вкладку/браузер і відкрив знову
    if (!browserSessionId || currentSessionId !== browserSessionId) {
      // Генеруємо новий ID сесії
      const newSessionId = generateSessionId();
      localStorage.setItem('currentSessionId', newSessionId);
      sessionStorage.setItem('browserSessionId', newSessionId);
      
      // Показуємо попап через 5 секунд
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // 5 секунд
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Перевіряємо, чи ми на клієнті
    if (typeof window === 'undefined') {
      return;
    }

    setStatus({ submitting: true, submitted: false, error: false, message: '' });

    const text =
      `Привіт! Я з сайту Сонячна Долина. Прошу передзвонити.%0A` +
      `Телефон для зв'язку: ${phone}`;

    const whatsappUrl = `https://wa.me/380971133480?text=${text}`;

    window.open(whatsappUrl, '_blank');

    setStatus({
      submitting: false,
      submitted: true,
      error: false,
      message: 'Відкрито чат у WhatsApp. Завершіть відправку повідомлення у додатку.'
    });
    setPhone('');
  };

  const handleClose = () => {
    setClosed(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Час анімації закриття
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed z-50 transition-opacity duration-300 ${closed ? 'opacity-0' : 'opacity-100'} 
      md:bottom-10 md:left-10 bottom-0 left-0 right-0 md:right-auto md:w-80 md:max-w-sm`}>
      
      <div className={`bg-white rounded-lg shadow-xl w-full transition-transform duration-300 border-t-4 border-amber-600
        ${closed ? 'translate-y-full md:translate-y-0 md:translate-x-[-100%]' : 'translate-y-0 md:translate-x-0'}`}>
        <div className="bg-amber-600 text-white py-2 px-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span className="font-medium">Зворотній дзвінок</span>
          </div>
          <button 
            onClick={handleClose}
            className="text-white hover:text-amber-200"
            aria-label="Закрити"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-amber-900">Бажаєте забронювати?</h3>
            <p className="text-gray-600 text-sm mt-1">Залиште свій номер телефону</p>
          </div>
          
          {status.submitted ? (
            <div className={`p-4 rounded-md ${status.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} text-center`}>
              <p className="font-medium">{status.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <input 
                    type="tel" 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+380 97 47 57 157"
                    required
                  />
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-amber-400 disabled:cursor-not-allowed whitespace-nowrap"
                    disabled={status.submitting}
                  >
                    {status.submitting ? 'Надсилання...' : 'Передзвоніть'}
                  </button>
                </div>
              </div>
              <div className="text-center text-sm">
                <a
                  href="https://wa.me/380971133480?text=Привіт!%20Я%20з%20сайту%20Сонячна%20Долина.%20Бажаю%20уточнити%20деталі%20бронювання."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 underline"
                >
                  Або напишіть нам у WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
