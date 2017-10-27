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
    var initMsrp = 20000
    var initDepreciationFactor = 0
    var displayData = Calculator.calculateDepreciationData(initMsrp, initDepreciationFactor)
    var depreciationData = Calculator.calculateDepreciationData(initMsrp, initDepreciationFactor)
    var initForm = {
      msrp: 20000,
      downPayment: 2000,
      salesTax: 6,
      titleFee: 100,
      registrationFee: 50,
      yearsToKeep: 5,
      monthsFinanced: 60,
      monthlyLeasePayment: 200,
      apr: 3,
      insRate: 100,
      milesPerMonth: 1000,
      mpg: 25,
      gasPrice: 2.75,
      depreciationFactor: 0,
      displayDepreciationData: displayData
    }
    var initCalculatedData = Calculator.calculateBuyVsLease(initForm)
    this.state = {
      form: initForm,
      calculatedData: initCalculatedData,
      depreciationData: depreciationData
    }
  }

  update = (name, value) => {
    var oldForm = this.state.form
    oldForm[name] = value
    this.setState({ ...this.state, form: oldForm })
    this.recalculate()
  }

  recalculate() {
    let oldForm = this.state.form
    let displayData = Calculator.calculateDepreciationData(this.state.form.msrp, this.state.form.depreciationFactor)
    oldForm.displayDepreciationData = displayData
    let newCalculatedData = Calculator.calculateBuyVsLease(oldForm)
    this.setState({ ...this.state, form: oldForm, calculatedData: newCalculatedData })
  }

  render() {
    return (
      <div>
        <Header />
        <Grid>
          <InputForm form={this.state.form} update={this.update} />
          <BuyVsLease calculatedData={this.state.calculatedData} />
        </Grid>
      </div>
    )
  }
}

export default App
