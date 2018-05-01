import React from 'react'
import Compare from './Compare';
import '../css/BuyVsLease.css'

const BuyVsLease = calculatedData => (
    <div className="buy-vs-lease col-sm-6" >
        <Compare
            type="Buy"
            totalCost={calculatedData.totalCostBuy}
            costPerMile={calculatedData.costPerMileBuy}
            valueAfterFinance={calculatedData.valueAfterFinance}
            initialCost={calculatedData.initialCostBuy}
            downPayment={calculatedData.downPayment}
            salesTax={calculatedData.salesTax}
            titleFee={calculatedData.titleFee}
            registrationFee={calculatedData.registrationFee}
            recurringCost={calculatedData.recurringCostBuy}
            monthlyPayments={calculatedData.monthlyPaymentsBuy}
            monthlyGasPrice={calculatedData.monthlyGasPrice}
            monthlyRepairPrice={calculatedData.monthlyRepairPrice}
            financed={calculatedData.financed}
            valueAfterDown={calculatedData.valueAfterDown}
            insRate={calculatedData.insRate}
        />
        <Compare
            type="Lease"
            totalCost={calculatedData.totalCostLease}
            costPerMile={calculatedData.costPerMileLease}
            valueAfterFinance="0"
            initialCost={calculatedData.initialCostLease}
            downPayment={calculatedData.downPayment}
            salesTax="0"
            titleFee={calculatedData.titleFee}
            registrationFee={calculatedData.registrationFee}
            recurringCost={calculatedData.recurringCostLease}
            monthlyPayments={calculatedData.monthlyLeasePayment}
            monthlyGasPrice={calculatedData.monthlyGasPrice}
            monthlyRepairPrice={calculatedData.monthlyRepairPrice}
            insRate={calculatedData.insRate}
            monthlyMileOverageLease={calculatedData.monthlyMileOverageLease}
        />
    </div>
)

export default BuyVsLease
