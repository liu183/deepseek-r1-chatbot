import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo-icon">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path fill="url(#gradient)" d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 26a12 12 0 1 1 0-24 12 12 0 0 1 0 24z"/>
          <path fill="url(#gradient)" d="M16 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8-6a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-12 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"/>
        </svg>
      </div>
      <span className="logo-text">DeepSeek</span>
    </div>
  );
};

export default Logo; 