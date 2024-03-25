import ChangePasswordForm from '@/components/settings/change-password-form';
import getCurrentUser from '@/actions/getCurrentUser';

const ChangePasswordPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-[90%] lg:w-[40%]">
      <ChangePasswordForm user={user!} />
    </div>
  );
};

export default ChangePasswordPage;
