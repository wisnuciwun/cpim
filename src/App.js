import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import routes from './routes'
import { Container } from 'react-bootstrap';
import DefaultHeader from './container/DefaultHeader/DefaultHeader';
import { createBrowserHistory } from "history";


function App(props) {
  return (
    <BrowserRouter>
      <React.Suspense>
          <div className="container-full">
            <DefaultHeader/>
            <Routes>
              {
                routes.map((route, index) => {
                  return (
                    <Route key={index} path={route.path} element={<route.component {...props}/>} />
                  )
                })
              }
            </Routes>
          </div>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
