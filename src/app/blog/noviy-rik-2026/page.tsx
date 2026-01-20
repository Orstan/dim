import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Святкування Нового Року в пансіонаті 'Сонячна Долина' | Блог пансіонату",
  description: "Як ми відзначили новорічні свята в нашому пансіонаті. Фотозвіт та враження наших мешканців.",
  keywords: "новий рік 2026, святкування, пансіонат для літніх, Одеса, с.Лески, свята в пансіонаті",
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-amber-100">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/blog" className="text-amber-700 hover:text-amber-900 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
            </svg>
            Повернутися до блогу
          </Link>
        </div>

        <article className="bg-white rounded-lg overflow-hidden shadow-lg border border-amber-200">
          <div className="relative h-80 w-full">
            <Image 
              src="/images/blog/novy-rik.jpg" 
              alt="Святкування Нового Року в пансіонаті" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Події
              </span>
              <span className="text-gray-500 text-sm ml-auto">2 січня 2026</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-6 text-amber-900">
              Святкування Нового Року в пансіонаті "Сонячна Долина"
            </h1>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Новий рік — це особливе свято, яке об'єднує людей різного віку та створює атмосферу тепла і радості. У пансіонаті "Сонячна Долина" ми приділяємо особливу увагу організації святкувань, щоб наші мешканці відчували себе як вдома та насолоджувалися святковою атмосферою разом з близькими людьми.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Підготовка до свята</h2>
              <p className="mb-4">
                Підготовка до новорічних свят у нашому пансіонаті розпочалася ще на початку грудня. Мешканці разом з персоналом прикрашали приміщення, створювали святкові декорації та планували святкову програму.
              </p>
              <p className="mb-4">
                Особливу увагу ми приділили:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Створенню затишної атмосфери в кожній кімнаті та спільних приміщеннях</li>
                <li>Прикрашанню новорічної ялинки, яка стала центром святкових заходів</li>
                <li>Виготовленню святкових листівок для родичів наших мешканців</li>
                <li>Підготовці святкового меню з урахуванням побажань та дієтичних потреб кожного мешканця</li>
              </ul>
              
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <p className="italic">
                  "Мені дуже сподобалося брати участь у прикрашанні нашої їдальні. Це нагадало мені часи, коли я готувалася до свят разом зі своїми дітьми та онуками. Атмосфера була дуже теплою та святковою." — Марія Петрівна, 78 років, мешканка пансіонату
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Святковий вечір</h2>
              <p className="mb-4">
                Новорічний вечір 31 грудня був особливо яскравим та насиченим. Програма включала:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Святковий концерт за участю професійних артистів та талановитих мешканців пансіонату</li>
                <li>Виступ Діда Мороза та Снігуроньки з подарунками для кожного мешканця</li>
                <li>Святкову вечерю з традиційними новорічними стравами</li>
                <li>Відеозв'язок з родичами, які не змогли приїхати особисто</li>
                <li>Перегляд новорічного звернення Президента та святковий салют (через вікна та на великому екрані)</li>
              </ul>
              
              <p className="mb-4">
                Особливо зворушливим моментом стало спільне виконання улюблених пісень та колядок, які об'єднали всіх присутніх.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Фото 1: Святкова вечеря</span>
                </div>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Фото 2: Виступ артистів</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Святкові традиції</h2>
              <p className="mb-4">
                У нашому пансіонаті ми поєднуємо сучасні розваги з традиційними українськими звичаями. Цього року мешканці мали можливість:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Взяти участь у ворожінні на Новий рік (як розвага)</li>
                <li>Обмінятися символічними подарунками</li>
                <li>Написати листи з побажаннями на наступний рік</li>
                <li>Взяти участь у традиційних новорічних іграх та конкурсах</li>
              </ul>
              
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <p className="italic">
                  "Мені дуже сподобалося, як ми всі разом співали колядки. Я згадав своє дитинство, коли ми з друзями ходили від хати до хати. Дякую персоналу за таке чудове свято!" — Іван Степанович, 82 роки, мешканець пансіонату
                </p>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Перший день нового року</h2>
              <p className="mb-4">
                1 січня також був насичений цікавими подіями:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Святковий сніданок з традиційними стравами</li>
                <li>Перегляд улюблених новорічних фільмів у кінозалі пансіонату</li>
                <li>Відвідування родичами (для тих мешканців, до яких змогли приїхати близькі)</li>
                <li>Святкова прогулянка територією пансіонату (для тих, хто мав можливість)</li>
                <li>Майстер-клас з виготовлення сувенірів на згадку про свято</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Враження мешканців</h2>
              <p className="mb-4">
                Наші мешканці залишилися дуже задоволені святкуванням. Ось кілька відгуків:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="italic">
                    "Це було найкраще новорічне свято за останні роки! Я відчула себе оточеною турботою та увагою. Особливо сподобався концерт та смачна вечеря." — Ольга Миколаївна, 75 років
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="italic">
                    "Дуже зворушливо було поспілкуватися з онуками через відеозв'язок прямо під час святкування. Дякую персоналу за організацію!" — Петро Васильович, 80 років
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="italic">
                    "Мені сподобалося, що нам дали можливість самим брати участь у підготовці свята. Я відчула себе потрібною та важливою." — Надія Іванівна, 72 роки
                  </p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Висновок</h2>
              <p className="mb-4">
                Святкування Нового року в пансіонаті "Сонячна Долина" стало яскравою подією, яка подарувала нашим мешканцям багато позитивних емоцій та вражень. Ми переконані, що такі заходи дуже важливі для підтримки емоційного здоров'я та створення відчуття спільноти серед мешканців пансіонату.
              </p>
              <p className="mb-4">
                Ми вже почали планувати святкування наступних свят і запрошуємо родичів наших мешканців долучатися до організації та проведення таких заходів.
              </p>
              <p className="mb-4">
                Якщо ви хочете дізнатися більше про життя в нашому пансіонаті або відвідати нас, будь ласка, зв'яжіться з нами за телефоном або відвідайте нас за адресою: м.Одеса, с.Лески, вул.Шевченка, 4Б.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-800 font-bold">СД</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Автор: Відділ дозвілля пансіонату "Сонячна Долина"</p>
                  <p className="text-sm text-gray-500">Організатори свят та дозвілля</p>
                </div>
              </div>
            </div>
          </div>
        </article>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
