import { Suspense } from 'react';

const Layout = ({ children }) => {
  return (
    <main>
      <Suspense fallback={null}>{children}</Suspense>
    </main>
  );
};
export default Layout;
