import { Fragment, useEffect } from 'react';
import { LazyExoticComponent, lazy } from 'react';
import { Switch, Route, useLocation, Path } from 'wouter';
import { BreadCrumb, Nav } from '../components';
import { useUserContext } from '../context/UserContext';

export type RouteType = {
  label: string;
  url: Path;
  sublinks?: RouteType[];
  Component?: LazyExoticComponent<() => JSX.Element>;
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

const Dashboards = () => {
  const [location, setLocation] = useLocation();
  const locationLinks = location
    .split('/')
    .slice(1)
    .map((link, index) => {
      const base = location.split('/').splice(1, index).join('/');
      return { label: link, url: `${base ? '/' + base : ''}/${link}` };
    });

  const { userLoggedIn, currentUser } = useUserContext();

  useEffect(() => {
    if (!currentUser) return;
    let currentPath = location.split('/')[1];
    currentPath = currentPath ? currentPath : 'monitoring';

    if (currentPath === 'admin') {
      if (currentUser.roles.includes('admin')) return;
      setLocation('/not-authorized');
    }

    // Getting the current route and checking if the user is allowed to access the route
    if (!currentUser.allowed_dashboards.includes(currentPath)) {
      // Checking if the route exists, and redirecting to /not-authorized
      if (routes.find((route) => route.url === '/' + currentPath)) {
        setLocation('/not-authorized');
      }
    }
  }, [location, currentUser, setLocation]);

  return (
    <>
      {/* Shifted Nav to dashboard to only render if user is logged in */}
      {userLoggedIn && (
        <>
          <Nav />
          <div className='px-4 sm:px-8'>
            <BreadCrumb links={locationLinks} />
          </div>
        </>
      )}
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
                      <Route key={subLink.label} path={route.url + subLink.url}>
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
          <Route path='/not-authorized'>
            <h3 className='text-icon-white'>{`Error 401, You are not authorized to view the current page!`}</h3>
          </Route>
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
