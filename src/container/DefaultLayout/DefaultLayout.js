import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from '../../pages/Overview/Overview'
import routes from '../../routes'

export default class DefaultLayout extends Component {
    render() {
        return (
            <div className="container-full">
                <Container>
                    <Routes>
                        {
                            routes.map((route, index) => {
                                return (
                                    <React.Fragment key={index} path={route.path} element={<route.component />} />
                                )
                            })
                        }
                    </Routes>
                </Container>
            </div>
        )
    }
}
