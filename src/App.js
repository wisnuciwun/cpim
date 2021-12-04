import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import DefaultLayout from './container/DefaultLayout/DefaultLayout';
import Overview from './pages/Overview/Overview';

function App() {
  return (
    <BrowserRouter>
      <div className="container-full">
          <Overview />

        {/* <React.Suspense>
          <Routes>
            <Route path="/" name="home" render={props => <DefaultLayout {...props} />} />
          </Routes>
        </React.Suspense> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
