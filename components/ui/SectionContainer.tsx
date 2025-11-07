
import React, { forwardRef } from 'react';

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 ${className || ''}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
