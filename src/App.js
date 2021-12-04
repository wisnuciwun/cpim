import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import DefaultLayout from './container/DefaultLayout/DefaultLayout';
import Overview from './pages/Overview/Overview';
import Offices from './pages/Offices/Offices';
import routes from './routes'
import { Container } from 'react-bootstrap';

function App(props) {
  return (
    <BrowserRouter>
      <React.Suspense>
          <Container className="container-full">
            <Routes>
              {
                routes.map((route, index) => {
                  return (
                    <Route key={index} path={route.path} element={<route.component {...props}/>} />
                  )
                })
              }
            </Routes>
          </Container>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
