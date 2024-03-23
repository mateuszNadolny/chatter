'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import useOtherUser from '@/hooks/useOtherUser';

import OtherUserAvatar from '../global/other-user-avatar';
import ConversationHeaderSettings from './conversation-header-settings';

import { Conversation, User } from '@prisma/client';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);

  return (
    <div className="w-full h-[70px] border-b px-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <OtherUserAvatar user={otherUser} className="h-12 w-12" />
        <h3 className="font-bold">{otherUser.name}</h3>
      </div>
      <ConversationHeaderSettings />
    </div>
  );
};

export default ConversationHeader;
