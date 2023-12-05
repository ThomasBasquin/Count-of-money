import { create } from "zustand";

const useBearStore = create((set) => ({
    search: "",
    setSearch: (search) => set({ search }),
    currentCrypto: {},
    setCurrentCrypto: (currentCrypto) => set({ currentCrypto }),
}));

export default useBearStore;