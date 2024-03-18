import AuthTabs from '@/components/auth/auth-tabs';
import { ThemeToggle } from '@/components/global/theme-toggle';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthTabs />
      <div className="fixed top-10 right-10">
        <ThemeToggle />
      </div>
    </main>
  );
}
