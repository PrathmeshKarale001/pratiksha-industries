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
  maxWidth = '180px',
  height = '42px',
}: ClientLogoProps) {
  return (
    <div
      className={`client-logo-wrapper ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        height: typeof height === 'number' ? `${height}px` : height,
        position: 'relative',
      }}
    >
      <img
        src={client.logoPath}
        alt={`${client.name} logo`}
        loading="lazy"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          transition: 'transform 240ms ease',
        }}
      />
    </div>
  );
}
