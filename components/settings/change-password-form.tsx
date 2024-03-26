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
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { User } from '@prisma/client';

interface ChangePasswordFormProps {
  user: User;
}

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
    path: ['confirmNewPassword'] // path of error
  });
const ChangePasswordForm = ({ user }: ChangePasswordFormProps) => {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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

            <Button type="submit">Update password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
