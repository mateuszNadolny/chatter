'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const RegisterForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Register with username, email and password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1"></div>
        <div className="space-y-1"></div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default RegisterForm;
