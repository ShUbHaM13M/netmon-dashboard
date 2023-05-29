import { Suspense } from 'react';
import UserContextProvider from './context/UserContext';
import { Router } from 'wouter';
import Dashboards from './dashboards';
import { multipathMatcher } from './global';
import { Loader } from './components';

function App() {
  return (
    <UserContextProvider>
      <div className='app bg-card-dark flex flex-col gap-4 min-h-screen'>
        {/* Suspense for showing fallback loading component while the lazy components loaded */}
        <Suspense fallback={<Loader />}>
          <Router matcher={multipathMatcher}>
            <Dashboards />
          </Router>
        </Suspense>
      </div>
    </UserContextProvider>
  );
}

export default App;
