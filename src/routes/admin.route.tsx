import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const DashboardPage = lazy(
  () => import(/* webpackChunkName: 'dashboard.page' */ '@app/pages/dashboard'),
);

const CategoriesPage = lazy(
  () => import(/* webpackChunkName: 'admin.categories.page' */ '@app/pages/admin/categories'),
);

const NotFoundPage = lazy(
  () => import(/* webpackChunkName: 'not-found.page' */ '@app/pages/not-found'),
);

export const adminRoutes: RouteProps[] = [
  {
    children: <DashboardPage />,
    path: '/dashboard',
  },
  {
    children: <CategoriesPage />,
    path: '/admin/categories',
  },
  {
    children: <NotFoundPage />,
    path: '/404',
  },
];
