import React from 'react'
import { Card, CardGroup, FormLabel } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import './style.sass'

function MiniCard({ label = '', datalabel = [], datavalue = [], iteration = 0, key = 0, changeView, onClickDelete }) {
    let list = []

    if (datalabel.length == iteration && datavalue.length == iteration) {
        for (let i = 0; i < datavalue.length; i++) {
            list.push(
                <span key={i}>
                    <h4>{datalabel[i]}</h4>
                    <p>{datavalue[i]}</p>
                </span>
            )
        }
    }

    return (
        <Card onClick={() => changeView(label)} key={key} className="w-25 mini-card">
            <CardHeader className="d-flex justify-content-between">{label} <i onClick={() => onClickDelete(key)} className="bi bi-x-lg pointer"></i></CardHeader>
            <CardGroup className="p-3">
                <FormLabel>
                    {list}
                </FormLabel>
            </CardGroup>
        </Card>
    )
}

export default MiniCard
