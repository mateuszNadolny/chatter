import AuthTabs from '@/components/auth/auth-tabs';
import { ThemeToggle } from '@/components/global/theme-toggle';

export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen items-center justify-center">
      <AuthTabs />
      <div className="fixed top-5 right-5 lg:top-10 lg:right-10">
        <ThemeToggle />
      </div>
    </main>
  );
}
