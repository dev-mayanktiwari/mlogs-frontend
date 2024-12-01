import { User } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User;
  setUser: (user: NonNullable<User>) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, // Initialize user as `null`
      setUser: (user) =>
        set(() => ({
          user,
        })),
      clearUser: () =>
        set(() => ({
          user: null,
        })),
    }),
    {
      name: "user-storage", // Key for localStorage
      partialize: (state) => ({ user: state.user }), // Persist only the user field
    }
  )
);

export default useUserStore;
