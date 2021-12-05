import React, { PureComponent } from 'react'
import { Card, CardGroup, Form, Button, FormControl, FormLabel, FormGroup } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import CustomInput from '../../components/CustomInput/CustomInput'
import { resetCompanies, setPage, storeCompanies } from '../../config/redux/rootAction'
import { connect } from 'react-redux';
import './style.sass'
import MiniCard from '../../components/MiniCard/MiniCard'
import DatePicker from 'react-datepicker'
import SimpleReactValidator from 'simple-react-validator';
import ValidatorText from '../../components/ValidatorText/ValidatorText'
import { ConfirmHandling } from '../../components/Swal/Swal'
import moment from 'moment'
import { PHONE_CODE } from '../../constants/Constants'
import { ChangeView } from '../../helper/ChangeView'

class Overview extends PureComponent {
    constructor(props) {
        super(props)
        this.validatorCompany = new SimpleReactValidator({ element: () => <ValidatorText /> })
        this.validatorOffice = new SimpleReactValidator({ element: () => <ValidatorText /> })
        this.state = {
            company: {
                id: '',
                name: '',
                address: '',
                revenue: '',
                code: '',
                phone: '',
                offices: []
            },
            office: {
                id: '',
                company: '',
                name: '',
                lat: '',
                long: '',
                date: '',
            },
        }
        this.initial = { ...this.state }
        let { dispatch } = this.props
        dispatch(setPage(this.props.page))
    }

    onCleanState = (value) => {
        let init = this.initial
        switch (value) {
            case "company":
                this.setState({
                    company: { ...init.company }
                })
                break;
            case "office":
                this.setState({
                    office: { ...init.office }
                })
                break;

            default:
                break;
        }
    }

    onChangeCompany = (e) => {
        let id = this.props.companyId

        if(e.target.name == "code"){
            let val = e.target.value.split(': ')[1]
            this.setState({
                company: {
                    ...this.state.company,
                    code: val
                }
            })
        }
        else{
            let newValues = this.state.company
            newValues[e.target.name] = e.target.value
    
            this.setState({
                company: {
                    ...newValues,
                    id: id,
                }
            })
        }
    }

    onChangeOffice = (e, v = "") => {
        let id = this.props.officeId

        if (v == "Date") {
            this.setState({
                office: {
                    ...this.state.office,
                    date: moment(e).format("DD-MM-YYYY")
                }
            })
        }
        else {
            let newValues = { ...this.state.office }
            newValues[e.target.name] = e.target.value
            this.setState({
                office: {
                    ...newValues,
                    id: id
                }
            })
        }

    }

    onChangeView = (name, id) => {
        ChangeView(`/office/${name}/${id}`, this.props)
    }

    onClickResetData = async () => {
        let { dispatch } = this.props
        let execute = await ConfirmHandling('Are you sure ? You will delete all data').then(res => res ? true : false)

        if (execute) {
            dispatch(resetCompanies())
        }
    }

    postData = async (value) => {
        let { dispatch } = this.props

        switch (value) {
            case "company":
                if (this.validatorCompany.allValid()) {
                    let execute = await ConfirmHandling().then(res => res ? true : false)
                    if (execute) {
                        let newCompany = [...this.props.companies, { ...this.state.company }]
                        dispatch(storeCompanies(newCompany))
                        this.onCleanState(value)
                    }
                }
                else {
                    this.validatorCompany.showMessages()
                    this.forceUpdate()
                }
                break;

            case "office":
                if (this.validatorOffice.allValid()) {
                    let execute = await ConfirmHandling().then(res => res ? true : false)
                    if (execute) {
                        let copy = [...this.props.companies]
                        let company = copy.find(val => val.name == this.state.office.company)
                        company.offices.push({ ...this.state.office })
                        dispatch(storeCompanies(copy))
                        this.onCleanState(value)
                    }
                }
                else {
                    this.validatorOffice.showMessages()
                    this.forceUpdate()
                }
                break;

            default:
                break;
        }
    }

    deleteCompany = async (id) => {
        let execute = await ConfirmHandling().then(res => res ? true : false)

        if (execute) {
            let { dispatch } = this.props
            let copy = [...this.props.companies]
            let selected = copy.find(val => val.id == id)
            let index = copy.indexOf(selected)
            copy.splice(index, 1)
            dispatch(storeCompanies(copy))
        }
    }

