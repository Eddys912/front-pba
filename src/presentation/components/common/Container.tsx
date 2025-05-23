import { ReactNode } from 'react';

type ContainerProps = {
  children?: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <section className="container mx-auto px-4">{children}</section>;
};
