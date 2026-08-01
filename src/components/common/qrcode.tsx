// src/components/common/qrcode.tsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  className?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  marginSize?: number;
  title?: string;
  logoSrc?: string;
  logoSize?: number;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  bgColor = '#ffffff',
  fgColor = '#000000',
  className = '',
  level = 'M',
  marginSize = 2,
  title,
  logoSrc,
  logoSize,
}) => {
  const resolvedLogoSize = logoSize ?? Math.round(size * 0.2);

  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      level={level}
      marginSize={marginSize}
      className={className}
      title={title}
      imageSettings={
        logoSrc
          ? {
              src: logoSrc,
              height: resolvedLogoSize,
              width: resolvedLogoSize,
              excavate: true,
            }
          : undefined
      }
    />
  );
};

export default QRCode;