"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  markerTitle?: string;
}

const GoogleMap = ({ lat, lng, zoom = 15, markerTitle = "Пансіонат \"Сонячна Долина\"" }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const apiLoaded = useRef<boolean>(false);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

  useEffect(() => {
    // Функція для завантаження Google Maps API
    const loadGoogleMapsApi = async () => {
      try {
        // Перевіряємо, чи API вже завантажено
        if (window.google && window.google.maps) {
          setTimeout(() => initializeMap(), 100);
          return;
        }

        // Використовуємо офіційний завантажувач Google Maps
        const loader = new Loader({
          apiKey: 'AIzaSyAxNrUsM5jV4Uf5II60aE1ImyOQW-PPZGw',
          version: 'weekly',
          libraries: ['places']
        });

        // Завантажуємо Google Maps API
        await loader.load();
        // Даємо час для повного завантаження API
        setTimeout(() => initializeMap(), 500);
      } catch (error) {
        console.error('Помилка завантаження Google Maps API:', error);
      }
    };

    // Функція для ініціалізації карти
    const initializeMap = () => {
      if (!mapRef.current || !window.google || !window.google.maps) {
        console.log('Google Maps API не завантажено або mapRef не існує');
        return;
      }
      
      try {
        apiLoaded.current = true;
        
        const mapOptions = {
          center: { lat, lng },
          zoom,
          mapTypeId: 'roadmap',
          mapTypeControl: true,
          scrollwheel: false,
          streetViewControl: true,
          zoomControl: true,
          fullscreenControl: true,
        };

        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;
        
        // Додаємо маркер на карту
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: markerTitle,
        });
        markerRef.current = marker;

        // Додаємо інформаційне вікно
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 10px;"><strong>${markerTitle}</strong><br>Ласкаво просимо!</div>`,
        });
        infoWindowRef.current = infoWindow;

        // Відкриваємо інформаційне вікно при кліку на маркер
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        // Відкриваємо інформаційне вікно одразу
        infoWindow.open(map, marker);
      } catch (error) {
        console.error('Помилка при ініціалізації карти:', error);
      }
    };

    // Завантажуємо Google Maps API
    loadGoogleMapsApi();

    // Прибираємо ресурси при розмонтуванні компонента
    return () => {
      if (markerRef.current) {
        try {
          markerRef.current.setMap(null);
        } catch (e) {}
        markerRef.current = null;
      }
      if (infoWindowRef.current) {
        try {
          infoWindowRef.current.close();
        } catch (e) {}
        infoWindowRef.current = null;
      }
      mapInstanceRef.current = null;
    };
  }, [lat, lng, zoom, markerTitle]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-full" 
        style={{ minHeight: '400px' }}
      />
      <div className="text-xs text-gray-500 mt-2 text-center">
        Натисніть на маркер для отримання додаткової інформації
      </div>
    </div>
  );
};

// Додаємо тип для глобального об'єкта window
declare global {
  interface Window {
    google: any;
  }
}

export default GoogleMap;
