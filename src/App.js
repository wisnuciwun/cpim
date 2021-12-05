import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import routes from './routes'
import { Container } from 'react-bootstrap';
import DefaultHeader from './container/DefaultHeader/DefaultHeader';
import { createBrowserHistory } from "history";
import Loading from './components/Loading';
import {useLocation} from 'react-router'

function App(props) {
  const history = createBrowserHistory();
  let navigate = useNavigate()
  let location = useLocation()
  
  return (
          <div className="container-full">
            <DefaultHeader/>
            <Routes>
              {
                routes.map((route, index) => {
                  return (
                    <Route key={index} path={route.path} element={<route.component location={location} navigate={navigate} history={history} {...props}/>} />
                  )
                })
              }
            </Routes>
          </div>
  );
}

export default App;
