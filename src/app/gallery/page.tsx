import type { Metadata } from "next";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Галерея пансіонату 'Сонячна Долина' | Фото умов проживання та території",
  description:
    "Фотографії пансіонату для літніх людей 'Сонячна Долина': номери, їдальня, вітальні, доглянута територія та активності мешканців. Фото частного пансионата для пожилых людей под Одессой.",
  keywords: [
    // UA
    "фото пансіонату для літніх людей Одеса",
    "умови проживання в будинку престарілих",
    "територія пансіонату Сонячна Долина",
    // RU
    "фото пансионата для пожилых людей Одесса",
    "условия проживания в доме престарелых",
    "территория пансионата Сонячная Долина",
  ],
};

export default function GalleryPage() {
  // Масив з зображеннями для галереї
  const galleryItems = [
    {
      category: 'Інтер\'єр',
      images: [
        { 
          src: '/images/services/vitalna.jpg', 
          alt: 'Затишна вітальня', 
          description: 'Простора та світла вітальня для відпочинку та спілкування' 
        },
        { 
          src: '/images/services/idalna.jpg', 
          alt: 'Їдальня', 
          description: 'Комфортна їдальня з сучасними меблями' 
        },
        { 
          src: '/images/services/spalna.jpg', 
          alt: 'Спальня', 
          description: 'Комфортна спальня з ортопедичними ліжками' 
        }
      ]
    },
    {
      category: 'Територія',
      images: [
        { 
          src: '/images/services/sad.jpg', 
          alt: 'Сад', 
          description: 'Доглянутий сад з лавочками для відпочинку' 
        },
        { 
          src: '/images/services/altanka.jpg', 
          alt: 'Альтанка', 
          description: 'Затишна альтанка для відпочинку на свіжому повітрі' 
        },
        { 
          src: '/images/services/dorizka.jpg', 
          alt: 'Доріжки для прогулянок', 
          description: 'Зручні доріжки для прогулянок територією' 
        }
      ]
    },
    {
      category: 'Активності',
      images: [
        { 
          src: '/images/services/fiz.jpg', 
          alt: 'Заняття фізкультурою', 
          description: 'Групові заняття фізичними вправами' 
        },
        { 
          src: '/images/services/chas.jpg', 
          alt: 'Час для натхнення та нових ідей', 
          description: 'Творчі заняття, що надихають, розвивають і дарують радість' 
        },
        { 
          src: '/images/services/sviato.jpg', 
          alt: 'Святкування', 
          description: 'Святкування днів народження та державних свят' 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">Галерея</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-amber-800 mb-8">
                Фотографії нашого пансіонату, території та активностей
              </p>
            </div>
          </div>
        </div>
        
        {galleryItems.map((category, categoryIndex) => (
          <section key={categoryIndex} className="py-16 bg-amber-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-amber-900 mb-10 text-center">{category.category}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div 
                      className="h-64 w-full rounded-t-lg"
                      style={{
                        backgroundImage: `url('${image.src}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      aria-label={image.alt}
                    ></div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-amber-800 mb-2">{image.alt}</h3>
                      <p className="text-gray-600">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Запрошуємо на екскурсію</h2>
              <p className="text-gray-700 mb-8">
                Ми запрошуємо вас відвідати наш пансіонат &quot;Сонячна Долина&quot; особисто, щоб на власні очі 
                побачити умови проживання, познайомитися з персоналом та відчути атмосферу закладу.
              </p>
              <p className="text-gray-700 mb-8">
                Під час екскурсії ви зможете оглянути кімнати, спільні зони відпочинку, їдальню 
                та територію пансіонату, а також отримати відповіді на всі ваші запитання.
              </p>
              
              <div className="mt-8">
                <a 
                  href="/contacts" 
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Записатися на екскурсію
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
