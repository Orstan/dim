"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Review, 
  getReviews, 
  updateReviewStatus, 
  addAdminReply, 
  editReview,
  deleteReview
} from '../firebase/reviewService';
import { getCurrentUser } from '../firebase/authService';

// Компонент для відображення одного відгуку в адмін-панелі
const AdminReviewItem = ({ 
  review, 
  onDelete, 
  onUpdateStatus, 
  onReply, 
  onEdit 
}: { 
  review: Review, 
  onDelete: (id: string) => void, 
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void,
  onReply: (id: string, reply: string) => void,
  onEdit: (review: Review) => void
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: review.name,
    email: review.email,
    relationship: review.relationship,
    rating: review.rating,
    comment: review.comment
  });

  const handleReplySubmit = () => {
    if (review.id && replyText.trim()) {
      onReply(review.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleEditSubmit = () => {
    if (review.id) {
      onEdit({ ...review, ...editData });
      setIsEditing(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const getStatusBadge = () => {
    switch (review.status) {
      case 'approved':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Схвалено</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Відхилено</span>;
      case 'pending':
      default:
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Очікує модерації</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border-l-4 border-blue-500">
      {isEditing ? (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Редагування відгуку</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Ім&apos;я</label>
            <input 
              type="text" 
              name="name" 
              value={editData.name} 
              onChange={handleEditChange} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={editData.email} 
              onChange={handleEditChange} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Відношення</label>
            <select 
              name="relationship" 
              value={editData.relationship} 
              onChange={handleEditChange} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Виберіть відношення</option>
              <option value="Клієнт">Клієнт</option>
              <option value="Партнер">Партнер</option>
              <option value="Інше">Інше</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Оцінка</label>
            <select 
              name="rating" 
              value={editData.rating} 
              onChange={handleEditChange} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Коментар</label>
            <textarea 
              name="comment" 
              value={editData.comment} 
              onChange={handleEditChange} 
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleEditSubmit} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Зберегти зміни
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Скасувати
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.email}</p>
              <p className="text-sm text-gray-500">{review.relationship} • {review.date}</p>
            </div>
            <div className="flex flex-col items-end">
              {getStatusBadge()}
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{review.comment}</p>
          
          {review.adminReply && (
            <div className="bg-blue-50 p-3 rounded-md mb-4">
              <p className="text-sm font-medium text-blue-800">Відповідь адміністратора:</p>
              <p className="text-gray-700">{review.adminReply}</p>
              <p className="text-xs text-gray-500 mt-1">{review.adminReplyDate}</p>
            </div>
          )}
          
          {isReplying ? (
            <div className="mt-3">
              <textarea 
                value={replyText} 
                onChange={(e) => setReplyText(e.target.value)} 
                placeholder="Введіть вашу відповідь..."
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              ></textarea>
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={handleReplySubmit} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Відправити відповідь
                </button>
                <button 
                  onClick={() => setIsReplying(false)} 
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm"
                >
                  Скасувати
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-4">
              {review.status === 'pending' && (
                <>
                  <button 
                    onClick={() => review.id && onUpdateStatus(review.id, 'approved')} 
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Схвалити
                  </button>
                  <button 
                    onClick={() => review.id && onUpdateStatus(review.id, 'rejected')} 
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Відхилити
                  </button>
                </>
              )}
              <button 
                onClick={() => setIsReplying(true)} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                {review.adminReply ? 'Змінити відповідь' : 'Відповісти'}
              </button>
              <button 
                onClick={() => setIsEditing(true)} 
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
              >
                Редагувати
              </button>
              <button 
                onClick={() => review.id && onDelete(review.id)} 
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
              >
                Видалити
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function AdminReviewPanel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  useEffect(() => {
    const checkAuthAndLoadReviews = async () => {
      try {
        // Перевіряємо, чи користувач є адміністратором
        const user = await getCurrentUser();
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }
        
        setIsAdmin(true);
        
        // Завантажуємо всі відгуки (включаючи ті, що очікують модерації)
        const fetchedReviews = await getReviews(true);
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (error) {
        console.error("Помилка при завантаженні відгуків:", error);
        setLoading(false);
      }
    };
    
    checkAuthAndLoadReviews();
  }, []);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error("Помилка при видаленні відгуку:", error);
      alert("Помилка при видаленні відгуку. Спробуйте пізніше.");
    }
  };
  
  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateReviewStatus(id, status);
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, status } : review
      ));
    } catch (error) {
      console.error("Помилка при оновленні статусу відгуку:", error);
      alert("Помилка при оновленні статусу відгуку. Спробуйте пізніше.");
    }
  };
  
  const handleReply = async (id: string, reply: string) => {
    try {
      await addAdminReply(id, reply);
      setReviews(reviews.map(review => 
        review.id === id ? { 
          ...review, 
          adminReply: reply, 
          adminReplyDate: new Date().toLocaleDateString('uk-UA') 
        } : review
      ));
    } catch (error) {
      console.error("Помилка при додаванні відповіді:", error);
      alert("Помилка при додаванні відповіді. Спробуйте пізніше.");
    }
  };
  
  const handleEdit = async (updatedReview: Review) => {
    if (!updatedReview.id) return;
    
    try {
      const { name, email, relationship, rating, comment } = updatedReview;
      const editData = { name, email, relationship, rating, comment };
      
      const result = await editReview(updatedReview.id, editData);
      
      setReviews(reviews.map(review => 
        review.id === updatedReview.id ? result : review
      ));
    } catch (error) {
      console.error("Помилка при редагуванні відгуку:", error);
      alert("Помилка при редагуванні відгуку. Спробуйте пізніше.");
    }
  };
  
  // Фільтруємо відгуки за статусом
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.status === filter);
  
  if (!isAdmin) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <h2 className="text-xl font-bold text-red-800 mb-2">Доступ заборонено</h2>
        <p className="text-red-700">
          Для доступу до адміністративної панелі необхідно увійти як адміністратор.
        </p>
      </div>
    );
  }
  
  if (loading) {
    return <div className="text-center py-8">Завантаження відгуків...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Адміністративна панель відгуків</h1>
        <Link 
          href="/" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Повернутися на головну
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Всі відгуки ({reviews.length})
          </button>
          <button 
            onClick={() => setFilter('pending')} 
            className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Очікують модерації ({reviews.filter(r => r.status === 'pending').length})
          </button>
          <button 
            onClick={() => setFilter('approved')} 
            className={`px-4 py-2 rounded-md ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Схвалені ({reviews.filter(r => r.status === 'approved').length})
          </button>
          <button 
            onClick={() => setFilter('rejected')} 
            className={`px-4 py-2 rounded-md ${filter === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Відхилені ({reviews.filter(r => r.status === 'rejected').length})
          </button>
        </div>
      </div>
      
      {filteredReviews.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Відгуків не знайдено</p>
        </div>
      ) : (
        <div>
          {filteredReviews.map(review => (
            <AdminReviewItem 
              key={review.id} 
              review={review} 
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
              onReply={handleReply}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
