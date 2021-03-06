import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import MiniCard from '../../components/MiniCard/MiniCard';
import { ConfirmHandling } from '../../components/Swal/Swal';
import { setPage, storeCompanies } from '../../config/redux/rootAction';
import { ChangeView } from '../../helper/ChangeView';
import { dummyFunction } from '../../helper/dummyFunction';
import './style.sass'

class Offices extends PureComponent {
    constructor(props) {
        super(props)
        let { dispatch } = this.props
        dispatch(setPage(this.props.page))
    }


    deleteOffice = async (id) => {
        let execute = await ConfirmHandling().then(res => res ? true : false)
        let companyid = this.props.location.pathname.split('/')[3]

        if (execute) {
            let { dispatch } = this.props
            let copy = [...this.props.companies]
            let selected = copy.find(val => val.id == companyid)
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
        let companyid = this.props.location.pathname.split('/')[3]
        let company = companies.find(val => val.id == companyid)
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
                                    <h4>Company Name</h4>
                                    <p>{company.name ? company.name : ""}</p>
                                    <h4>Address</h4>
                                    <p>{company.address ? company.address : ""}</p>
                                    <h4>Revenue</h4>
                                    <p>{company.revenue ? company.revenue : ""}</p>
                                    <h4>Phone Number</h4>
                                    <p>{company.phone ? `(${company.code}) ${company.phone}` : ""}</p>
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
