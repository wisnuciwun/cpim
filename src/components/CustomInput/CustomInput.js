import React from 'react'
import { memo } from 'react'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

function CustomInput({ label = '', placeholder = '', type = 'text', options = [], onChange, onClick, name = '', value = '', optionvariable = '', validator = "", optionvariable2 = '' }) {
    switch (type) {
        case "select":
            return (<FormGroup>
                    <select onChange={onChange} name={name} className="form-control  w-100" type="select">
                    <option defaultValue onClick={onClick} >{placeholder}</option>
                        {
                            options ?
                                options.map((v, index) => {
                                    return (
                                        <option key={index} >{v[optionvariable]}&nbsp;-&nbsp;{v[optionvariable2]}</option>
                                    )
                                })
                                :
                                null
                        }
                    </select>
                {validator}
            </FormGroup>)

        case "text":
            return (
                <FormGroup className="mb-3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl className="w-100" type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} />
                    {validator}
                </FormGroup>
            )

        default:
            break;
    }
}

export default memo(CustomInput)
