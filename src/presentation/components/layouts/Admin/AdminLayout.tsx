import { Outlet } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { AdminFooter } from './AdminFooter';

export const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <AdminHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
};
