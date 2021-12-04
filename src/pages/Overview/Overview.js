import React, { Component, PureComponent } from 'react'
import { Card, CardGroup, Container, Form, Button, FormControl, FormLabel, FormGroup } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import CustomInput from '../../components/CustomInput/CustomInput'
import { storeCompanies, storeOffices } from '../../config/redux/rootAction'
import { connect } from 'react-redux';
import './style.sass'
import { COMPANIES } from '../../config/redux/actionTypes'
import MiniCard from '../../components/MiniCard/MiniCard'
import DatePicker from 'react-datepicker'
import SimpleReactValidator from 'simple-react-validator';
import ValidatorText from '../../components/ValidatorText/ValidatorText'

class Overview extends PureComponent {
    constructor(props) {
        super(props)
        this.validatorCompany = new SimpleReactValidator({element: () => <ValidatorText/>})
        this.validatorOffice = new SimpleReactValidator({element: () => <ValidatorText/>})
        this.state = {
            company: {
                id: '',
                name: '',
                address: '',
                revenue: '',
                code: '',
                phone: ''
            },
            office: {
                id: '',
                company: '',
                name: '',
                lat: '',
                long: '',
                date: '',
            }
        }
        this.initial = {...this.state}

        this.postData = this.postData.bind(this)

    }

    onCleanState = (value) => {
        let init = this.initial
        switch (value) {
            case "company":
                this.setState({
                    company: {...init.company}
                })
                break;
            case "office":
                this.setState({
                    office: {...init.office}
                })
                break;
        
            default:
                break;
        }
    }

    onChangeCompany = (e) => {
        let newValues = { ...this.state.company }
        let id = this.props.companyId
        newValues[e.target.name] = e.target.value

        this.setState({
            company: {
                ...newValues,
                id: id,
            }
        })
    }

    onChangeOffice = (e) => {
        let newValues = { ...this.state.office }
        let id = this.props.officeId
        newValues[e.target.name] = e.target.value

        this.setState({
            office: {
                ...newValues,
                id: id
            }
        })
    }

    onChangeView = () => {

        this.props.history.push('/office')
    }

    postData(value) {
    let { dispatch } = this.props

        switch (value) {
            case "company":
            if(this.validatorCompany.allValid()){
                // let newCompany = [...this.props.companies, { ...this.state.company }]
                // dispatch(storeCompanies(newCompany))
                // this.onCleanState(value)
            }
            else
            {
                this.validatorCompany.showMessages()
                this.forceUpdate()
            }
            break;
            
            case "office":
            if(this.validatorOffice.allValid()){
                // let newOffice = [...this.props.offices, { ...this.state.office }]
                // dispatch(storeOffices(newOffice))
                // this.onCleanState(value)
            }
            else
            {
                this.validatorOffice.showMessages()
                this.forceUpdate()
            }
            break;

            default:
                break;
        }
        
    }

    render() {
        let { company, office } = this.state
        let { companies } = this.props
        let companyOk = this.validatorCompany
        let officeOk = this.validatorOffice

        console.log("object", this.props.history)
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <Card className="overview-card">
                        <CardHeader className="overview-card-header">Create Company</CardHeader>
                        <CardGroup className="overview-card-group">
                            <Form className="w-100">
                                <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('name', company.name, 'required')} value={company.name} name="name" label="Name :" placeholder="enter your name here" />
                                <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('address', company.address, 'required')} value={company.address} name="address" label="Address :" placeholder="enter your address here" />
                                <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('revenue', company.revenue, 'required')} value={company.revenue} name="revenue" label="Revenue :" placeholder="enter your revenue here" />
                                <FormGroup className="mb-3">
                                    <FormLabel>Phone No. :</FormLabel>
                                    <div className="d-flex">
                                        <FormControl onChange={this.onChangeCompany} value={company.code} name="code" placeholder="code" className="w-25 margin-right" type="text" />
                                        {companyOk.message('code', company.code, 'required')}
                                        <FormControl onChange={this.onChangeCompany} value={company.phone} name="phone" placeholder="number" className="w-75 margin-left" type="text" />
                                        {companyOk.message('phone', company.phone, 'required')}
                                    </div>
                                </FormGroup>
                                <Button onClick={() => this.postData("company")} className="w-100">Create</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                    <Card className="overview-card">
                        <CardHeader className="overview-card-header">Create Office</CardHeader>
                        <CardGroup className="overview-card-group">
                            <Form className="w-100">
                                <CustomInput onChange={this.onChangeOffice} validator={officeOk.message('name', office.name, 'required')} value={office.name} name="name" label="Name :" placeholder="enter your name here" />
                                <FormGroup className="mb-3">
                                    <FormLabel>Location :</FormLabel>
                                    <div className="d-flex">
                                        <FormControl onChange={this.onChangeOffice} value={office.lat} name="lat" placeholder="latitude" className="w-50 margin-right" type="text" />
                                        {officeOk.message('lat', office.lat, 'required')}
                                        <FormControl onChange={this.onChangeOffice} value={office.long} name="long" placeholder="longitude" className="w-50 margin-left" type="text" />
                                        {officeOk.message('long', office.long, 'required')}
                                    </div>
                                </FormGroup>
                                <DatePicker  />
              
                                <CustomInput onChange={this.onChangeOffice} validator={officeOk.message('company', office.company, 'required')} name="company" label="Company :" placeholder="select your company name here" type="select" options={companies} optionvariable="name" optionvalue="companyId" />
                                <Button onClick={() => this.postData("office")} className="w-100">Create</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                </div>
                <div className="d-flex h-50 w-100">
                    {
                        companies ?
                            companies.map((val, index) => {
                                return (<MiniCard changeView={this.onChangeView} key={index} iteration={3} datavalue={[val.address, val.revenue, val.phone]} datalabel={["Address :", "Revenue :", "Phone No. :"]} label={val.name} />)
                            })
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Overview)