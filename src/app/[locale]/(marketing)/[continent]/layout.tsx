import type { ReactNode } from 'react';

export default function ContinentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="continent-layout">
      {children}
    </div>
  );
}
