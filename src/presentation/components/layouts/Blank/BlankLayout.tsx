import { ReactNode } from 'react';

type BlankLayoutProps = {
  children?: ReactNode;
};

export const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <div className="flex bg-stone-50 items-center justify-center h-screen">
      {children}
    </div>
  );
};
