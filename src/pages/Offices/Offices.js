import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import MiniCard from '../../components/MiniCard/MiniCard';
import { ConfirmHandling } from '../../components/Swal/Swal';
import { setPage, storeCompanies } from '../../config/redux/rootAction';
import { ChangeView } from '../../helper/ChangeView';
import { dummyFunction } from '../../helper/dummyFunction';
import './style.sass'

class Offices extends Component {
    constructor(props) {
        super(props)
        let { dispatch } = this.props
        dispatch(setPage(this.props.page))
    }


    deleteOffice = async (id) => {
        let execute = await ConfirmHandling().then(res => res ? true : false)
        let companyname = this.props.location.pathname.split('/')[2].replaceAll('%20', " ")

        if (execute) {
            let { dispatch } = this.props
            let copy = [...this.props.companies]
            let selected = copy.find(val => val.name == companyname)
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
                            <div className="d-flex justify-content-between align-items-end">
                                <span>
                                    <h3>Address</h3>
                                    <p>{company.address ? company.address : ""}</p>
                                    <h3>Revenue</h3>
                                    <p>{company.revenue ? company.revenue : ""}</p>
                                    <h3>Phone Number</h3>
                                    <p>{company.phone ? company.phone : ""}</p>
                                </span>
                                <div>
                                    <Button className="btn-secondary" onClick={this.onChangeView} ><i class="bi bi-house"></i> Back to Overview</Button>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex-components">
                                {
                                    selectedOffice.length != 0 ?
                                        selectedOffice.map((val) => {
                                            return (<MiniCard key={val.id} iteration={3} datavalue={[val.lat, val.long, val.date]} datalabel={["Latitude :", "Longitude :", "Date. :"]} label={val.name} changeView={dummyFunction} onClickDelete={this.deleteOffice} />)
                                        })
                                        :
                                        <h3><i class="bi bi-emoji-frown"></i> No office registered</h3>
                                }
                            </div>
                        </div>
                        :
                        <div className="center-all" style={{ textAlign: 'center' }}>
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
