import { create } from 'zustand';

const useStore = create(set => ({
    searchString: '',
    setSearchString: (newString) => set({ searchString: newString }),
    searchStatus: false,
    setSearchStatus: (newStatus) => set({ searchStatus: newStatus }),
}));

export default useStore;