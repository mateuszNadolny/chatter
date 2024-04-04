'use client';

import { useState, useMemo, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import useConversation from '@/hooks/useConversation';

import { pusherClient } from '@/lib/pusher';

import clsx from 'clsx';

import ConversationListItem from './conversation-list-item';
import StartNewConversation from './start-new-conversation';

import { FullConversationType } from '@/types';
import { find } from 'lodash';

interface ConversationListProps {
  initialConversations: FullConversationType[];
}
const ConversationList = ({ initialConversations }: ConversationListProps) => {
  const session = useSession();
  const [conversations, setConversations] = useState(initialConversations);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    const newConversationHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [...current, conversation];
      });
    };

    const updateConversationHandler = (conversation: FullConversationType) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages
            };
          }

          return currentConversation;
        })
      );
    };

    const removeConversationHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind('conversation:new', newConversationHandler);
    pusherClient.bind('conversation:update', updateConversationHandler);
    pusherClient.bind('conversation:remove', removeConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newConversationHandler);
      pusherClient.unbind('conversation:update', updateConversationHandler);
      pusherClient.unbind('conversation:remove', removeConversationHandler);
    };
  }, [pusherKey]);

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
