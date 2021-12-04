import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import routes from './routes'
import { Container } from 'react-bootstrap';
import DefaultHeader from './container/DefaultHeader/DefaultHeader';
import { createBrowserHistory } from "history";
import Loading from './components/Loading';

// createBrowserHistory({
//   forceRefresh: true
//   });

function App(props) {
  const history = createBrowserHistory();
  
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loading/>}>
          <div className="container-full">
            <DefaultHeader/>
            <Routes>
              {
                routes.map((route, index) => {
                  return (
                    <Route key={index} path={route.path} element={<route.component history={history} {...props}/>} />
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
