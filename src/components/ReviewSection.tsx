"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Review, 
  addReview, 
  getReviews, 
  deleteReview as deleteReviewService
} from '../firebase/reviewService';

import { signIn, signOut, getCurrentUser } from '../firebase/authService';

export default function ReviewSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    relationship: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  
  // Обчислюємо загальну кількість сторінок
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  // Функція для переходу до наступної сторінки
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  // Функція для переходу до попередньої сторінки
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  // Завантажуємо відгуки з Firebase при монтуванні компонента
  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Для адміністратора завантажуємо всі відгуки, для звичайних користувачів - тільки схвалені
        const user = await getCurrentUser();
        const isUserAdmin = !!user;
        setIsAdmin(isUserAdmin);
        
        const fetchedReviews = await getReviews(isUserAdmin);
        if (fetchedReviews.length > 0) {
          setReviews(fetchedReviews);
        }
        setLoading(false);
      } catch (error: unknown) {
        console.error("Помилка при завантаженні відгуків:", error);
        setLoading(false);
      }
    };
    
    loadReviews();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Функція для видалення відгуку
  const handleDeleteReview = async (reviewId: string | undefined) => {
    if (!reviewId) {
      console.error("Неможливо видалити відгук без ідентифікатора");
      return;
    }
    
    try {
      await deleteReviewService(reviewId);
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
    } catch (error: unknown) {
      console.error("Помилка при видаленні відгуку:", error);
      alert("Помилка при видаленні відгуку. Спробуйте пізніше.");
    }
  };
  
  // Функція для відкриття модального вікна входу адміністратора
  const toggleAdminMode = () => {
    if (isAdmin) {
      // Якщо вже в режимі адміністратора, виходимо
      handleSignOut();
    } else {
      // Якщо не в режимі адміністратора, відкриваємо модальне вікно
      setShowAdminModal(true);
      setAdminEmail('');
      setAdminPassword('');
      setLoginError('');
    }
  };
  
  // Функція для входу адміністратора
  const handleAdminLogin = async () => {
    if (!adminEmail || !adminPassword) {
      setLoginError("Введіть email та пароль");
      return;
    }
    
    try {
      await signIn(adminEmail, adminPassword);
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminEmail('');
      setAdminPassword('');
    } catch (error: unknown) {
      console.error("Помилка входу:", error);
      setLoginError("Невірний email або пароль");
    }
  };
  
  // Функція для виходу адміністратора
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAdmin(false);
    } catch (error: unknown) {
      console.error("Помилка виходу:", error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Створюємо новий відгук
      const newReview: Review = {
        name: formData.name,
        email: formData.email,
        relationship: formData.relationship,
        rating: formData.rating,
        comment: formData.comment,
        date: new Date().toLocaleDateString('uk-UA'),
        // За замовчуванням відгук очікує модерації
        status: 'pending'
      };
      
      // Додаємо відгук до Firebase
      const addedReview = await addReview(newReview);
      
      // Оновлюємо список відгуків (якщо користувач адмін)
      if (isAdmin) {
        setReviews([addedReview, ...reviews]);
      }
      
      setSubmitted(true);
      
      // Скидаємо форму через 3 секунди
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          rating: 5,
          comment: '',
          relationship: ''
        });
      }, 3000);
    } catch (error: unknown) {
      console.error("Помилка при додаванні відгуку:", error);
      alert("Помилка при додаванні відгуку. Спробуйте пізніше.");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Функція для відображення відповідного тексту відношення
  const getRelationshipText = (relationship: string) => {
    switch (relationship) {
      case 'child': return 'Син/Дочка';
      case 'grandchild': return 'Внук/Внучка';
      case 'relative': return 'Інший родич';
      case 'friend': return 'Друг/Подруга';
      case 'resident': return 'Мешканець';
      case 'other': return 'Інше';
      default: return relationship; // Для старих відгуків, які можуть мати текстове значення
    }
  };
  
  // Компонент для відображення одного відгуку
  const ReviewItem = ({ review }: { review: Review }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-amber-200">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-amber-900">{review.name}</h4>
          <p className="text-sm text-gray-500">
            {getRelationshipText(review.relationship)}
            {' • '}{review.date}
          </p>
          {/* Показуємо email тільки для адміністратора */}
          {isAdmin && (
            <p className="text-sm text-blue-600 mt-1">
              <span className="font-medium">Email: </span>{review.email}
            </p>
          )}
        </div>
        
        {/* Кнопка видалення для адміністратора */}
        {isAdmin && (
          <button 
            onClick={() => handleDeleteReview(review.id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Видалити відгук"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        )}
      </div>
      
      {/* Зірки оцінки */}
      <div className="flex items-center my-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            className={`w-5 h-5 ${star <= review.rating ? 'text-amber-500' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">{review.rating} з 5</span>
      </div>
      
      <p className="text-gray-700 mt-3 italic">{review.comment}</p>
    </div>
  );
  
  return (
    <section className="py-16 bg-amber-100">
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Вхід адміністратора</h3>
            <div className="mb-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-2 border rounded-md border-amber-300 mb-3"
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                  setLoginError('');
                }}
              />
              <input 
                type="password" 
                placeholder="Пароль" 
                className={`w-full px-4 py-2 border rounded-md ${loginError ? 'border-red-500' : 'border-amber-300'}`}
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setLoginError('');
                }}
              />
              {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setShowAdminModal(false)}
                type="button"
              >
                Скасувати
              </button>
              <button 
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                onClick={handleAdminLogin}
                type="button"
              >
                Увійти
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Залиште свій відгу
              <span 
                onClick={toggleAdminMode} 
                className="inline-block text-amber-900"
                style={{ 
                  display: 'inline', 
                  background: 'none', 
                  border: 'none', 
                  padding: 0, 
                  margin: 0, 
                  cursor: 'default', 
                  fontWeight: 'inherit', 
                  fontSize: 'inherit',
                  position: 'relative',
                  top: 0,
                  left: 0,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}
                role="button"
                tabIndex={-1}
                aria-label="Режим адміністратора"
              >к</span>
            </h2>
            {isAdmin && (
              <div className="mt-2 mb-4">
                <Link 
                  href="/admin/reviews" 
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Перейти до панелі модерації відгуків
                </Link>
              </div>
            )}
            <p className="text-gray-700">
              Ваша думка дуже важлива для нас. Поділіться своїм досвідом перебування в пансіонаті &quot;Сонячна Долина&quot;
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            {submitted ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">Дякуємо за ваш відгук!</h3>
                <p className="text-gray-700">Ваша думка допомагає нам ставати кращими.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">Ваше ім&apos;я</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Введіть ваше ім&apos;я"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Введіть ваш email"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Ваш email не буде опубліковано.</p>
                </div>
                
                <div>
                  <label htmlFor="relationship" className="block text-gray-700 mb-1 font-medium">Ким ви приходитесь мешканцю</label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="">Оберіть варіант</option>
                    <option value="child">Син/Дочка</option>
                    <option value="grandchild">Внук/Внучка</option>
                    <option value="relative">Інший родич</option>
                    <option value="friend">Друг/Подруга</option>
                    <option value="resident">Я мешканець</option>
                    <option value="other">Інше</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Оцінка</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <svg 
                          className={`w-8 h-8 ${star <= formData.rating ? 'text-amber-500' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 text-gray-700">{formData.rating} з 5</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-gray-700 mb-1 font-medium">Ваш відгук</label>
                  <textarea 
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Розкажіть про ваш досвід"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="privacy" className="text-gray-700 text-sm">
                    Я погоджуюся з публікацією цього відгуку на сайті пансіонату &quot;Сонячна Долина&quot;
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full font-bold py-3 px-4 rounded-md transition duration-300 bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={submitting}
                >
                  {submitting ? 'Надсилаємо...' : 'Надіслати відгук'}
                </button>
              </form>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              <p className="mt-2 text-gray-600">Завантаження відгуків...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">Відгуки наших гостей</h3>
              
              {/* Мобільна карусель з горизонтальним прокручуванням */}
              <div className="md:hidden relative">
                <div className="overflow-x-auto pb-4 flex snap-x snap-mandatory scroll-smooth">
                  {reviews.map((review) => (
                    <div 
                      key={review.id} 
                      className="bg-white rounded-lg shadow-md p-6 border border-amber-200 min-w-[85%] flex-shrink-0 snap-center mr-4"
                    >
                      <ReviewItem review={review} />
                    </div>
                  ))}
                </div>
                
                {/* Індикатор сторінок для мобільної версії */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 mx-1 rounded-full ${
                        index === currentPage ? 'bg-amber-600' : 'bg-amber-300'
                      }`}
                      onClick={() => setCurrentPage(index)}
                      aria-label={`Перейти до сторінки ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Десктопна версія з пагінацією */}
              <div className="hidden md:block">
                <div className="space-y-6">
                  {reviews
                    .slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)
                    .map((review) => (
                      <div key={review.id}>
                        <ReviewItem review={review} />
                      </div>
                    ))}
                </div>
                
                {/* Навігація для десктопної версії */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={prevPage}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors flex items-center"
                      disabled={currentPage === 0}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      Попередні
                    </button>
                    
                    <div className="text-gray-700">
                      Сторінка {currentPage + 1} з {totalPages}
                    </div>
                    
                    <button
                      onClick={nextPage}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors flex items-center"
                      disabled={currentPage === totalPages - 1}
                    >
                      Наступні
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">Поки що немає відгуків. Будьте першим!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}