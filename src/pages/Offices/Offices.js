import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import MiniCard from '../../components/MiniCard/MiniCard';
import { ConfirmHandling } from '../../components/Swal/Swal';
import { storeCompanies } from '../../config/redux/rootAction';
import {ChangeView} from '../../helper/ChangeView';
import { dummyFunction } from '../../helper/dummyFunction';
import './style.sass'

class Offices extends Component {    

    deleteOffice = async (id) => {
        let execute = await ConfirmHandling().then(res => res ? true : false)

        if (execute) {
            let { dispatch } = this.props
            let copy = [...this.props.companies]
            let selected = copy.find(val => val.id == 84)
            let office = selected.offices.find(value => value.id == id)
            let index = selected.offices.indexOf(office)
            selected.offices.splice(index, 1)
            dispatch(storeCompanies(copy))
        }
    }

    onChangeView = () => {
        ChangeView(`/`, this.props)
    }

    render() {
        let { companies } = this.props
        let companyname = this.props.location.pathname.split('/')[2].replaceAll('%20', " ")
        let company = companies.find(val => val.name == companyname)
        let selectedOffice = []

        if (company) {
            selectedOffice = [...company.offices]
        }

        return (
            <div className="offices">
                {
                    company ?
                        <div>
                            <h3>Address</h3>
                            <p>{company.address ? company.address : ""}</p>
                            <h3>Revenue</h3>
                            <p>{company.revenue ? company.revenue : ""}</p>
                            <h3>Phone Number</h3>
                            <p>{company.phone ? company.phone : ""}</p>
                            <Button className="btn-secondary" onClick={this.onChangeView} >Back to Overview</Button>
                            <hr></hr>
                            <div className="d-flex h-50 w-100">
                                {
                                    selectedOffice ?
                                        selectedOffice.map((val) => {
                                            return (<MiniCard key={val.id} iteration={3} datavalue={[val.lat, val.long, val.date]} datalabel={["Latitude :", "Longitude :", "Date. :"]} label={val.name} changeView={dummyFunction} onClickDelete={this.deleteOffice} />)
                                        })
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        <div className="center-all" style={{textAlign: 'center'}}>
                            <h1><i class="bi bi-door-open"></i>No data</h1>
                            <Button className="btn-secondary" onClick={this.onChangeView}><i class="bi bi-house"></i> Back to Overview</Button>
                        </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Offices)
