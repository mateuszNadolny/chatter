'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with email and password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1"></div>
        <div className="space-y-1"></div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default LoginForm;
