import { Fragment, useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { BreadCrumb, Nav } from '../components';
import { useUserContext } from '../context/UserContext';
import { routes } from './routes';

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
                <Route path={route.url} component={Component} />
                {route.sublinks &&
                  route.sublinks.map((subLink) => (
                    <Route
                      key={subLink.label}
                      path={route.url + subLink.url}
                      component={subLink.Component}
                    />
                  ))}
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
