import React, { Component } from 'react'
import { Col, Panel } from 'react-bootstrap'
import '../css/BuyVsLease.css'

class BuyVsLease extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    formatMoney(val) {
        return parseFloat(val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }

    render() {
        return (
            <div className="buy-vs-lease col-sm-6" >
                <Col sm={6}>
                    <Panel header={(<h2>Buy<hr /></h2>)} bsStyle="info">
                        <p>Total Cost: ${this.formatMoney(this.props.calculatedData.totalCostBuy)} <br />
                            <small>Price Per Mile: ${this.formatMoney(this.props.calculatedData.costPerMileBuy)}<br />
                                   Remaining Value: ${this.formatMoney(this.props.calculatedData.valueOfCar)}
                            </small>
                        </p>
                        <hr />
                        <p>Initial Cost: ${this.formatMoney(this.props.calculatedData.initialCostBuy)}<br />
                            <small>
                                Down: ${this.formatMoney(this.props.calculatedData.downPayment)} <br />
                                Tax: ${this.formatMoney(this.props.calculatedData.salesTax)} <br />
                                Title: ${this.formatMoney(this.props.calculatedData.titleFee)} <br />
                                Registration: ${this.formatMoney(this.props.calculatedData.registrationFee)}
                            </small>
                        </p>
                        <hr />
                        <p>Recurring Cost Per Month: ${this.formatMoney(this.props.calculatedData.recurringCostBuy)}<br />
                            <small>
                                Payments: ${this.formatMoney(this.props.calculatedData.monthlyPaymentsBuy)} <br />
                                Gas: ${this.formatMoney(this.props.calculatedData.monthlyGasPrice)} <br />
                                Repair: ${this.formatMoney(this.props.calculatedData.monthlyRepairPrice)} <br />
                                Insurance: ${this.formatMoney(this.props.calculatedData.insRate)}
                            </small>
                        </p>
                    </Panel>
                </Col>
                <Col sm={6}>
                    <Panel header={(<h1>Lease<hr /></h1>)} bsStyle="info">
                        <p>Total Cost: ${this.formatMoney(this.props.calculatedData.totalCostLease)} <br />
                            <small>Price Per Mile: ${this.formatMoney(this.props.calculatedData.costPerMileLease)}<br />
                                   Remaining Value: $0
                                   </small>
                        </p>
                        <hr />
                        <p>Initial Cost: ${this.formatMoney(this.props.calculatedData.initialCostLease)}<br />
                            <small>
                                Down: ${this.formatMoney(this.props.calculatedData.downPayment)} <br />
                                Title: ${this.formatMoney(this.props.calculatedData.titleFee)} <br />
                                Registration: ${this.formatMoney(this.props.calculatedData.registrationFee)}
                                <br />&nbsp;
                            </small>
                        </p>
                        <hr />
                        <p>Recurring Cost Per Month: ${this.formatMoney(this.props.calculatedData.recurringCostLease)}<br />
                            <small>
                                Payments: ${this.formatMoney(this.props.calculatedData.monthlyLeasePayment)} <br />
                                Gas: ${this.formatMoney(this.props.calculatedData.monthlyGasPrice)} <br />
                                Repair: ${this.formatMoney(this.props.calculatedData.monthlyRepairPrice)} <br />
                                Insurance: ${this.formatMoney(this.props.calculatedData.insRate)} <br />
                                Overage Miles: ${this.formatMoney(this.props.calculatedData.monthlyMileOverageLease)}
                            </small>
                        </p>
                    </Panel>
                </Col>
            </div>
        )
    }
}

export default BuyVsLease