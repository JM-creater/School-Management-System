import React from "react";
import { AccountLockedBanner } from "../account-locked-banner/account-locked-banner";
import { useLoginStore } from "../../../../stores/login-store/login-store";
import { useNavigate } from "react-router-dom";
import "./styles/login-form-styles.css";

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const formData = useLoginStore((state) => state.formData);
    const showPassword = useLoginStore((state) => state.showPassword);
    const errors = useLoginStore((state) => state.errors);
    const isLoading = useLoginStore((state) => state.isLoading);
    const isLocked = useLoginStore((state) => state.isLocked);
    const setField = useLoginStore((state) => state.setField);
    const toggleShowPassword = useLoginStore((state) => state.toggleShowPassword);

    const handleSubmit = (e: React.FormEvent) => {
        // ! Implement the logic login here
        e.preventDefault();
    };

    return (
        <div className="login-form-wrapper">
            <div className="login-form-header">
                <h2 className="login-form-title">Academic Portal Sign In</h2>
                <p className="login-form-subtitle">
                    Enter your institutional credentials to access your administrative
                    workspace.
                </p>
            </div>

            <AccountLockedBanner />

            {errors.general && (
                <div className="alert alert-danger" role="alert">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{errors.general}</span>
                </div>
            )}

            <form onSubmit={(e) => handleSubmit(e)} className="login-form" noValidate>
                <div className="form-group">
                    <label
                        htmlFor="login-email"
                        className="form-label form-label-required"
                    >
                        Institutional Email Address
                    </label>
                    <div className="input-with-icon">
                        <span className="input-icon">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <input
                            id="login-email"
                            type="email"
                            disabled={isLocked || isLoading}
                            value={formData.email}
                            onChange={(e) => setField('email', e.target.value)}
                            placeholder="e.g. j.smith@apexacademy.edu"
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                            autoComplete="email"
                            required
                        />
                    </div>
                    {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="login-password"
                            className="form-label form-label-required"
                        >
                            Password
                        </label>
                        <a
                            onClick={(e: React.FormEvent) => {
                                e.preventDefault();
                                // ! need to implement message box for this
                            }}
                            className="login-forgot-link"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <div className="input-with-icon">
                        <span className="input-icon">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            disabled={isLocked || isLoading}
                            value={formData.password}
                            onChange={(e) => setField('password', e.target.value)}
                            placeholder="Enter institutional password"
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle-btn"
                            onClick={toggleShowPassword}
                            title={showPassword ? 'Hide Password' : 'Show Password'}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                    <line x1="2" y1="2" x2="22" y2="22" />
                                </svg>
                            ) : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && <span className="form-error">{errors.password}</span>}
                </div>

                <div
                    className="flex justify-between items-center"
                    style={{ margin: "var(--space-3) 0 var(--space-5)" }}
                >
                    <label className="form-check">
                        <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) => setField('rememberMe', e.target.checked)}
                            disabled={isLocked || isLoading}
                        />
                        <span>Remember this device</span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLocked || isLoading}
                    className="btn btn-primary btn-lg login-submit-btn"
                >
                    {isLoading ? (
                        <React.Fragment>
                            <span className="spinner"></span>
                            <span>Authenticating Directory...</span>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <span>Sign In to Campus Workspace</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </React.Fragment>
                    )}
                </button>

                <div className="login-register-prompt">
                    <span>New staff, faculty member or enrolled student?</span>{' '}
                    <button type="button" className="btn-link" onClick={() => navigate('/register')}>Create an Account / Register</button>
                </div>
            </form>
        </div>
    );
};
