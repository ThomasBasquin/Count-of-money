import { create } from 'zustand';

const useStore = create(set => ({
    searchString: '',
    setSearchString: (newString) => set({ searchString: newString }),
    searchStatus: false,
    setSearchStatus: (newStatus) => set({ searchStatus: newStatus }),
    user: {},
    setUser: (newUser) => set({ user: newUser }),
}));

export default useStore;