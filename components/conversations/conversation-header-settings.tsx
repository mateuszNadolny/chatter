'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import OtherUserAvatar from '../global/other-user-avatar';
import GroupAvatar from '../global/group-avatar';
import { BsThreeDots } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

import { User } from '@prisma/client';
import { FullConversationType } from '@/types';

interface HeaderSettingsProps {
  conversation: FullConversationType;
  otherUser: User;
}

const ConversationHeaderSettings = ({ conversation, otherUser }: HeaderSettingsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  const groupLength = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.userIds.length} members`;
    } else {
      return '';
    }
  }, [conversation]);

  const handleDeleteConversation = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversation.id}`)
      .then(() => {
        router.push('/conversations');
        router.refresh();
      })
      .finally(() => setIsLoading(false));
  }, [router, conversation]);

  return (
    <Sheet>
      <SheetTrigger>
        <BsThreeDots className="h-7 w-7" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center">
        <SheetHeader className="mb-10">
          <SheetTitle className="text-center">{title}</SheetTitle>
          <SheetDescription className="flex gap-2 flex-col items-center">
            {!conversation.isGroup && <OtherUserAvatar user={otherUser} className="h-20 w-20" />}
            {conversation.isGroup && (
              <GroupAvatar users={conversation.users} className="h-20 w-20" />
            )}
            {otherUser.displayMail && !conversation.isGroup && <p>{otherUser.email}</p>}
            {otherUser.bio && !conversation.isGroup && <p>{otherUser.bio}</p>}
            {groupLength && <p className="text-sm text-primary pt-10">{groupLength}</p>}

            {conversation.isGroup &&
              conversation.users.map((user) => <p key={user.id}>{user.name}</p>)}
          </SheetDescription>
        </SheetHeader>
        <AlertDialog>
          <AlertDialogTrigger asChild className="absolute bottom-10">
            <Button variant="destructive" disabled={isLoading}>
              <MdDeleteForever className="h-5 w-5 mr-2" />
              Delete conversation
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your conversation and
                remove conversation data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild onClick={handleDeleteConversation} disabled={isLoading}>
                <Button variant="destructive">Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetContent>
    </Sheet>
  );
};

export default ConversationHeaderSettings;
