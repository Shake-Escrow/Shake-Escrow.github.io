import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  children,
  bgColor = 'bg-primary-light',
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgColor} ${className}`}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default Section;