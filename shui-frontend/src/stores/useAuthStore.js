import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const token = localStorage.getItem("authToken");
const initUser = token ? jwtDecode(token) : null;

export const useAuthStore = create((set) => ({
  user: initUser,
  login: (user) => {
    set({ user: user });
  },
  logout: () => {
    set({ user: null });
  },
}));
