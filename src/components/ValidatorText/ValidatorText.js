import React, { memo } from 'react'
import { FormLabel } from 'react-bootstrap'

function ValidatorText({text = "Please fill the blank with correct value"}) {
    return (
        <div style={{marginTop: "0px"}}><FormLabel style={{color: "red", fontSize: '10px', textAlign: 'center'}}>{text}</FormLabel></div>
    )
}

export default memo(ValidatorText)
