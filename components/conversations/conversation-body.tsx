'use client';
import { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import useConversation from '@/hooks/useConversation';

import Message from './message';

import { FullMessageType } from '@/types';
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';

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
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bodyBottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bodyBottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="h-[86%] overflow-auto">
      {messages.map((message, i) => (
        <Message isLast={i === messages.length - 1} key={message.id} message={message} />
      ))}
      <div ref={bodyBottomRef} />
    </div>
  );
};

export default ConversationBody;
