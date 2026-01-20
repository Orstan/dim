"use client";

import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  position: string;
  imageUrl: string;
  description: string;
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Наталія Білоус',
      position: 'Директор пансіонату',
      description: 'Досвідчений спеціаліст у сфері підтримки людей літнього віку, понад 5 років практики та науковий бекграунд',
      imageUrl: '/images/team/natalia.jpg'
    },
    {
      name: 'Олександра Степаненко',
      position: 'Керівник персоналу з догляду',
      description: 'Професіонал з багаторічним досвідом турботи про людей старшого віку, експерт у питаннях їхнього благополуччя',
      imageUrl: '/images/team/oleksandra.jpg'
    },
    {
      name: 'Валентина Сидоренко',
      position: 'Спеціаліст із щоденного піклування',
      description: 'Професіонал з багаторічним досвідом турботи та щоденної підтримки літніх людей',
      imageUrl: '/images/team/valentyna.jpg'
    }
  ];

  return (
    <section className="py-16 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Наша команда</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Наші співробітники - це кваліфіковані фахівці з великим досвідом роботи з людьми похилого віку.
            Ми дбаємо про кожного мешканця з увагою та повагою.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-amber-200">
              <div className="h-64 relative">
                <Image
                  src={member.imageUrl}
                  alt={`Фото ${member.name}`}
                  fill
                  className="object-cover rounded-t-lg"
                  unoptimized
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900">{member.name}</h3>
                <p className="text-amber-700 font-medium mb-3">{member.position}</p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
