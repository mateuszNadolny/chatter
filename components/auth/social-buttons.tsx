'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { signIn, useSession } from 'next-auth/react';

import { useToast } from '@/components/ui/use-toast';

import useLoadingStore from './auth-store';

import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SocialButtons = () => {
  const session = useSession();
  const router = useRouter();
  const { loading, setIsLoading } = useLoadingStore();
  const { toast } = useToast();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, router]);

  const handleOAuth = (provider: string) => {
    setIsLoading(true);

    signIn(provider, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: callback.error
          });
          setIsLoading(false);
        }

        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-[80%] md:w-[400px] flex flex-col items-center gap-3">
      <p className="text-sm hidden lg:flex text-muted-foreground">Or continue with</p>

      <div className="w-full flex gap-2">
        <Button
          className="w-full"
          variant="secondary"
          disabled={loading}
          onClick={() => handleOAuth('google')}>
          <FaGoogle className="h-[1.4rem] w-[1.4rem]" />
        </Button>
        <Button
          className="w-full"
          variant="secondary"
          disabled={loading}
          onClick={() => handleOAuth('github')}>
          <FaGithub className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </div>
    </div>
  );
};

export default SocialButtons;
