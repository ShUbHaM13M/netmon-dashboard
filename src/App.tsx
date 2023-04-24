import { BreadCrumb, Nav } from './components';
import NoCView from './dashboards/monitoring/dashboard-1';
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
              { label: 'NoC View', url: '' },
            ]}
          />
        </div>
        <div className='px-4 sm:px-8'>
          <NoCView />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
