import { Fragment } from 'react';
import { LazyExoticComponent, lazy } from 'react';
import { Switch, Route, useLocation, Path } from 'wouter';
import { BreadCrumb } from '../components';

export type RouteType = {
  label: string;
  url: Path | Path[];
  sublinks?: RouteType[];
  Component?: LazyExoticComponent<() => JSX.Element>;
};

// All routes defined here
export const routes: RouteType[] = [
  {
    label: 'Monitoring',
    url: ['/', '/monitoring'],
    // Lazy loading the components for
    Component: lazy(() => import('./monitoring/dashboard-1')),
    sublinks: [
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

const Dashboards = () => {
  const [location] = useLocation();
  const locationLinks = location
    .split('/')
    .slice(1)
    .map((link, index) => {
      const base = location.split('/').splice(1, index).join('/');
      return { label: link, url: `${base ? '/' + base : ''}/${link}` };
    });

  return (
    <>
      <div className='px-4 sm:px-8'>
        <BreadCrumb links={locationLinks} />
      </div>
      <div className='px-4 sm:px-8'>
        <Switch>
          {routes.map(({ Component, ...route }) => {
            return (
              <Fragment key={route.label}>
                <Route path={route.url}>
                  {/* Currently checking if component is null as not all the routes are defined */}
                  {Component ? (
                    <Component />
                  ) : (
                    <h2 className='text-icon-white'>Not Yet implemented.</h2>
                  )}
                </Route>
                {route.sublinks &&
                  route.sublinks.map((subLink) => {
                    return (
                      <Route
                        key={subLink.label}
                        path={
                          (typeof route.url === 'string' ? route.url : route.url[1]) + subLink.url
                        }
                      >
                        {/* Currently checking if component is null as not all the routes are defined */}
                        {subLink.Component ? (
                          <subLink.Component />
                        ) : (
                          <h2 className='text-icon-white'>Not Yet implemented</h2>
                        )}
                      </Route>
                    );
                  })}
              </Fragment>
            );
          })}
          {/* 404 page if routes not defined */}
          <Route path='/:rest*'>
            {(params) => (
              <h3 className='text-icon-white'>{`Error 404, the page ${params.rest} does not exist!`}</h3>
            )}
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Dashboards;
