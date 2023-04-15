import create from 'zustand';

const useStore = create((set, get) => ({
  user: {},
  setUser: () => set((state) => ({ user: state.user })),
  removeAllBears: () => set({ user: {} }),
}));

export default useStore;
