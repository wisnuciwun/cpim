import React, { Component, PureComponent } from 'react'
import { Card, CardGroup, Container, Form, Button, FormControl, FormLabel, FormGroup } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import CustomInput from '../../components/CustomInput/CustomInput'
import './style.sass'

class Overview extends PureComponent {
    constructor(props) {
        super(props)
    
        this.state = {
             dataopt: [1,2,3],
             company: {
                 name: '',
                 address: '',
                 revenue: '',
                 code: '',
                 phone: ''
             },
             office: {
                name: '',
                lat: '',
                long: '',
                date: '',
                company: '',
            }
        }
    }

    onChangeCompany = (e) => {
        let newValues = {...this.state.company}
        newValues[e.target.name] = e.target.value

        this.setState({
            company: newValues
        })
    }

    onChangeOffice = (e) => {
        let newValues = {...this.state.office}
        newValues[e.target.name] = e.target.value

        this.setState({
            office: newValues
        })
    }

    render() {
        let { company, office } = this.state
        console.log("object", this.state)
        return (
            <Container>
                <div className="d-flex justify-content-center">
                    <Card className="overview-card">
                        <CardHeader className="overview-card-header">Create Company</CardHeader>
                        <CardGroup className="overview-card-group">
                            <Form className="w-100">
                                <CustomInput onChange={this.onChangeCompany} value={company.name} name="name" label="Name :" placeholder="enter your name here" />
                                <CustomInput onChange={this.onChangeCompany} value={company.address} name="address" label="Address :" placeholder="enter your address here" />
                                <CustomInput onChange={this.onChangeCompany} value={company.revenue} name="revenue" label="Revenue :" placeholder="enter your revenue here" />
                                <FormGroup className="mb-3">
                                    <FormLabel>Phone No. :</FormLabel>
                                    <div className="d-flex">
                                        <FormControl onChange={this.onChangeCompany} value={company.code} name="code" placeholder="code" className="w-25 margin-right" type="text" />
                                        <FormControl onChange={this.onChangeCompany} value={company.phone} name="phone" placeholder="number" className="w-75 margin-left" type="text" />
                                    </div>
                                </FormGroup>
                                <Button className="w-100 btn-secondary">Create</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                    <Card className="overview-card">
                        <CardHeader className="overview-card-header">Create Office</CardHeader>
                        <CardGroup className="overview-card-group">
                            <Form className="w-100">
                                <CustomInput onChange={this.onChangeOffice} value={office.name} name="name" label="Name :" placeholder="enter your name here" />
                                <FormGroup className="mb-3">
                                    <FormLabel>Location :</FormLabel>
                                    <div className="d-flex">
                                        <FormControl onChange={this.onChangeOffice} value={office.lat} name="lat" placeholder="latitude" className="w-50 margin-right" type="text" />
                                        <FormControl onChange={this.onChangeOffice} value={office.long} name="long" placeholder="longitude" className="w-50 margin-left" type="text" />
                                    </div>
                                </FormGroup>
                                <CustomInput label="Office Start Date :" placeholder="enter your date here" />
                                <CustomInput onChange={this.onChangeOffice} value={office.company} name="company" label="Company :" placeholder="select your company name here" type="select" options={this.state.dataopt} />
                                <Button className="w-100 btn-secondary">Create</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                </div>
                <div>
                    <Card className="w-25 overview-card">
                        <CardHeader className="d-flex justify-content-between pointer">Google <i class="bi bi-x-lg"></i></CardHeader>
                        <CardGroup>
                            Address: 
                            Revenue:
                            Phone No:
                        </CardGroup>
                    </Card>
                </div>
            </Container>
        )
    }
}

export default Overview