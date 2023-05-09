import { LazyExoticComponent, lazy } from 'react';
import { Path } from 'wouter';

export type RouteType = {
  label: string;
  url: Path;
  sublinks?: RouteType[];
  Component?:
    | LazyExoticComponent<() => JSX.Element>
    | LazyExoticComponent<(params: any) => JSX.Element>;
  hidden?: boolean;
};

// All routes defined here
export const routes: RouteType[] = [
  {
    label: 'Admin',
    url: '/admin',
    Component: lazy(() => import('./admin')),
  },
  {
    label: 'Admin Tab',
    url: '/admin/:tab',
    Component: lazy(() => import('./admin')),
    hidden: true,
  },
  {
    label: 'Edit Team',
    url: '/admin/teams/edit/:name',
    Component: lazy(() => import('./admin/teams/EditTeam')),
    hidden: true,
  },
  {
    label: 'Team Detail',
    url: '/admin/teams/:name',
    Component: lazy(() => import('./admin/teams/TeamDetail')),
    hidden: true,
  },
  {
    label: 'Device Detail',
    url: '/admin/devices/:device_id',
    Component: lazy(() => import('./admin/devices/DeviceDetail')),
    hidden: true,
  },
  {
    label: 'Login',
    url: '/login',
    Component: lazy(() => import('./login')),
    hidden: true,
  },
  {
    label: 'Main',
    url: '/',
    Component: lazy(() => import('./monitoring/dashboard-1')),
    hidden: true,
  },
  {
    label: 'Monitoring',
    url: '/monitoring',
    // Lazy loading the components for
    Component: lazy(() => import('./monitoring/dashboard-1')),
    sublinks: [
      {
        label: 'NoC View',
        url: '/noc-view',
        Component: lazy(() => import('./monitoring/dashboard-1')),
      },
      {
        label: 'Interface Stats',
        url: '/interface-stats',
        Component: lazy(() => import('./monitoring/interface-stats')),
      },
      {
        label: 'Application Usage By App',
        url: '/application-usage-by-app',
        Component: lazy(() => import('./monitoring/application-usage-by-app')),
      },
      {
        label: 'Application Usage By Device',
        url: '/application-usage-by-device',
      },
      {
        label: 'Device Details',
        url: '/device-details',
      },
      {
        label: 'Certificate Details',
        url: '/certificate-details',
      },
      {
        label: 'License Details',
        url: '/license-details',
      },
      {
        label: 'Alarm Details',
        url: '/alarm-details',
        Component: lazy(() => import('./monitoring/alarm-details')),
      },
      {
        label: 'Realtime Tunnel Stats',
        url: '/realtime-tunnel-stats',
      },
      {
        label: 'Device Status',
        url: '/device-status',
      },
      {
        label: 'Network Status',
        url: '/network-status',
      },
    ],
  },
  {
    label: 'Reporting',
    url: '/reporting',
    sublinks: [
      {
        label: 'DPI On-Demand Troubleshooting',
        url: '/dpi-on-demand-troubleshooting',
      },
      {
        label: 'Generate Utilization and Uptime Report',
        url: '/generate-utilization-and-uptime-report',
      },
      {
        label: 'Interface Stats By Service Hours',
        url: '/interface-stats-by-service-hours',
      },
      {
        label: 'Link Downtime Report',
        url: '/link-downtime-report',
        Component: lazy(() => import('./reporting/link-downtime-report')),
      },
      {
        label: 'Link Utilization Report',
        url: '/link-utilization-report',
      },
      {
        label: 'Top Talkers Report',
        url: '/top-talkers-report',
      },
      {
        label: 'Tunnel Stats',
        url: '/tunnel-stats',
      },
      {
        label: 'Uptime Report',
        url: '/uptime-report',
        Component: lazy(() => import('./reporting/uptime-report')),
      },
    ],
  },
  {
    label: 'Static Data',
    url: '/static-data',
  },
  {
    label: 'User guide',
    url: '/user-guide',
  },
];
