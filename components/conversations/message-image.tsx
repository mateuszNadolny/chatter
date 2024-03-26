import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface MessageImageProps {
  image: string;
}

const MessageImage = ({ image }: MessageImageProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Image
            alt="Image"
            height="288"
            width="288"
            src={image}
            className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
          />
        </DialogTrigger>
        <DialogContent>
          <Image
            alt="Image"
            height="500"
            width="500"
            src={image}
            className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageImage;
