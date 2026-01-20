"use client";

import { useState, useRef, useEffect } from 'react';

// Типи для повідомлень
type MessageType = 'user' | 'bot';

interface Message {
  type: MessageType;
  text: string;
  timestamp: Date;
}

// База відповідей бота
const botResponses: Record<string, string[]> = {
  'привіт': [
    'Вітаю! Я віртуальний помічник пансіонату &quot;Сонячна Долина&quot;. Чим можу допомогти?',
    'Доброго дня! Радий вітати вас у пансіонаті &quot;Сонячна Долина&quot;. Як я можу вам допомогти?'
  ],
  'ціни': [
    'Ціни на проживання у пансіонаті &quot;Сонячна Долина&quot; починаються від 800 грн за добу. Детальніше можете дізнатися у розділі &quot;Ціни&quot; або зателефонувавши нам.',
    'У нас є різні варіанти проживання з цінами від 800 до 2000 грн за добу, залежно від типу номера та сезону. Детальну інформацію ви знайдете у розділі &quot;Ціни&quot;.'
  ],
  'номери': [
    'У нашому пансіонаті є стандартні номери, люкси та сімейні апартаменти. Всі номери обладнані зручними меблями, санвузлом та необхідною технікою.',
    'Ми пропонуємо різні типи номерів: стандартні, покращені, люкси та сімейні апартаменти. Кожен номер має все необхідне для комфортного відпочинку.'
  ],
  'харчування': [
    'У вартість проживання входить сніданок. Також ви можете замовити комплексні обіди та вечері в нашому ресторані.',
    'Ми пропонуємо сніданки, які входять у вартість проживання, а також комплексні обіди та вечері за додаткову плату.'
  ],
  'розташування': [
    'Пансіонат &quot;Сонячна Долина&quot; розташований у мальовничому куточку природи, поруч з лісом та озером. Детальну інформацію про розташування та як до нас дістатися ви знайдете у розділі &quot;Контакти&quot;.',
    'Ми знаходимося у екологічно чистому районі, оточеному лісом, недалеко від озера. Точну адресу та маршрут ви можете знайти у розділі &quot;Контакти&quot;.'
  ],
  'бронювання': [
    'Для бронювання номера ви можете заповнити форму на нашому сайті, зателефонувати нам або написати на електронну пошту. Ми відповімо вам якнайшвидше.',
    'Забронювати номер можна через форму на сайті, за телефоном або електронною поштою. Для підтвердження бронювання потрібна передоплата у розмірі 20%.'
  ],
  'послуги': [
    'У нашому пансіонаті ви можете скористатися такими послугами: безкоштовний Wi-Fi, парковка, сауна, масаж, оренда велосипедів, екскурсії та багато іншого.',
    'Ми пропонуємо широкий спектр послуг: Wi-Fi, парковку, сауну, басейн, масаж, оренду спортивного інвентаря та організацію екскурсій.'
  ],
  'контакти': [
    'Ви можете зв\'\u044fзатися з нами за телефоном: +380 97 47 57 157 або через форму зворотного зв\'\u044fзку на нашому сайті.',
    'Наші контактні дані: телефон +380 97 47 57 157. Ми також доступні у соціальних мережах та через форму зворотного зв\'\u044fзку на сайті.'
  ],
  'default': [
    'Вибачте, я не зрозумів ваше запитання. Спробуйте сформулювати його інакше або зв\'\u044fжіться з нами за телефоном для отримання детальнішої інформації.',
    'На жаль, я не маю відповіді на це запитання. Ви можете зв\'\u044fзатися з нами напряму за телефоном або електронною поштою для отримання більш детальної інформації.'
  ]
};

// Функція для декодування HTML-сутностей
const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

// Функція для пошуку відповіді бота
const findBotResponse = (query: string): string => {
  // Перетворюємо запит на нижній регістр для порівняння
  const normalizedQuery = query.toLowerCase();
  
  // Перевіряємо кожен ключ у базі відповідей
  for (const key in botResponses) {
    if (normalizedQuery.includes(key)) {
      // Вибираємо випадкову відповідь з доступних для цього ключа
      const responses = botResponses[key];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return decodeHtmlEntities(responses[randomIndex]);
    }
  }
  
  // Якщо відповідь не знайдена, повертаємо стандартну відповідь
  const defaultResponses = botResponses['default'];
  const randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return decodeHtmlEntities(defaultResponses[randomIndex]);
};

// Підказки для чат-бота
const suggestions = [
  'Ціни',
  'Номери',
  'Послуги',
  'Бронювання',
  'Контакти'
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); // Показувати підказки
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоматичне прокручування до останнього повідомлення
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Ефект для додавання привітального повідомлення при відкритті чату
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const welcomeMessage = 'Вітаю! Я віртуальний помічник пансіонату &quot;Сонячна Долина&quot;. Чим можу допомогти?';
        setMessages([
          {
            type: 'bot',
            text: decodeHtmlEntities(welcomeMessage),
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        // Показуємо підказки після привітання
        setShowSuggestions(true);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Відправка повідомлення
  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (messageText.trim() === '') return;

    // Додаємо повідомлення користувача
    const userMessage: Message = {
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Приховуємо підказки після першого повідомлення
    setShowSuggestions(false);
    
    // Імітуємо "друкування" бота
    setIsTyping(true);
    
    // Затримка перед відповіддю бота (для реалістичності)
    setTimeout(() => {
      const botMessage: Message = {
        type: 'bot',
        text: findBotResponse(messageText),
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Обробка натискання Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Кнопка відкриття чату */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-amber-400 to-amber-200 text-amber-900 p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Відкрити чат"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Вікно чату */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-amber-300">
          {/* Заголовок чату */}
          <div className="bg-gradient-to-r from-amber-400 to-amber-200 p-4 text-amber-900 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-amber-400 text-lg font-bold">СД</span>
              </div>
              <h3 className="font-semibold">Помічник &quot;Сонячної Долини&quot;</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Повідомлення */}
          <div className="flex-1 p-4 overflow-y-auto bg-amber-100 flex flex-col">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-amber-900 rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-amber-300'
                  }`}
                >
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }}></p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Індикатор друкування */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white p-3 rounded-lg rounded-tl-none border border-amber-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Кнопки-підказки */}
            {showSuggestions && messages.length > 0 && !isTyping && (
              <div className="mt-4">
                <p className="text-sm text-amber-800 mb-2">Оберіть тему:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="bg-gradient-to-r from-amber-400 to-amber-200 text-amber-900 px-3 py-2 rounded-md text-sm hover:from-amber-500 hover:to-amber-300 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Поле введення */}
          <div className="p-3 border-t border-amber-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишіть повідомлення..."
                className="flex-1 px-4 py-2 border border-amber-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-gradient-to-r from-amber-400 to-amber-200 text-amber-900 px-4 py-2 rounded-r-md hover:from-amber-500 hover:to-amber-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
