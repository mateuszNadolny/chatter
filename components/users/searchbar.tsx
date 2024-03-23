'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoSearch } from 'react-icons/io5';

import { User } from '@prisma/client';

const formSchema = z.object({
  query: z.string().trim()
});

interface SearchbarProps {
  users: User[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Searchbar = ({ users, setFilteredUsers }: SearchbarProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { query } = values;
    const filtered = users.filter((user) => user.name!.toLowerCase().includes(query.toLowerCase()));
    setFilteredUsers(filtered);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-6 border-b">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full max-w-sm items-center space-x-3 px-5">
                  <Input {...field} type="text" placeholder="Search..." className="w-4/5" />
                  <Button type="submit" size="icon" className="w-1/5">
                    <IoSearch />
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="pl-5" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default Searchbar;
