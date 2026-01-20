import type { Metadata } from "next";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ReviewSection from '../components/ReviewSection';
import GoogleMap from '../components/GoogleMap';

export const metadata: Metadata = {
  title: "Пансіонат для літніх людей в Одесі (Лески) | Приватний будинок престарілих 'Сонячна Долина'",
  description:
    "Пансіонат 'Сонячна Долина' – приватний будинок для літніх людей біля Одеси (с. Лески). Цілодобовий догляд, комфортні умови проживання, медичний супровід, реабілітація після інсульту та догляд за лежачими хворими. Частный пансионат для пожилых людей под Одессой.",
  keywords: [
    // UA
    "пансіонат для літніх людей Одеса",
    "будинок для людей похилого віку біля Одеси",
    "приватний пансіонат для престарілих Одеса",
    "догляд за літніми людьми Одеса Лески",
    "платний будинок престарілих Одеса",
    // RU
    "пансионат для пожилых людей Одесса",
    "дом престарелых возле Одессы",
    "частный пансионат для пенсионеров Одесса",
    "уход за пожилыми людьми Одесса Лески",
    "платный дом престарелых Одесса",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ReviewSection />
        
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Наше розташування</h2>
              <p className="text-gray-700 mb-8">
                Пансіонат &quot;Сонячна Долина&quot; розташований у мальовничому та тихому селі Лески поблизу Одеси
              </p>
              
              <div className="h-96 rounded-lg overflow-hidden border-2 border-amber-300 bg-white">
                <GoogleMap 
                  lat={46.562977253371635} 
                  lng={30.815330704893505} 
                  zoom={15} 
                  markerTitle="Пансіонат 'Сонячна Долина'" 
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
