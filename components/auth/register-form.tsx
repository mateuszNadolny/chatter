'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import axios from 'axios';

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
  name: z.string().trim().min(3, {
    message: 'Minimum 3 characters'
  }),
  email: z.string().trim().email({
    message: 'Not a valid e-mail'
  }),
  password: z.string().trim().min(8, {
    message: 'Minimum 8 characters'
  })
});

const RegisterForm = () => {
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
      name: '',
      email: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .post('/api/register', values)
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response.data
        });
      })
      .then(() =>
        signIn('credentials', {
          ...values,
          redirect: false
        })
      )
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: callback.error
          });
        }

        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .catch((error) => toast({ title: 'Something went wrong', description: error.response.data }))
      .finally(() => setIsLoading(false));
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Register with username, email and password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              disabled={loading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <AuthInput type="text" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              disabled={loading}
              control={form.control}
              name="password"
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
              {loading && <LuLoader2 className="mr-2 h-[1.2rem] w-[1.2rem] animate-spin" />}
              {!loading && 'Register'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
