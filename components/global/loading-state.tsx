import { LuLoader2 } from 'react-icons/lu';
const LoadingState = () => {
  return (
    <div className="fixed z-20 h-full w-full top-0 left-0 bg-background opacity-95 flex items-center justify-center">
      <LuLoader2 className="h-[100px] w-[100px] animate-spin" />
    </div>
  );
};

export default LoadingState;
