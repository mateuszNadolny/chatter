'use client';

import { useMemo } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import OtherUserAvatar from '../global/other-user-avatar';

import { BsThreeDots } from 'react-icons/bs';

import { Conversation, User } from '@prisma/client';

interface HeaderSettingsProps {
  conversation: Conversation;
  otherUser: User;
}

const ConversationHeaderSettings = ({ conversation, otherUser }: HeaderSettingsProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <BsThreeDots className="h-7 w-7" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center">
        <SheetHeader className="mb-10">
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription className="flex gap-2 flex-col items-center">
            {otherUser.name}
            <OtherUserAvatar user={otherUser} className="h-12 w-12" />
          </SheetDescription>
        </SheetHeader>
        <Button>Delete conversation</Button>
      </SheetContent>
    </Sheet>
  );
};

export default ConversationHeaderSettings;
