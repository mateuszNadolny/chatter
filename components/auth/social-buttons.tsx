import { Button } from '../ui/button';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SocialButtons = () => {
  return (
    <div className="w-[80%] lg:w-[400px] flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">Or continue with</p>
      <div className="w-full flex gap-2">
        <Button className="w-full" variant="secondary">
          <FaGoogle className="h-[1.4rem] w-[1.4rem]" />
        </Button>
        <Button className="w-full" variant="secondary">
          <FaGithub className="h-[1.4rem] w-[1.4rem]" />
        </Button>
      </div>
    </div>
  );
};

export default SocialButtons;