    render() {
        let { company, office } = this.state
        let { companies } = this.props
        let companyOk = this.validatorCompany
        let officeOk = this.validatorOffice

        return (
            <div>
                <div className="d-flex justify-content-center up">
                    <Card className="overview-card margin-all">
                        <CardHeader className="overview-card-header d-flex justify-content-between"><i class="bi bi-building"></i> Create Company</CardHeader>
                        <CardGroup className="overview-card-group">
                            <Form className="w-100">
                                <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('name', company.name, 'required')} value={company.name} name="name" label="Name :" placeholder="enter your name here" />
                                <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('address', company.address, 'required')} value={company.address} name="address" label="Address :" placeholder="enter your address here" />
                                <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('revenue', company.revenue, 'required|numeric|min:0,num')} value={company.revenue} name="revenue" label="Revenue :" placeholder="enter your revenue here" />
                                <FormGroup className="mb-3">
                                    <FormLabel>Phone No. :</FormLabel>
                                    <div className="d-flex justify-content-start w-100">
                                        <CustomInput onChange={this.onChangeCompany} validator={companyOk.message('code', company.code, 'required')} value={company.code} name="code" placeholder="code" type="select" options={PHONE_CODE.countries} optionvariable="code" optionvariable2="name" placeholder="code" />
                                        <div className="w-100 margin-right">
                                            <FormControl onChange={this.onChangeCompany} value={company.phone} name="phone" placeholder="number" className="margin-left" type="text" />
                                            {companyOk.message('phone', company.phone, 'required|numeric|min:0,num')}
                                        </div>
                                    </div>
                                </FormGroup>
                                <Button onClick={() => this.postData("company")} className="w-100"><i class="bi bi-pencil-square"></i> Create</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                    <Card className="overview-card margin-all">
                        <CardHeader className="overview-card-header d-flex justify-content-between"><i class="bi bi-shop-window"></i> Create Office</CardHeader>
                        <CardGroup className="overview-card-group">
                            <Form className="w-100">
                                <CustomInput onChange={this.onChangeOffice} validator={officeOk.message('name', office.name, 'required')} value={office.name} name="name" label="Name :" placeholder="enter your name here" />
                                <FormGroup className="mb-3">
                                    <FormLabel>Location :</FormLabel>
                                    <div className="d-flex">
                                        <span className="w-100 margin-right">
                                            <FormControl onChange={this.onChangeOffice} value={office.lat} name="lat" placeholder="latitude" type="text" />
                                            {officeOk.message('lat', office.lat, 'required')}
                                        </span>
                                        <span className="w-100 margin-right">
                                            <FormControl onChange={this.onChangeOffice} value={office.long} name="long" placeholder="longitude" className="margin-left" type="text" />
                                            {officeOk.message('long', office.long, 'required')}
                                        </span>
                                    </div>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>Office Start Date :</FormLabel>
                                    <div className="d-flex justify-content-start w-100">
                                        <span className="margin-right w-100">
                                            <FormControl disabled value={office.date} name="date" placeholder="choose date on side button" type="text" />
                                            {officeOk.message('date', office.date, 'required')}
                                        </span>
                                        <span>
                                            <DatePicker onChange={(e) => this.onChangeOffice(e, "Date")} popperPlacement="auto" customInput={<Button><i class="bi bi-calendar-week"></i></Button>} />
                                        </span>
                                    </div>
                                </FormGroup>
                                <FormGroup className="mb-3 ">
                                    <FormLabel>Company :</FormLabel>
                                    <div>
                                        <CustomInput onChange={this.onChangeOffice} validator={officeOk.message('company', office.company, 'required')} value={office.company} name="company" placeholder="select your company name here" type="select" options={companies} optionvariable="name" />
                                    </div>
                                </FormGroup>
                                <Button onClick={() => this.postData("office")} className="w-100"><i class="bi bi-pencil-square"></i> Create</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                </div>
                <hr></hr>
                <div className="flex-components">
                    {
                        companies.length != 0 ?
                            companies.map((val) => {
                                return (<MiniCard changeView={this.onChangeView} idData={val.id} iteration={3} datavalue={[val.address, val.revenue, `(${val.code}) ${val.phone}`]} datalabel={["Address :", "Revenue :", "Phone No. :"]} label={val.name} onClickDelete={this.deleteCompany} />)
                            })
                            :
                            <h3><i class="bi bi-emoji-frown"></i> No company registered</h3>
                    }
                </div>
                <div className="d-flex justify-content-end mt-5">
                    <Button className="floating-button" onClick={this.onClickResetData}><i class="bi bi-trash"></i></Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(Overview)