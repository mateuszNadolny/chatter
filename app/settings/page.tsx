import ProfileInfoForm from '@/components/settings/profile-info-form';
import getCurrentUser from '@/actions/getCurrentUser';

const SettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-[90%] lg:w-[40%]">
      <ProfileInfoForm user={user!} />
    </div>
  );
};

export default SettingsPage;
