import { create } from 'zustand';

const useStore = create(set => ({
    searchString: '',
    setSearchString: (newString) => set({ searchString: newString }),
}));

export default useStore;