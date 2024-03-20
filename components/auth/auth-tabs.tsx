import { TypewriterIntroText } from './typewriter-intro-text';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import LoginForm from './login-form';
import RegisterForm from './register-form';
import SocialButtons from './social-buttons';

const AuthTabs = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <TypewriterIntroText />
      <Tabs defaultValue="login" className="w-[80%] md:w-[400px]">
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
