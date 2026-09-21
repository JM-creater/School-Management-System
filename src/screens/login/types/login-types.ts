export type UserRole = 'admin' | 'principal' | 'teacher' | 'student' | 'parent';

export type UserStatus = 'active' | 'notActive';

export interface AuthUser {
    id: number;
    email: string;
    password?: string;
    role: UserRole;
    status: UserStatus;
    fullName: string;
    displayName: string;
    campusName: string;
    campusId: number;
    employeeCode?: string;
    studentCode?: string;
    parentCode?: string;
    designation?: string;
    avatarUrl?: string;
    failedLoginAttempts: number;
    accountLockedUntil: string | null;
    lastLogin: string | null;
};

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
};

export interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
};

export interface LoginState {
    formData: LoginFormData;
    errors: LoginFormErrors;
    showPassword: boolean;
    isLoading: boolean;
    failedAttempts: number;
    isLocked: boolean;
    lockRemainingSeconds: number;
    lockTimerId: ReturnType<typeof setInterval> | null;
    currentUser: AuthUser | null,
    setField: (field: keyof LoginFormData, value: string | boolean) => void;
    toggleShowPassword: () => void;
    setErrors: (errors: LoginFormErrors) => void;
    clearErrors: () => void;
    login: () => Promise<boolean>;
    logout: () => void;
    decrementLockTimer: () => void;
};

export interface LoginAuthContextType {
    currentUser: AuthUser | null;
    isAuthenticated: boolean;
    role: string | null;
    login: () => Promise<boolean>;
    logout: () => void;
}