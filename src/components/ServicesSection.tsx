import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      icon: '/images/services/harchuvania.jpg',
      title: 'Збалансоване харчування',
      description: "П'ятиразове харчування з урахуванням індивідуальних потреб та дієтичних рекомендацій."
    },
    {
      icon: '/images/services/dohliad.jpg',
      title: 'Щоденний догляд та допомога',
      description: 'Допомога в гігієнічних процедурах, купанні та одяганні, контроль прийому ліків, вимірювання тиску, рівня цукру та температури, робота сиделки й профілактика пролежнів.'
    },
    {
      icon: '/images/services/dozvilia.jpg',
      title: 'Дозвілля та активності',
      description: 'Лікувальна фізкультура (ЛФК), настільні ігри, прогулянки на свіжому повітрі, святкові заходи та заняття з психологом для підтримки активності й гарного настрою.'
    },
    {
      icon: '/images/services/spalna.jpg',
      title: 'Комфортне проживання',
      description: 'Затишні номери з усіма зручностями, адаптовані для людей з обмеженою мобільністю.'
    },
    {
      icon: '/images/services/pidtrymka.jpg',
      title: 'Психологічна підтримка',
      description: 'Сворення позитивної атмосфери для емоційного благополуччя.'
    }
  ];

  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Наші послуги</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Ми пропонуємо широкий спектр послуг для забезпечення комфортного проживання 
            та якісного догляду за нашими мешканцями
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 mr-4 rounded-full"
                  style={{
                    backgroundImage: `url('${service.icon}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
                <h3 className="text-xl font-semibold text-amber-800">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/services" 
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Всі послуги
          </Link>
        </div>
      </div>
    </section>
  );
}
