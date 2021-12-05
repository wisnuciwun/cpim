import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.sass'

class DefaultHeader extends Component {
    render() {
        return (
            <div className="header">
                <h1>{this.props.pagename} page</h1>
                <hr></hr>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(DefaultHeader)
