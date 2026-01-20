import type { Metadata } from "next";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReviewSection from '../../components/ReviewSection';

export const metadata: Metadata = {
  title: "Відгуки про пансіонат 'Сонячна Долина' | Досвід родичів та мешканців",
  description:
    "Реальні відгуки родичів та мешканців про пансіонат для літніх людей 'Сонячна Долина'. Дізнайтеся, чому нас обирають для догляду за близькими. Отзывы о частном пансионате для пожилых людей под Одессой.",
  keywords: [
    // UA
    "відгуки про пансіонат для літніх людей Одеса",
    "досвід проживання в будинку для людей похилого віку",
    // RU
    "отзывы о пансионате для пожилых людей Одесса",
    "опыт проживания в доме престарелых",
  ],
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-amber-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">Відгуки</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-amber-800 mb-8">
                Ваша думка важлива для нас. Поділіться своїм досвідом та допоможіть іншим зробити правильний вибір
              </p>
            </div>
          </div>
        </div>
        
        <ReviewSection />
      </main>
      
      <Footer />
    </div>
  );
}
