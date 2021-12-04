import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'

function MiniCard({ label = '', data = '' }) {
    return (
        <Card className="w-25 overview-card">
            <CardHeader className="d-flex justify-content-between pointer">{label} <i class="bi bi-x-lg"></i></CardHeader>
            <CardGroup>
                {data.address}

            </CardGroup>
        </Card>
    )
}

export default MiniCard
