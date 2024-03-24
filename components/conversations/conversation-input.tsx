'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import axios from 'axios';

import useConversation from '@/hooks/useConversation';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BiSolidImageAdd } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';

const formSchema = z.object({
  message: z.string().trim().min(1)
});

const ConversationInput = () => {
  const conversationId = useConversation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post('/api/messages', { values, conversationId });
    form.reset({ message: '' });
  }

  return (
    <div className="border-t w-full h-[7%]">
      <div className="px-5 w-full h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full h-full items-center">
            <BiSolidImageAdd className="h-7 w-7 cursor-pointer" />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Type you message..."
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
