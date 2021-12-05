import React, { memo } from 'react'
import { Card, CardGroup, FormLabel } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import './style.sass'

function MiniCard({ label = '', datalabel = [], datavalue = [], iteration = 0, idData = 0, changeView, onClickDelete }) {
    let list = []

    if (datalabel.length == iteration && datavalue.length == iteration) {
        for (let i = 0; i < datavalue.length; i++) {
            list.push(
                <span idData={i}>
                    <h5>{datalabel[i]}</h5>
                    <p>{datavalue[i]}</p>
                </span>
            )
        }
    }

    return (
        <Card key={idData} className="w-25 mini-card margin-left margin-right">
            <CardHeader className="d-flex justify-content-between">{label} <i onClick={() => onClickDelete(idData)} className="close bi bi-x-lg pointer"></i></CardHeader>
            <CardGroup onClick={() => changeView(label,idData)} className="p-3 pointer">
                <FormLabel>
                    {list}
                </FormLabel>
            </CardGroup>
        </Card>
    )
}

export default memo(MiniCard)
