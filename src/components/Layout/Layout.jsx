import { Suspense } from 'react';
import AppBar from '../AppBar/AppBar.jsx';

const Layout = ({ children }) => {
  return (
    <main>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </main>
  );
};
export default Layout;
