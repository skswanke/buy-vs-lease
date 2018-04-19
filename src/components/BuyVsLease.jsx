import React, { Component } from 'react'
import Compare from './Compare';
import '../css/BuyVsLease.css'

class BuyVsLease extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="buy-vs-lease col-sm-6" >
                <Compare
                    type="Buy"
                    totalCost={this.props.calculatedData.totalCostBuy}
                    costPerMile={this.props.calculatedData.costPerMileBuy}
                    valueAfterFinance={this.props.calculatedData.valueAfterFinance}
                    initialCost={this.props.calculatedData.initialCostBuy}
                    downPayment={this.props.calculatedData.downPayment}
                    salesTax={this.props.calculatedData.salesTax}
                    titleFee={this.props.calculatedData.titleFee}
                    registrationFee={this.props.calculatedData.registrationFee}
                    recurringCost={this.props.calculatedData.recurringCostBuy}
                    monthlyPayments={this.props.calculatedData.monthlyPaymentsBuy}
                    monthlyGasPrice={this.props.calculatedData.monthlyGasPrice}
                    monthlyRepairPrice={this.props.calculatedData.monthlyRepairPrice}
                    insRate={this.props.calculatedData.insRate}
                />
                <Compare
                    type="Lease"
                    totalCost={this.props.calculatedData.totalCostLease}
                    costPerMile={this.props.calculatedData.costPerMileLease}
                    valueAfterFinance="0"
                    initialCost={this.props.calculatedData.initialCostLease}
                    downPayment={this.props.calculatedData.downPayment}
                    salesTax="0"
                    titleFee={this.props.calculatedData.titleFee}
                    registrationFee={this.props.calculatedData.registrationFee}
                    recurringCost={this.props.calculatedData.recurringCostLease}
                    monthlyPayments={this.props.calculatedData.monthlyLeasePayment}
                    monthlyGasPrice={this.props.calculatedData.monthlyGasPrice}
                    monthlyRepairPrice={this.props.calculatedData.monthlyRepairPrice}
                    insRate={this.props.calculatedData.insRate}
                    monthlyMileOverageLease={this.props.calculatedData.monthlyMileOverageLease}
                />
            </div>
        )
    }
}

export default BuyVsLease
