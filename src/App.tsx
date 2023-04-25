import { Suspense } from 'react';
import { Nav } from './components';
import UserContextProvider from './context/UserContext';
import { Router } from 'wouter';
import Dashboards from './dashboards';

function App() {
  return (
    <UserContextProvider>
      <div className='app bg-card-dark flex flex-col gap-4 min-h-screen'>
        <Nav />
        {/* Suspense for showing fallback loading component while the lazy components loaded */}
        <Suspense fallback={<h1 className='text-icon-white'>Loading...</h1>}>
          <Router>
            <Dashboards />
          </Router>
        </Suspense>
      </div>
    </UserContextProvider>
  );
}

export default App;
