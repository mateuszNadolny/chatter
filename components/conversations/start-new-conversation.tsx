'use client';

import { Button } from '../ui/button';
import { BiSolidMessageAdd } from 'react-icons/bi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const StartNewConversation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex px-5 pb-5 border-b">
          <Button className="w-full flex gap-3">
            <BiSolidMessageAdd className="h-4 w-4" />
            New Conversation
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start new conversation</DialogTitle>
          <DialogDescription>Tu bedzie formularz</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StartNewConversation;
