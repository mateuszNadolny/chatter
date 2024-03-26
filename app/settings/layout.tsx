import ReturnButton from '@/components/settings/return-button';
import { ThemeToggle } from '@/components/global/theme-toggle';

export default function SettingsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col items-center pt-4 lg:pt-8">
      <div className="w-full flex items-center justify-between px-5 lg:px-[15%]">
        <ReturnButton />
        <ThemeToggle />
      </div>

      {children}
    </div>
  );
}
