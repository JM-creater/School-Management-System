import React from "react";
import "./styles/login-styles.css";
import { LoginBranding } from "./components/login-branding/login-branding";
import { LoginForm } from "./components/login-form/login-form";

export const LoginScreen: React.FC = () => {
  return (
    <div className="login-page-container">
      <div className="login-main-card">
        <LoginBranding />

        <div className="login-interactive-panel">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
