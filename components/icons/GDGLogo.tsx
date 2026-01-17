
import React from 'react';

export const GDGLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 450 100"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path fill="#4285F4" d="M37.5 19.5L52.5 4.5 52.5 34.5z"></path>
      <path fill="#EA4335" d="M15 19.5L.0 34.5 .0 4.5z"></path>
      <path fill="#FBBC05" d="M37.5 52.5l15-15-15-15z"></path>
      <path fill="#34A853" d="M15 52.5L.0 37.5 15 22.5z"></path>
    </g>
    <text
      x="70"
      y="38"
      fontFamily="Arial, sans-serif"
      fontSize="32"
      fontWeight="bold"
      fill="#E2E8F0"
    >
      Google Developer Groups
    </text>
    <text
      x="70"
      y="75"
      fontFamily="Arial, sans-serif"
      fontSize="28"
      fill="#94A3B8"
    >
      Dhaka
    </text>
  </svg>
);
