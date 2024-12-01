import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  userId: string;
  username: string;
  email: string;
  name: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        userId: "",
        username: "",
        email: "",
        name: "",
      },
      setUser: (user) =>
        set(() => ({
          user: {
            userId: user.userId,
            username: user.username,
            email: user.email,
            name: user.name,
          },
        })),
      clearUser: () =>
        set(() => ({
          user: {
            userId: "",
            username: "",
            email: "",
            name: "",
          },
        })),
    }),
    {
      name: "user",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
