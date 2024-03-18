import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import LoginForm from './login-form';
import RegisterForm from './register-form';
import SocialButtons from './social-buttons';

const AuthTabs = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-5">
      <Image src="/logo.png" alt="Chatter" width={100} height={100} />
      <Tabs defaultValue="login" className="w-[80%] lg:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <SocialButtons />
    </div>
  );
};

export default AuthTabs;
