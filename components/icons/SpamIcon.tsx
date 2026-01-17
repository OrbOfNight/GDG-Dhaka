
import React from 'react';

export const SpamIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <path d="m13.29 13.29 2.12 2.12" />
        <path d="m2 16 3-3" />
        <path d="m22 8-3 3" />
        <path d="m16 2 3 3" />
        <path d="m8 22-3-3" />
    </svg>
);
