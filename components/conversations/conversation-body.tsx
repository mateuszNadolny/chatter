'use client';
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import useConversation from '@/hooks/useConversation';

import Message from './message';

import { FullMessageType } from '@/types';

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}
const ConversationBody = ({ initialMessages }: ConversationBodyProps) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bodyBottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="h-[86%] overflow-auto">
      {messages.map((message, i) => (
        <Message isLast={i === messages.length - 1} key={message.id} message={message} />
      ))}
      <div ref={bodyBottomRef} className="pt-20" />
    </div>
  );
};

export default ConversationBody;
