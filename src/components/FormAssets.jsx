/* eslint object-curly-newline: off */

import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock, InputGroup } from 'react-bootstrap'

export const FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
)

export const MoneyFieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl type="number" min={0.1} step={0.1} {...props} />
        </InputGroup>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
)

export const PercentFieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <InputGroup>
            <FormControl type="number" {...props} />
            <InputGroup.Addon>
                <span>%</span>
            </InputGroup.Addon>
        </InputGroup>
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
)
