import { IUser } from "@/shared/models";
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: {} as IUser,
    setUser: (user: IUser) => set({ user }),
}))