import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { db } from "./config";

// Інтерфейс для відгуку
export interface Review {
  id?: string;
  name: string;
  email: string;
  relationship: string;
  rating: number;
  comment: string;
  date: string;
  createdAt?: Timestamp;
  // Нові поля для модерації та відповідей
  status?: 'pending' | 'approved' | 'rejected'; // Статус модерації
  adminReply?: string; // Відповідь адміністратора
  adminReplyDate?: string; // Дата відповіді

}

// Колекція для відгуків
const reviewsCollection = collection(db, "reviews");

// Додати новий відгук
export const addReview = async (review: Review) => {
  try {
    const reviewWithTimestamp = {
      ...review,
      createdAt: Timestamp.now(),
      status: 'pending' // За замовчуванням відгук очікує модерації
    };
    const docRef = await addDoc(reviewsCollection, reviewWithTimestamp);
    return { id: docRef.id, ...review };
  } catch (error) {
    console.error("Помилка при додаванні відгуку:", error);
    throw error;
  }
};

// Отримати всі відгуки, відсортовані за датою створення (найновіші спочатку)
export const getReviews = async (includeAllStatuses = false) => {
  try {
    let q;
    if (includeAllStatuses) {
      // Для адміністратора - всі відгуки
      q = query(reviewsCollection, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
    } else {
      // Для звичайних користувачів - спочатку отримуємо всі відгуки, потім фільтруємо
      // Це допомагає уникнути необхідності в складному індексі
      q = query(reviewsCollection, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);
      
      // Фільтруємо відгуки на стороні клієнта
      const filteredReviews = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
      
      // Повертаємо тільки схвалені відгуки
      return filteredReviews.filter(review => review.status === "approved");
    }
  } catch (error) {
    console.error("Помилка при отриманні відгуків:", error);
    throw error;
  }
};

// Видалити відгук
export const deleteReview = async (id: string) => {
  try {
    await deleteDoc(doc(db, "reviews", id));
    return true;
  } catch (error) {
    console.error("Помилка при видаленні відгуку:", error);
    throw error;
  }
};




// Оновити статус відгуку (модерація)
export const updateReviewStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
  try {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, { status });
    return true;
  } catch (error) {
    console.error("Помилка при оновленні статусу відгуку:", error);
    throw error;
  }
};

// Додати відповідь адміністратора
export const addAdminReply = async (id: string, adminReply: string) => {
  try {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, { 
      adminReply,
      adminReplyDate: new Date().toLocaleDateString('uk-UA')
    });
    return true;
  } catch (error) {
    console.error("Помилка при додаванні відповіді адміністратора:", error);
    throw error;
  }
};

// Редагувати відгук (для адміністратора)
export const editReview = async (id: string, updatedData: Partial<Review>) => {
  try {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, updatedData);
    
    // Отримуємо оновлений відгук
    const updatedReviewSnapshot = await getDoc(reviewRef);
    if (updatedReviewSnapshot.exists()) {
      return {
        id: updatedReviewSnapshot.id,
        ...updatedReviewSnapshot.data()
      } as Review;
    } else {
      throw new Error("Відгук не знайдено після оновлення");
    }
  } catch (error) {
    console.error("Помилка при редагуванні відгуку:", error);
    throw error;
  }
};

