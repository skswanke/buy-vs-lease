import React, { Component } from 'react'
import { Col, FormGroup, ControlLabel, Radio, Panel } from 'react-bootstrap'
import { AreaChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { FieldGroup, MoneyFieldGroup, PercentFieldGroup } from './FormAssets'
import '../css/InputForm.css'

class InputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  update = (e) => {
    if(e.target !== undefined) {
      this.props.update(e.target.name, e.target.value)
    }
  }

  render() {
    return (
      <Col sm={6}>
        <form>
          <Panel header={(<h3>Initial Costs</h3>)}>
            <MoneyFieldGroup
              id="formControlsText"
              label="Vehicle MSRP"
              placeholder="20,000"
              name="msrp"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="downPayment"
              label="Down Payment"
              placeholder="2,000"
              name="downPayment"
              onChange={this.update} 
            />
            <PercentFieldGroup
              id="salesTax"
              type="text"
              label="Sales Tax Rate"
              placeholder="6"
              name="salesTax"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="titleFee"
              type="text"
              label="Title Fee"
              placeholder="100"
              name="titleFee"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="registrationFee"
              type="text"
              label={<span>Registration Fee (yearly)  <small><i><a href="http://www.ncsl.org/research/transportation/registration-and-title-fees-by-state.aspx">Find price in your state</a></i></small></span>}
              placeholder="50"
              name="registrationFee"
              onChange={this.update} 
            />
          </Panel>
          <Panel header={(<h3>Recurring Costs</h3>)}>
            <FieldGroup
              id="yearsToKeep"
              label="Years to keep car"
              type="number"
              placeholder="5"
              name="yearsToKeep"
              onChange={this.update} 
            />
            <FieldGroup
              id="monthsFinanced"
              label="Months Financed (if buy)"
              type="number"
              placeholder="60"
              name="monthsFinanced"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="monthlyPriceLease"
              label="Monthly Payment (if lease)"
              placeholder="300"
              name="monthlyLeasePayment"
              onChange={this.update} 
            />
            <PercentFieldGroup
              id="apr"
              label="APR"
              placeholder="3"
              name="apr"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="insRate"
              label="Insurance Rate (Monthly)"
              placeholder="100"
              name="insRate"
              onChange={this.update} 
            />
            <FieldGroup
              id="miles"
              type="number"
              label="Miles driven (Monthly)"
              placeholder="1,000"
              name="milesPerMonth"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="mpg"
              label="Miles Per Gallon"
              placeholder="25"
              name="mpg"
              onChange={this.update} 
            />
            <MoneyFieldGroup
              id="gas"
              label="Local Gas Price"
              placeholder="2.75"
              name="gasPrice"
              onChange={this.update} 
            />
          </Panel>
          <Panel header={(<h3 id="dep-header">Depreciation Factor</h3>)}>
            <FieldGroup
              id="depreciation"
              className="depreciation"
              type="range"
              label={<div className="depreciation-label"><span className="col-xs-4 faster-text">Faster</span><span className="col-xs-4 average-text">Average</span><span className="col-xs-4 slower-text">Slower</span></div>}
              min={-5}
              max={5}
              step={1}
              value={this.props.form.depreciationFactor}
              name="depreciationFactor"
              onChange={this.update}
            />
            <AreaChart height={250} width={450} data={this.props.form.displayDepreciationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#82ca9d" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </Panel>
          <Panel header={(<h3>Environmental Factors</h3>)}>
            <FormGroup>
              <ControlLabel>Driving Environment</ControlLabel>
              <Radio name="radioGroup" inline>
                Dry
              </Radio>
              {' '}
              <Radio name="radioGroup" inline>
                Mild Dry
              </Radio>
              {' '}
              <Radio name="radioGroup" inline>
                Mild Wet
              </Radio>
              {' '}
              <Radio name="radioGroup" inline>
                Snow/Wet
              </Radio>
              {' '}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Driving Style</ControlLabel>
              <Radio name="radioGroup2" inline>
                Cautious
              </Radio>
              {' '}
              <Radio name="radioGroup2" inline>
                Average
              </Radio>
              {' '}
              <Radio name="radioGroup2" inline>
                Quick
              </Radio>
              {' '}
              <Radio name="radioGroup2" inline>
                F1
              </Radio>
              {' '}
            </FormGroup>
          </Panel>
        </form>
      </Col>
    )
  }
}

export default InputForm