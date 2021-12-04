import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from '../../pages/Overview/Overview'
import routes from '../../routes'

export default class DefaultLayout extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Overview/>
                    {/* <Routes>
                        {
                            routes.map((route, index) => {
                                return (
                                    <Route key={index} path={route.path} exact={route.exact} name={route.name} component={props => (<route.component {...props} />)} />
                                )
                            })
                        }
                        <Navigate from="/" to="/home" />
                    </Routes> */}
                </Container>
            </div>
        )
    }
}
