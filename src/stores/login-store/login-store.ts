import { create } from "zustand";
import type { LoginState } from "../../screens/login/types/login-types";

export const useLoginStore = create<LoginState>((set, get) => ({
    formData: {
        email: '',
        password: '',
        rememberMe: false
    },
    errors: {},
    showPassword: false,
    isLoading: false,
    failedAttempts: 0,
    isLocked: false,
    lockRemainingSeconds: 0,
    lockTimerId: null,
    currentUser: null,
    setField: (field, value) => {
        set((state) => ({
            formData: { ...state.formData, [field]: value },
            errors: { ...state.errors, [field]: undefined, general: undefined }
        }));
    },
    toggleShowPassword: () => {
        set((state) => ({ showPassword: !state.showPassword }));
    },
    setErrors: (errors) => {
        set({ errors });
    },
    clearErrors: () => set({ errors: {} }),
    logout: () => {
        set({
            currentUser: null,
            formData: {
                email: '',
                password: '',
                rememberMe: false
            },
            errors: {}
        })
    },
    login: async () => {
        // ! Need to implement the login logic with backend service
        return true;
    },
    decrementLockTimer: () => {
        const { lockRemainingSeconds, lockTimerId } = get();
        if (lockRemainingSeconds <= 1) {
            if (lockTimerId) clearInterval(lockTimerId);
            set({
                isLocked: false,
                lockRemainingSeconds: 0,
                lockTimerId: null,
                failedAttempts: 0,
                errors: {}
            });
        } else {
            set({ lockRemainingSeconds: lockRemainingSeconds - 1 });
        }
    }
}));