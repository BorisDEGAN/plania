"use client";

import { IUser } from "@/shared/models";
import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const authUserState = atom({
    key: 'auth-user',
    default: <IUser>{},
    effects_UNSTABLE: [persistAtom],
})

export const authUserSelector = selector({
    key: 'set-auth-user',
    get: ({ get }) => get(authUserState),
    set: ({ set }, newValue) => {
        set(authUserState, {
            ...newValue
        });
    },
})