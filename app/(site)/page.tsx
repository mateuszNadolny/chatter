import AuthTabs from '@/components/auth/auth-tabs';
import { ThemeToggle } from '@/components/global/theme-toggle';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen lg:max-h-screen items-center justify-center pt-10  pb-10 lg:pt-0 lg:pb-0">
      <AuthTabs />
      <div className="absolute top-5 right-5 lg:fixed lg:top-10 lg:right-10">
        <ThemeToggle />
      </div>
    </main>
  );
}
