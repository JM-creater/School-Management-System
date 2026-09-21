import React from 'react'
import { useLoginStore } from '../../../../stores/login-store/login-store'
import * as CONSTANTS from '../../constants/login-constants'
import './styles/account-locked-banner-styles.css'

export const AccountLockedBanner: React.FC = () => {
  const isLocked = useLoginStore((state) => state.isLocked);
  const remaining = useLoginStore((state) => state.lockRemainingSeconds);

  if (!isLocked) return null;

  return (
    <div className='login-locked-banner' role='alert' aria-live='assertive'>
      <div className='login-locked-icon'>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <div className='login-locked-content'>
        <div className='login-locked-title'>Security Lockout Active</div>
        <div className='login-locked-text'>Maximum failed credential attempts exceeded. For academic record safety, authentication is suspended for{' '} <strong>{remaining}s</strong>.</div>
      </div>
      <div className='login-locked-support'>
        Need immediate unlock? Contact campus help desk at{' '}
        <a href={`mailto:${CONSTANTS.LOGIN_CONSTANTS.SUPPORT_EMAIL}`}>{CONSTANTS.LOGIN_CONSTANTS.SUPPORT_EMAIL}</a>
      </div>
    </div>
  )
}
