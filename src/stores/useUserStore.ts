import { IUser } from "@/shared/models";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    user: IUser;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const userStore = create<UserState>((set) => ({
    user: {} as IUser,
    setUser: (user: IUser) => set({ user }),
    clearUser: () => set({ user: {} as IUser }),
}))

export const useUserStore = persist(userStore, { name: "user-authenticated", storage: createJSONStorage(() => sessionStorage) })