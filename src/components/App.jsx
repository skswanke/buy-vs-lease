import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import '../css/App.css'
import Header from './Header'
import InputForm from './InputForm'
import BuyVsLease from './BuyVsLease'
import * as Calculator from '../services/Calculator'

class App extends Component {
    constructor(props) {
        super(props)
        const initMsrp = 20000
        const initDepreciationFactor = 0
        const displayData = Calculator.calculateDepreciationData(initMsrp, initDepreciationFactor)
        const depreciationData = Calculator.calculateDepreciationData(initMsrp, initDepreciationFactor)
        const initForm = {
            msrp: initMsrp,
            downPayment: 2000,
            salesTax: 6,
            titleFee: 100,
            registrationFee: 50,
            yearsToKeep: 5,
            monthsFinanced: 60,
            monthlyLeasePayment: 300,
            apr: 3,
            insRate: 100,
            milesPerMonth: 1000,
            mpg: 25,
            gasPrice: 2.75,
            depreciationFactor: initDepreciationFactor,
            displayDepreciationData: displayData
        }
        const initCalculatedData = Calculator.calculateBuyVsLease(initForm)
        this.state = {
            form: initForm,
            calculatedData: initCalculatedData,
            depreciationData
        }
    }

    update = (name, value) => {
        const oldForm = this.state.form
        oldForm[name] = value
        this.setState({ ...this.state, form: oldForm })
        this.recalculate()
    }

    recalculate() {
        const oldForm = this.state.form
        const data = Calculator.calculateDepreciationData(this.state.form.msrp, this.state.form.depreciationFactor)
        oldForm.displayDepreciationData = data
        const newCalculatedData = Calculator.calculateBuyVsLease(oldForm)
        this.setState({ ...this.state, form: oldForm, calculatedData: newCalculatedData })
    }

    render() {
        return (
            <div>
                <Header />
                <Grid>
                    <InputForm
                        displayDepreciationData={this.state.form.displayDepreciationData}
                        depreciationFactor={this.state.form.depreciationFactor}
                        updateData={this.update}
                    />
                    <BuyVsLease calculatedData={this.state.calculatedData} />
                </Grid>
            </div>
        )
    }
}

export default App
