"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const callPhone = (phoneNumber: string) => {
    // Використовуємо протокол tel: для відкриття програми для дзвінків
    window.location.href = `tel:${phoneNumber}`;
  };
  
  return (
    <footer className="bg-gradient-to-r from-amber-400 to-amber-200 text-amber-900 py-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Пансіонат &quot;Сонячна Долина&quot;</h3>
            <p className="mb-2">Затишок та турбота для кожного</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контакти</h3>
            <p className="mb-2">Адреса: м.Одеса, с.Лески, вул.Шевченка, 4Б</p>
            <p className="mb-2">
              Телефон: <span 
                className="cursor-pointer hover:text-amber-600 transition-colors" 
                onClick={() => callPhone('+380974757157')}
                title="Натисніть, щоб зателефонувати"
              >+380 97 47 57 157</span>
            </p>
            <p>
              <a href="/contacts" className="hover:text-amber-600 transition-colors">
                Форма зворотного зв&apos;язку
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Години роботи</h3>
            <p className="mb-2">Понеділок - П&apos;ятниця: 8:00 - 20:00</p>
            <p className="mb-2">Субота: 9:00 - 18:00</p>
            <p>Неділя: 10:00 - 16:00</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Години відвідування</h3>
            <p>Щодня: 10:00 - 19:00</p>
          </div>
        </div>
        
        <div className="border-t border-amber-300 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Пансіонат &quot;Сонячна Долина&quot;. Усі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
