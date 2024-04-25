'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import axios from 'axios';

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { User } from '@prisma/client';

const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().trim(),
    newPassword: z.string().trim().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, { message: 'Password must be at least 8 characters.' })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword']
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password can't be same as current one",
    path: ['newPassword']
  });

interface PasswordChangeProps {
  user: User;
}

const ChangePasswordForm = ({ user }: PasswordChangeProps) => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const isTestAccount = user.email === 'test.test@mail.com';
  let header = <></>;

  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    mode: 'onChange'
  });

  function onPasswordChangeSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    setIsLoading(true);
    axios
      .post('/api/settings/change-password', values)
      .then((response) => {
        if (response.status === 400) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong'
          });
        } else {
          toast({
            title: '✅ Password has been updated!',
            description: 'You will be logged out in a couple of seconds'
          });
          setIsLoading(false);
          setTimeout(() => {
            signOut();
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: error.response.data.error
          });
        } else {
          console.error(error);
        }
        setIsLoading(false);
      });
  }

  if (isTestAccount) {
    header = (
      <CardHeader className="mb-5 border-b pb-2">
        <CardTitle className="scroll-m-20 text-lg lg:text-3xl font-semibold tracking-tight transition-colors">
          {`Sorry, no luck for you :(`}
        </CardTitle>
        <CardDescription className="text-xs lg:text-sm">{`You are using test account, therefore you can't change password of this profile. But feel free to check the form UI and feel the magic of exciting profile updates!`}</CardDescription>
      </CardHeader>
    );
  } else {
    header = (
      <CardHeader className="mb-5 border-b pb-2">
        <CardTitle className="scroll-m-20 text-lg lg:text-3xl font-semibold tracking-tight transition-colors">
          Profile
        </CardTitle>
        <CardDescription className="text-xs lg:text-sm">
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
    );
  }
  return (
    <Card className="border-none shadow-none relative overflow-auto bg-transparent">
      {header}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onPasswordChangeSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="currentPassword"
              disabled={loading || isTestAccount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs lg:text-sm">
                    Please enter your current password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              disabled={loading || isTestAccount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs lg:text-sm">
                    Please enter your new password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              disabled={loading || isTestAccount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs lg:text-sm">
                    Please confirm your new password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="text-[10px] lg:text-sm"
              disabled={loading || isTestAccount}>
              Update password
            </Button>
            <Button
              variant="link"
              type="button"
              onClick={() => router.push('/settings')}
              disabled={loading}
              className="text-[10px] lg:text-sm">
              Want to change your profile info?
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
