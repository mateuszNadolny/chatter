'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import useConversation from '@/hooks/useConversation';

import clsx from 'clsx';

import ConversationListItem from './conversation-list-item';
import StartNewConversation from './start-new-conversation';

import { FullConversationType } from '@/types';

interface ConversationListProps {
  initialConversations: FullConversationType[];
}
const ConversationList = ({ initialConversations }: ConversationListProps) => {
  const [conversations, setConversations] = useState(initialConversations);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <div
      className={clsx(
        'flex flex-col w-full lg:w-[27rem] border-r',
        isOpen ? 'hidden lg:flex' : 'flex'
      )}>
      <h2 className="m-2 pb-3 pt-5 pl-5 text-2xl font-extrabold tracking-tight transition-colors">
        Conversations
      </h2>
      <StartNewConversation />
      <ul className="flex flex-col">
        {initialConversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            selected={conversationId === conversation.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
