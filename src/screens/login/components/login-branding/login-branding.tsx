import React from "react";
import "./styles/login-branding-styles.css";
import * as CONSTANTS from "../../constants/login-constants";

export const LoginBranding: React.FC = () => {
  return (
    <div className="login-branding-panel">
      <div className="branding-overlay"></div>
      <div className="branding-inner">
        <div className="branding-seal-wrapper">
          <div className="branding-seal">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
              <path d="M6 14h6" />
            </svg>
          </div>
          <div className="branding-edition">Institutional Portal v2.4</div>
        </div>

        <div className="branding-headings">
          <h1 className="branding-title">
            {CONSTANTS.LOGIN_CONSTANTS.INSTITUTION_NAME}
          </h1>
          <p className="branding-tagline">
            {CONSTANTS.LOGIN_CONSTANTS.INSTITUTION_TAGLINE}
          </p>
        </div>

        <div className="branding-features">
          <div className="branding-feature-item">
            <div className="feature-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <div className="feature-item-title">Multi-Campus Governance</div>
              <div className="feature-item-desc">
                Centralized class capacity, campus rosters, and faculty resource
                tracking.
              </div>
            </div>
          </div>
          <div className="branding-feature-item">
            <div className="feature-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="feature-item-title">
                Real-Time Period Attendance
              </div>
              <div className="feature-item-desc">
                Instant period roll calls with sick leaves, late stamps, and
                guardian notification.
              </div>
            </div>
          </div>

          <div className="branding-feature-item">
            <div className="feature-icon-box">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="feature-item-title">
                Strict Role-Based Security
              </div>
              <div className="feature-item-desc">
                Isolated dashboards for Administrators, Principals, Educators,
                Students & Parents.
              </div>
            </div>
          </div>
          <div className="branding-footer">
            <div className="branding-motto">
              {CONSTANTS.LOGIN_CONSTANTS.INSTITUTION_MOTTO}
            </div>
            <div className="branding-term">
              {CONSTANTS.LOGIN_CONSTANTS.ACADEMIC_YEAR}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
