import type { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen">{children}</div>
  );
}
