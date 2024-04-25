'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import axios from 'axios';

import getUsers from '@/actions/getUsers';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { MultiSelect } from '@/components/ui/multi-select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useToast } from '@/components/ui/use-toast';
import { User } from '@prisma/client';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  members: z.string().array().min(2, {
    message: 'Please select at least 2 users.'
  })
});

interface StartNewConversationFormProps {
  setOpen: (open: boolean) => void;
}

const StartNewConversationForm = ({ setOpen }: StartNewConversationFormProps) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      members: []
    }
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setAllUsers(users);
    };

    fetchUsers();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        isGroup: true,
        members: values.members,
        name: values.name
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response.data
        });
      })
      .then(() => {
        router.refresh();
      })
      .finally(() => {
        setIsLoading(false);
        setOpen(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={loading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group name</FormLabel>
              <FormControl>
                <Input placeholder="Dunder Mifflin Groupchat..." {...field} />
              </FormControl>
              <FormDescription className="text-xs lg:text-sm">
                This is name of your groupchat.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="members"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select members</FormLabel>
              <MultiSelect
                selected={field.value}
                options={allUsers.map((user) => ({
                  value: user.id!,
                  label: user.name!
                }))}
                {...field}
                className="sm:w-[510px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default StartNewConversationForm;
