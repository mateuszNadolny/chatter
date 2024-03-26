'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import OtherUserAvatar from '@/components/global/other-user-avatar';
import ChangePasswordForm from './change-password-form';
import { useToast } from '@/components/ui/use-toast';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().trim().min(3, {
    message: 'Username must be at least 3 characters.'
  }),
  displayMail: z.boolean(),
  bio: z
    .string()
    .trim()
    .min(3, {
      message: 'Bio must be at least 3 characters.'
    })
    .max(100, { message: 'Bio must be less than 100 characters.' })
    .optional(),
  website: z.string().url({ message: 'Invalid URL.' }).optional()
});

interface ProfileInfoProps {
  user: User;
}

const ProfileInfoForm = ({ user }: ProfileInfoProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name!,
      displayMail: user.displayMail,
      bio: user.bio!,
      website: user.website!
    },
    mode: 'onChange'
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="border-none shadow-none relative overflow-auto bg-transparent relative">
      <CardHeader className="mb-5 border-b pb-2">
        <CardTitle className="scroll-m-20  text-3xl font-semibold tracking-tight transition-colors">
          Profile
        </CardTitle>
        <CardDescription>This is how others will see you on the site.</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Image</Label>
        <div className="flex gap-3 mb-4 mt-2">
          <OtherUserAvatar user={user} className="w-10 h-10" />
          <Button variant="outline" size="sm">
            Update image
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={user.name!} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym.{' '}
                    <br />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayMail"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Display e-mail</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormDescription>
                      Display your e-mail adress to people you chat with
                    </FormDescription>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={user.bio! || 'I like funny cat videos'}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Tell us a little bit about yourself</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder={user.website! || 'example.com'} {...field} />
                  </FormControl>
                  <FormDescription>Add link to your website</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit">Update profile</Button>
              {user.hashedPassword && (
                <Button
                  variant="link"
                  type="button"
                  onClick={() => router.push('/settings/change-password')}>
                  Want to change your password?
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoForm;
