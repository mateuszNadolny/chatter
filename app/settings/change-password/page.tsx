import dynamic from 'next/dynamic';

import getCurrentUser from '@/actions/getCurrentUser';

// ADDING DYNAMIC IMPORT TO RESOLVE ISSUE COMING FROM APP BUILD (NPM RUN BUILD)
// https://github.com/vercel/next.js/issues/58576
// TODO: remove dynamic imports after Next releases fix of the issue

// import ChangePasswordForm from '@/components/settings/change-password-form';

const ChangePasswordForm = dynamic(() => import('@/components/settings/change-password-form'), {
  ssr: false
});

const ChangePasswordPage = async () => {
  const user = await getCurrentUser();
  return (
    <div className="w-[90%] lg:w-[40%]">
      <ChangePasswordForm user={user!} />
    </div>
  );
};

export default ChangePasswordPage;
