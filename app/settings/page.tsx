import getCurrentUser from '@/actions/getCurrentUser';

import ReturnButton from '@/components/settings/return-button';
import ProfileInfoForm from '@/components/settings/profile-info-form';
import { ThemeToggle } from '@/components/global/theme-toggle';

const SettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-full h-screen max-h-screen flex flex-col items-center pt-6 lg:pt-20">
      <div className="w-full flex items-center justify-between px-5 lg:px-[15%]">
        <ReturnButton />
        <ThemeToggle />
      </div>

      <div className="w-[90%] lg:w-[60%]">
        <ProfileInfoForm user={user!} />
      </div>
    </div>
  );
};

export default SettingsPage;
