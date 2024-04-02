'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn, useSession } from 'next-auth/react';

import { useToast } from '@/components/ui/use-toast';

import useLoadingStore from './auth-store';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { AuthInput } from './auth-input';
import { LuLoader2 } from 'react-icons/lu';

const formSchema = z.object({
  email: z.string().trim().email({
    message: 'Not a valid e-mail'
  }),
  password: z.string().trim().min(8, {
    message: 'Minimum 8 characters'
  })
});

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const { loading, setIsLoading } = useLoadingStore();
  const { toast } = useToast();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    signIn('credentials', {
      ...values,
      redirect: false
    }).then((callback) => {
      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: callback.error
        });
        setIsLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        toast({
          title: '✅ Login successfull!'
        });
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with e-mail and password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              disabled={loading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <AuthInput type="email" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <AuthInput type="password" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />}
              {!loading && 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
