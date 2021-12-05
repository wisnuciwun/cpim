import { Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import routes from './routes'
import DefaultHeader from './container/DefaultHeader/DefaultHeader';
import {useLocation} from 'react-router'

function App() {
  let navigate = useNavigate()
  let location = useLocation()
  return (
          <div className="container-full">
            <DefaultHeader />
            <Routes>
              {
                routes.map((route, index) => {
                  return (
                    <Route key={index} path={route.path} element={<route.component page={route.name} location={location} navigate={navigate}/>} />
                  )
                })
              }
            </Routes>
          </div>
  );
}

export default App;
