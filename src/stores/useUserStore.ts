import { IUser } from "@/shared/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    user: IUser;
    setUser: (user: IUser) => void;
}

export const userStore = create<UserState>((set) => ({
    user: {} as IUser,
    setUser: (user: IUser) => set({ user }),
}))

export const useUserStore = persist(userStore, { name: "user-authenticated" })