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
const ChangePasswordForm = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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
  return (
    <Card className="border-none shadow-none relative overflow-auto bg-transparent">
      <CardHeader className="mb-5 border-b pb-2">
        <CardTitle className="scroll-m-20  text-3xl font-semibold tracking-tight transition-colors">
          Change your password
        </CardTitle>
        <CardDescription>You can update your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onPasswordChangeSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="currentPassword"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your current password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your new password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Please confirm your new password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Update password
            </Button>
            <Button
              variant="link"
              type="button"
              onClick={() => router.push('/settings')}
              disabled={loading}>
              Want to change your profile info?
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
