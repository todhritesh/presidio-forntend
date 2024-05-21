import { create } from 'zustand';

type ProfileState = {
  userId: string | null;
  setUserId:(userId: string) => void;
};

export const useProfileState = create<ProfileState>((set) => ({
    userId: null,
    setUserId: (userId:string) => set(() => ({userId : userId })),
  }))