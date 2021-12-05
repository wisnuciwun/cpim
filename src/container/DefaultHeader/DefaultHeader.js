import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.sass'
import ico from './favicon.ico'

class DefaultHeader extends Component {
    render() {
        return (
            <div className="header">
                <div className="d-flex justify-content-between">
                    <h1>{this.props.pagename} page</h1>
                    <h4><img src={ico} style={{width: '50px', height: '50px'}}/>&nbsp;<i>CompaControl</i></h4>
                </div>
                <hr></hr>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(DefaultHeader)
