import { BreadCrumb, Nav } from './components';
import Dashboard_1 from './dashboards/monitoring/dashboard-1';
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <div className='app bg-card-dark flex flex-col gap-4 min-h-screen'>
        <Nav />
        <div className='px-4 sm:px-8'>
          <BreadCrumb
            links={[
              { label: 'Monitoring', url: '' },
              { label: 'Dashboard 1', url: '' },
            ]}
          />
        </div>
        <div className='px-4 sm:px-8'>
          <Dashboard_1 />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
