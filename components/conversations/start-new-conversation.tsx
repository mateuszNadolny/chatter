import { Button } from '../ui/button';
import { BiSolidMessageAdd } from 'react-icons/bi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import StartNewConversationForm from './start-new-conversation-form';

const StartNewConversation = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex px-5 pb-5 border-b">
          <Button className="w-full flex gap-3">
            <BiSolidMessageAdd className="h-4 w-4" />
            Group Conversation
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start new conversation</DialogTitle>
        </DialogHeader>
        <StartNewConversationForm />
      </DialogContent>
    </Dialog>
  );
};

export default StartNewConversation;
