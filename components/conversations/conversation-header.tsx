'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useOtherUser from '@/hooks/useOtherUser';

import OtherUserAvatar from '../global/other-user-avatar';
import ConversationHeaderSettings from './conversation-header-settings';
import { IoIosArrowBack } from 'react-icons/io';

import { Conversation, User } from '@prisma/client';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ConversationHeader = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();

  return (
    <div className="w-full h-[7%] border-b px-5 flex justify-between items-center">
      <div className="flex items-center gap-3 lg:gap-4">
        <IoIosArrowBack
          className="lg:hidden h-5 w-5 mr-2"
          onClick={() => router.push('/conversations')}
        />
        <OtherUserAvatar user={otherUser} className="lg:h-12 lg:w-12" />
        <h3 className="font-bold">{otherUser.name}</h3>
      </div>
      <ConversationHeaderSettings />
    </div>
  );
};

export default ConversationHeader;
