export function calculateDepreciationData(msrp, depreciationFactor) {
    var data = []
    var yearsToCompute = 15
    var today = new Date()
    var year = today.getFullYear()
    for (var i = 0; i < yearsToCompute; i++) {
        switch (i) {
            case 0:
                data.push({year: year, value: Math.floor(msrp * (0.91 + (depreciationFactor*0.01)))})
                break
            case 1:
                data.push({year: year + i, value: Math.floor(msrp * (0.81 + (depreciationFactor*0.01)))})
                break
            case 2:
                data.push({year: year + i, value: Math.floor(msrp * (0.69 + (depreciationFactor*0.01)))})
                break
            case 3:
                data.push({year: year + i, value: Math.floor(msrp * (0.58 + (depreciationFactor*0.01)))})
                break
            case 4:
                data.push({year: year + i, value: Math.floor(msrp * (0.49 + (depreciationFactor*0.01)))})
                break
            case 5:
                data.push({year: year + i, value: Math.floor(msrp * (0.40 + (depreciationFactor*0.01)))})
                break
            default:
                data.push({year: year + i, value: Math.floor(msrp * (0.40 - (0.02 * i) + (depreciationFactor*0.01)))})
        }
    }
    return data
}

export function calculateBuyVsLease(formData) {
    var calculatedData = {}
    calculatedData.salesTax = (formData.salesTax / 100 * formData.msrp)
    calculatedData.downPayment = parseFloat(formData.downPayment)
    calculatedData.titleFee = parseFloat(formData.titleFee)
    calculatedData.registrationFee = parseFloat(formData.registrationFee)
    calculatedData.initialCostBuy = (parseFloat(formData.downPayment )
                       + calculatedData.salesTax
                       + parseFloat(formData.titleFee)
                       + parseFloat(formData.registrationFee))

    console.log(`ICBuy: ${calculatedData.initialCostBuy}`)

    calculatedData.initialCostLease = (parseFloat(formData.downPayment)
                         + parseFloat(formData.titleFee)
                         + parseFloat(formData.registrationFee))

    calculatedData.monthlyPaymentsBuy = ((parseFloat(formData.msrp) - parseFloat(formData.downPayment)) / ((1+(parseFloat(formData.apr)/12)^parseFloat(formData.monthsFinanced))))
    calculatedData.monthlyGasPrice = ((parseFloat(formData.milesPerMonth) / parseFloat(formData.mpg)) * parseFloat(formData.gasPrice))
    calculatedData.monthlyRepairPrice = (parseFloat(formData.msrp) / 120)
    calculatedData.insRate = parseFloat(formData.insRate)
    calculatedData.recurringCostBuy = (calculatedData.monthlyPaymentsBuy//Loan payment
                         + calculatedData.monthlyGasPrice   //Monthly gas
                         + parseFloat(formData.insRate)
                         + calculatedData.monthlyRepairPrice)

    console.log(`RCBuy: ${calculatedData.recurringCostBuy}`)

    calculatedData.monthlyLeasePayment = parseFloat(formData.monthlyLeasePayment)
    calculatedData.monthlyMileOverageLease = (parseFloat(formData.milesPerMonth) < 1000) ? 0 : ((parseFloat(formData.milesPerMonth) - 1000)*0.2)
    calculatedData.recurringCostLease = (calculatedData.monthlyLeasePayment
                           + calculatedData.monthlyMileOverageLease
                           + calculatedData.monthlyGasPrice
                           + parseFloat(formData.insRate)
                           + calculatedData.monthlyRepairPrice)

    calculatedData.valueOfCar = 0
    if(parseFloat(formData.yearsToKeep) < 15) {
        calculatedData.valueOfCar = parseFloat(formData.displayDepreciationData[parseFloat(formData.yearsToKeep) - 1].value)
    } else {
        calculatedData.valueOfCar = 0
    }
    console.log(`Value: ${calculatedData.valueOfCar}`)

    calculatedData.totalGasPrice = calculatedData.monthlyGasPrice * parseFloat(formData.yearsToKeep) * 12
    calculatedData.totalInsPrice = parseFloat(formData.insRate) * parseFloat(formData.yearsToKeep) * 12
    calculatedData.totalRepairPrice = calculatedData.monthlyRepairPrice * parseFloat(formData.yearsToKeep) * 12 
    calculatedData.totalCostBuy = (calculatedData.initialCostBuy
                     + calculatedData.totalGasPrice
                     + calculatedData.totalInsPrice
                     + calculatedData.totalRepairPrice
                     - calculatedData.valueOfCar)
                     
    if(parseFloat(formData.yearsToKeep)*12 > parseFloat(formData.monthsFinanced)){
        calculatedData.totalCostBuy += (calculatedData.monthlyPaymentsBuy * parseFloat(formData.monthsFinanced))
    } else {
        calculatedData.totalCostBuy += (calculatedData.monthlyPaymentsBuy * parseFloat(formData.yearsToKeep) * 12)
    }

    calculatedData.totalCostBuy = Math.floor(calculatedData.totalCostBuy)

    console.log(`Total: ${calculatedData.totalCostBuy}`)

    calculatedData.totalCostLease = (
                         calculatedData.initialCostLease
                       + calculatedData.totalGasPrice
                       + calculatedData.totalInsPrice
                       + calculatedData.totalRepairPrice
                       + parseFloat(formData.yearsToKeep) * 12 * calculatedData.monthlyLeasePayment
                       + calculatedData.monthlyMileOverageLease * 12)
    
    calculatedData.costPerMileBuy = (calculatedData.totalCostBuy / (parseFloat(formData.milesPerMonth) * 12 * parseFloat(formData.yearsToKeep)))
    calculatedData.costPerMileLease = (calculatedData.totalCostLease / (parseFloat(formData.milesPerMonth) * 12 * parseFloat(formData.yearsToKeep)))

    return calculatedData
}