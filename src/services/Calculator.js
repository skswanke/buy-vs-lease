/* eslint no-mixed-operators: off */

export function calculateDepreciationData(msrp, depreciationFactor) {
    const data = []
    const yearsToCompute = 15
    const today = new Date()
    const year = today.getFullYear()
    for (let i = 0; i < yearsToCompute; i++) {
        switch (i) {
        case 0:
            data.push({ year, value: Math.floor(msrp * (0.91 + (depreciationFactor * 0.01))) })
            break
        case 1:
            data.push({ year: year + i, value: Math.floor(msrp * (0.81 + (depreciationFactor * 0.01))) })
            break
        case 2:
            data.push({ year: year + i, value: Math.floor(msrp * (0.69 + (depreciationFactor * 0.01))) })
            break
        case 3:
            data.push({ year: year + i, value: Math.floor(msrp * (0.58 + (depreciationFactor * 0.01))) })
            break
        case 4:
            data.push({ year: year + i, value: Math.floor(msrp * (0.49 + (depreciationFactor * 0.01))) })
            break
        case 5:
            data.push({ year: year + i, value: Math.floor(msrp * (0.40 + (depreciationFactor * 0.01))) })
            break
        default:
            data.push({ year: year + i, value: Math.floor(msrp * (0.40 - (0.02 * i) + (depreciationFactor * 0.01))) })
        }
    }
    return data
}

const calcSalesTax = (r, P) => ((r / 100) * P)

const sum = array => (array.reduce((total, num) => (total + num)))

const calcLoanAmortization = (msrp, down, apr, months) => {
    // Loan Amortization
    // A=P∗(r(1+r)^n)/(((1+r)^n)−1)
    const P = msrp - down
    const r = apr / 100 / 12
    const n = months
    return P * ((r * (1 + r) ** n) / ((1 + r) ** n - 1))
}

const calcMonthlyGas = (mpm, mpg, price) => (mpm / mpg * price)

const calcMileOverage = mpm => ((mpm < 1000) ? 0 : ((mpm - 1000) * 0.2))


export function calculateBuyVsLease(formData) {
    const salesTax = calcSalesTax(parseFloat(formData.salesTax), parseFloat(formData.msrp))
    const downPayment = parseFloat(formData.downPayment)
    const titleFee = parseFloat(formData.titleFee)
    const registrationFee = parseFloat(formData.registrationFee)

    const initialCostBuy = sum([
        parseFloat(formData.downPayment),
        salesTax,
        parseFloat(formData.titleFee),
        parseFloat(formData.registrationFee)
    ])

    const initialCostLease = sum([
        parseFloat(formData.downPayment),
        parseFloat(formData.titleFee),
        parseFloat(formData.registrationFee)
    ])


    const monthlyPaymentsBuy = calcLoanAmortization(
        parseFloat(formData.msrp),
        parseFloat(formData.downPayment),
        parseFloat(formData.apr),
        parseFloat(formData.monthsFinanced)
    )

    const monthlyGasPrice = calcMonthlyGas(
        parseFloat(formData.milesPerMonth),
        parseFloat(formData.mpg),
        parseFloat(formData.gasPrice)
    )

    const monthlyRepairPrice = parseFloat(formData.msrp) / 120
    const insRate = parseFloat(formData.insRate)

    const recurringCostBuy = sum([
        monthlyPaymentsBuy,
        monthlyGasPrice,
        insRate,
        monthlyRepairPrice
    ])

    const monthlyLeasePayment = parseFloat(formData.monthlyLeasePayment)
    const monthlyMileOverageLease = calcMileOverage(parseFloat(formData.milesPerMonth))
    const recurringCostLease = sum([
        monthlyLeasePayment,
        monthlyMileOverageLease,
        monthlyGasPrice,
        insRate,
        monthlyRepairPrice
    ])

    let valueOfCar = 0
    if (parseFloat(formData.yearsToKeep) < 15) {
        valueOfCar = parseFloat(formData.displayDepreciationData[
            parseFloat(formData.yearsToKeep) - 1].value)
    }

    const yearsToKeep = parseFloat(formData.yearsToKeep)
    const monthsFinanced = parseFloat(formData.monthsFinanced)
    const totalGasPrice = monthlyGasPrice * yearsToKeep * 12
    const totalInsPrice = insRate * yearsToKeep * 12
    const totalRepairPrice = monthlyRepairPrice * yearsToKeep * 12

    const totalFinanceCost = (yearsToKeep * 12 >= monthsFinanced ?
        monthlyPaymentsBuy * monthsFinanced
        :
        monthlyPaymentsBuy * 12 * yearsToKeep
    )

    const valueAfterFinance = (yearsToKeep * 12 >= monthsFinanced ?
        valueOfCar
        :
        valueOfCar - (monthlyPaymentsBuy * monthsFinanced - monthlyPaymentsBuy * 12 * yearsToKeep)
    )

    let totalCostBuy = sum([
        initialCostBuy,
        totalGasPrice,
        totalInsPrice,
        totalRepairPrice,
        totalFinanceCost
    ]) - valueAfterFinance

    totalCostBuy = Math.floor(totalCostBuy)

    const totalMonthlyLeasePayments = yearsToKeep * 12 * monthlyLeasePayment + monthlyMileOverageLease

    const totalCostLease = sum([
        initialCostLease,
        totalGasPrice,
        totalInsPrice,
        totalRepairPrice,
        totalMonthlyLeasePayments
    ])

    const costPerMileBuy = (
        totalCostBuy / (parseFloat(formData.milesPerMonth) * 12 * yearsToKeep)
    )
    const costPerMileLease = (
        totalCostLease / (parseFloat(formData.milesPerMonth) * 12 * yearsToKeep)
    )

    const calculatedData = {
        totalCostBuy,
        totalCostLease,
        salesTax,
        downPayment,
        titleFee,
        insRate,
        registrationFee,
        initialCostBuy,
        initialCostLease,
        monthlyPaymentsBuy,
        monthlyGasPrice,
        monthlyRepairPrice,
        recurringCostBuy,
        monthlyLeasePayment,
        monthlyMileOverageLease,
        recurringCostLease,
        valueAfterFinance,
        costPerMileBuy,
        costPerMileLease
    }

    return calculatedData
}
