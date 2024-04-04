import dynamic from 'next/dynamic';

import getCurrentUser from '../../actions/getCurrentUser';

// ADDING DYNAMIC IMPORT TO RESOLVE ISSUE COMING FROM APP BUILD (NPM RUN BUILD)
// https://github.com/vercel/next.js/issues/58576
// TODO: remove dynamic imports after Next releases fix of the issue

// import ProfileInfoForm from '../../components/settings/profile-info-form';
const ProfileInfoForm = dynamic(() => import('../../components/settings/profile-info-form'), {
  ssr: false
});

const SettingsPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-[90%] lg:w-[40%]">
      <ProfileInfoForm user={user!} />
    </div>
  );
};

export default SettingsPage;
