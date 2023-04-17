import { BreadCrumb, Nav } from './components';
import Dashboard_1 from './dashboards/monitoring/dashboard-1';
import useFetch from './hooks/useFetch';
import { API_URL, FetchData, headers } from './global';

const URL = `${API_URL}/vars?name=config&filter-value=cust_shortname`;

function App() {
  const { data } = useFetch<FetchData[]>(URL, {
    headers,
  });

  return (
    <div className='app bg-card-dark flex flex-col gap-4 min-h-screen'>
      <Nav client={data ? data[0].Value : ''} />
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
  );
}

export default App;
