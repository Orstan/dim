import type { Metadata } from "next";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Послуги пансіонату для літніх людей | Догляд, реабілітація та проживання біля Одеси",
  description:
    "Послуги пансіонату 'Сонячна Долина': догляд за літніми людьми, догляд за лежачими хворими, реабілітація після інсульту та травм, психологічна підтримка, комфортне проживання. Услуги пансионата для пожилых людей под Одессой.",
  keywords: [
    // UA
    "послуги пансіонату для літніх людей",
    "догляд за лежачими хворими Одеса",
    "реабілітація літніх після інсульту",
    "тимчасове та постійне проживання літніх",
    // RU
    "услуги пансионата для пожилых людей",
    "уход за лежачими больными Одесса",
    "реабилитация пожилых после инсульта",
    "временное и постоянное проживание пожилых",
  ],
};

export default function ServicesPage() {
  const services = [
    {
      icon: '/images/services/harchuvania.jpg',
      title: 'Збалансоване харчування',
      description: "Чотириразове харчування з урахуванням індивідуальних потреб та дієтичних рекомендацій. Наші кухарі готують смачні та корисні страви з якісних продуктів.",
      details: [
        "Чотириразове харчування",
        'Індивідуальний підхід до складання меню',
        'Дієтичне харчування за призначенням лікаря',
        'Свіжі та якісні продукти',
        'Різноманітне сезонне меню'
      ]
    },
    {
      icon: '/images/services/dohliad.jpg',
      title: 'Щоденний догляд та допомога',
      description: 'Комплексний щоденний догляд за мешканцями: від гігієнічних процедур до контролю стану здоров’я та організації дозвілля.',
      details: [
        'Допомога в гігієні, купанні та одяганні',
        'Контроль своєчасного прийому ліків',
        'Регулярне вимірювання тиску, рівня цукру в крові та температури',
        'Профілактика пролежнів',
        'ЛФК (лікувальна фізкультура)',
        'Настільні ігри та інші спокійні активності',
        'Прогулянки на свіжому повітрі',
        'Святкові заходи та спільні події',
        'Заняття з психологом для підтримки емоційного стану'
      ]
    },
    {
      icon: '/images/services/dozvilia.jpg',
      title: 'Дозвілля та активності',
      description: 'Різноманітні культурні заходи, групові заняття та фізичні вправи для активного життя. Ми організовуємо цікаве та змістовне дозвілля для наших мешканців.',
      details: [
        'Групові заняття фізичними вправами',
        'Музичні та літературні вечори',
        'Прогулянки на свіжому повітрі',
        'Святкування днів народження та державних свят'
      ]
    },
    {
      icon: '/images/services/spalna.jpg',
      title: 'Комфортне проживання',
      description: 'Затишні номери з усіма зручностями, адаптовані для людей з обмеженою мобільністю. Ми створили комфортні умови для проживання наших мешканців.',
      details: [
        'Одно- та двомісні номери',
        'Спеціальне обладнання для людей з обмеженою мобільністю',
        'Комфортні ліжка з ортопедичними матрацами',
        'Система виклику персоналу',
        'Кондиціонування та опалення'
      ]
    },
    {
      icon: '/images/services/pidtrymka.jpg',
      title: 'Психологічна підтримка',
      description: 'Сворення позитивної атмосфери для емоційного благополуччя.',
      details: [
        'Індивідуальні консультації',
        'Групові тренінги',
        'Арт-терапія',
        'Соціальна адаптація та комунікація'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">Наші послуги</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-amber-800 mb-8">
                У пансіонаті &quot;Сонячна Долина&quot; ми пропонуємо широкий спектр послуг для забезпечення 
                комфортного проживання та якісного догляду за нашими мешканцями
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-16">
              {services.map((service, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                  <div className="md:w-1/3 w-full">
                    <div className="bg-white rounded-lg shadow-md border border-amber-200 overflow-hidden">
                      <div className="w-full h-64">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold text-amber-900 mb-4">{service.title}</h2>
                    <p className="text-gray-700 mb-6">{service.description}</p>
                    
                    <h3 className="text-xl font-semibold text-amber-800 mb-3">Що включає послуга:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {service.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Індивідуальний підхід</h2>
              <p className="text-gray-700 mb-8">
                Ми розуміємо, що кожна людина має свої унікальні потреби та вподобання. Тому ми пропонуємо 
                індивідуальний підхід до кожного мешканця, розробляючи персональний план догляду та підтримки.
              </p>
              <p className="text-gray-700 mb-8">
                Наша команда фахівців проводить детальну оцінку стану здоров&apos;я та потреб кожного нового мешканця, 
                щоб забезпечити найбільш відповідний рівень догляду та підтримки.
              </p>
              
              <div className="mt-8">
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
      </main>
      
      <Footer />
    </div>
  );
}
