'use client';

import React from 'react';
import { ClientItem } from '@/content/clients';

interface ClientLogoProps {
  client: ClientItem;
  className?: string;
  forceColor?: boolean;
  maxWidth?: string | number;
  height?: string | number;
}

export default function ClientLogo({
  client,
  className = '',
  forceColor = false,
  maxWidth = '180px',
  height = '42px',
}: ClientLogoProps) {
  return (
    <div
      className={`client-logo-wrapper ${className}`}
      aria-label={`${client.name} logo`}
      role="img"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        height: typeof height === 'number' ? `${height}px` : height,
        transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        filter: forceColor ? 'none' : 'grayscale(1) brightness(1.2) opacity(0.82)',
        transform: 'scale(1)',
      }}
      dangerouslySetInnerHTML={{ __html: client.logoSvg }}
    />
  );
}
