import React from 'react'
import { memo } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

function CustomInput({ label = '', placeholder = '', type = 'text', options = [], onChange, onClick, name = '', value = '', optionvariable = '' }) {
    switch (type) {
        case "select":
            return (<FormGroup className="mb-3">
                <FormLabel>{label}</FormLabel>
                <div className="d-flex">
                    <select onChange={onChange} name="companyId" className="form-control w-100" type="select">
                    <option defaultValue onClick={onClick} ></option>
                        {
                            options ?
                                options.map((v, index) => {
                                    return (
                                        <option key={index} >{v[optionvariable]}</option>
                                    )
                                })
                                :
                                null
                        }
                    </select>
                </div>
            </FormGroup>)

        case "text":
            return (
                <FormGroup className="mb-3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl className="w-100" type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} />
                </FormGroup>
            )

        default:
            break;
    }
}

export default memo(CustomInput)
