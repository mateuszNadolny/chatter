'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import axios from 'axios';

import useConversation from '@/hooks/useConversation';

import { useToast } from '@/components/ui/use-toast';
import { CldUploadButton } from 'next-cloudinary';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BiSolidImageAdd } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';

const formSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1)
    .max(200, { message: 'Message must be less than 200 characters.' })
});

const ConversationInput = () => {
  const { conversationId } = useConversation();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    axios.post('/api/messages', { ...values, conversationId: conversationId });
    form.reset({ message: '' });
  };

  const handleUpload = (result: any) => {
    if (result.info.resource_type === 'image') {
      axios.post('/api/messages', {
        image: result.info.secure_url,
        conversationId: conversationId
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error uploading file',
        description: 'The file you uploaded is not an image.'
      });
    }
  };

  return (
    <div className="border-t w-full h-[10%]">
      <div className="flex gap-2 px-5 w-full h-full">
        <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="pwuadtua">
          <BiSolidImageAdd className="h-7 w-7 cursor-pointer" />
        </CldUploadButton>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full h-full items-center">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Type your message..."
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon">
              <IoSend />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConversationInput;
