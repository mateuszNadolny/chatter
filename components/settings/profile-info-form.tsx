'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import axios from 'axios';

import { CldUploadButton } from 'next-cloudinary';
import { BiSolidImageAdd } from 'react-icons/bi';
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
    .optional()
    .or(z.literal('')),
  website: z.string().url({ message: 'Invalid URL.' }).optional().or(z.literal(''))
});

interface ProfileInfoProps {
  user: User;
}

const ProfileInfoForm = ({ user }: ProfileInfoProps) => {
  const [loading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || '',
      displayMail: user.displayMail || false,
      bio: user.bio! || '',
      website: user.website! || ''
    },
    mode: 'onChange'
  });

  const handleUpload = (result: any) => {
    if (result.info.resource_type === 'image') {
      axios.post('/api/settings/update-image', {
        image: result.info.secure_url
      });
      window.location.reload();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error uploading file',
        description: 'The file you uploaded is not an image.'
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    axios
      .post('api/settings', values)
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.response.data
        });
      })
      .finally(() => {
        toast({
          title: '✅ Profile info!'
        });
        setIsLoading(false);
      });
    console.log(values);
  };

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
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="pwuadtua">
            <BiSolidImageAdd className="h-7 w-7 cursor-pointer" />
          </CldUploadButton>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-2">
            <FormField
              control={form.control}
              name="name"
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              <Button type="submit" disabled={loading}>
                Update profile
              </Button>
              {user.hashedPassword && (
                <Button
                  disabled={loading}
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
