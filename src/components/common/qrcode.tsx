import React from 'react';
import { QrCode, Bitcoin } from 'lucide-react';

interface QRCodeProps {
  value?: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  className?: string;
  showPlaceholder?: boolean;
}

const QRCode: React.FC<Pick<QRCodeProps, 'size' | 'className' | 'showPlaceholder'>> = ({
  size = 200,
  className = '',
  showPlaceholder = false,
}) => {
  // In a real app, we would use a QR code generator library
  // For now, we'll use a placeholder with styling to match the design

  if (showPlaceholder) {
    return (
      <div 
        className={`flex items-center justify-center bg-primary border-2 border-secondary rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <QrCode size={size * 0.6} className="text-secondary-dark" />
      </div>
    );
  }
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      {/* In a real implementation, we would render an actual QR code here */}
      <div 
        className="w-full h-full grid grid-cols-10 grid-rows-10 bg-primary"
      >
        {Array.from({ length: 100 }).map((_, index) => {
          const random = Math.random() > 0.7;
          return (
            <div 
              key={index}
              className={`${random ? 'bg-secondary-dark' : 'bg-primary'}`}
            />
          );
        })}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-primary p-2 rounded-md">
          <Bitcoin size={24} className="text-accent" />
        </div>
      </div>
    </div>
  );
};

export default QRCode;