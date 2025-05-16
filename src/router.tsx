import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from './presentation/components/layouts/Admin/AdminLayout';
import { BlankLayout } from './presentation/components/layouts/Blank/BlankLayout';
import { PublicLayout } from './presentation/components/layouts/Public/PublicLayout';
import { AdminMain } from './presentation/pages/admin/AdminMain';
import { Products } from './presentation/pages/admin/AdminProducts';
import { ReportDonations } from './presentation/pages/admin/AdminReportDonation';
import { Clients } from './presentation/pages/admin/AdminClients';
import { Login } from './presentation/pages/auth/Login';
import { Register } from './presentation/pages/auth/Register';
import NotFound from './presentation/pages/public/NotFound';
import { Main } from './presentation/pages/public/Main';
import { Employees } from './presentation/pages/admin/AdminEmployees';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [{ index: true, element: <Main /> }],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminMain /> },
      { path: 'products', element: <Products /> },
      { path: 'employees', element: <Employees /> },
      { path: 'clients', element: <Clients /> },
      { path: 'reports/donations', element: <ReportDonations /> },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: 'login', element: <BlankLayout children={<Login />} /> },
      { path: 'register', element: <BlankLayout children={<Register />} /> },
    ],
  },

  {
    path: '*',
    element: <BlankLayout children={<NotFound />} />,
  },
]);
