"use client";

import dynamic from 'next/dynamic';

// Динамічний імпорт чат-бота без серверного рендерингу
const ChatBot = dynamic(() => import('./ChatBot'), { ssr: false });

export default function ChatBotWrapper() {
  return <ChatBot />;
}
