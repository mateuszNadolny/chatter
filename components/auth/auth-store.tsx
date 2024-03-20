import create from 'zustand';

interface LoadingState {
  loading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingState>()((set) => ({
  loading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ loading: isLoading }))
}));

export default useLoadingStore;
