/* eslint no-restricted-globals: off */

import React from 'react'
import { Col, Panel } from 'react-bootstrap'

const Compare = ({
    type,
    totalCost,
    costPerMile,
    valueAfterFinance,
    initialCost,
    downPayment,
    salesTax,
    titleFee,
    registrationFee,
    recurringCost,
    monthlyPayments,
    monthlyGasPrice,
    monthlyRepairPrice,
    insRate,
    monthlyMileOverageLease,
}) => {
    const formatMoney = val => (!isNaN(parseFloat(val)) ?
        parseFloat(val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : '')
    return (
        <Col sm={6}>
            <Panel header={(<h2>{type}<hr /></h2>)} bsStyle="info">
                <p>Total Cost: ${formatMoney(totalCost)} <br />
                    <small>Price Per Mile: ${formatMoney(costPerMile)}<br />
                        Remaining Value: ${formatMoney(valueAfterFinance)}
                    </small>
                </p>
                <hr />
                <p>Initial Cost: ${formatMoney(initialCost)}<br />
                    <small>
                        Down: ${formatMoney(downPayment)} <br />
                        Tax: ${formatMoney(salesTax)} <br />
                        Title: ${formatMoney(titleFee)} <br />
                        Registration: ${formatMoney(registrationFee)}
                    </small>
                </p>
                <hr />
                <p>Monthly Cost: ${formatMoney(recurringCost)}<br />
                    <small>
                        Payments: ${formatMoney(monthlyPayments)} <br />
                        Gas: ${formatMoney(monthlyGasPrice)} <br />
                        Repair: ${formatMoney(monthlyRepairPrice)} <br />
                        Insurance: ${formatMoney(insRate)}
                        {type === 'Lease' ?
                            <span><br />Overage Miles: ${formatMoney(monthlyMileOverageLease)}</span>
                            :
                            ''
                        }
                    </small>
                </p>
            </Panel>
        </Col>
    )
}

export default Compare
