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

const calcLoanAmortization = (principle, apr, months) => {
    // Loan Amortization
    // A=P∗(r(1+r)^n)/(((1+r)^n)−1)
    const P = principle
    const r = apr / 100 / 12
    const n = months
    return P * ((r * (1 + r) ** n) / ((1 + r) ** n - 1))
}

const calcMonthlyGas = (mpm, mpg, price) => (mpm / mpg * price)

const calcMileOverage = mpm => ((mpm < 1000) ? 0 : ((mpm - 1000) * 0.2))


export function calculateBuyVsLease(formData) {
    const downPayment = parseFloat(formData.downPayment)
    const titleFee = parseFloat(formData.titleFee)
    const registrationFee = parseFloat(formData.registrationFee)
    const msrp = parseFloat(formData.msrp)
    const apr = parseFloat(formData.apr)
    const monthsFinanced = parseFloat(formData.monthsFinanced)
    const insRate = parseFloat(formData.insRate)
    const milesPerMonth = parseFloat(formData.milesPerMonth)
    const mpg = parseFloat(formData.mpg)
    const gasPrice = parseFloat(formData.gasPrice)
    const monthlyLeasePayment = parseFloat(formData.monthlyLeasePayment)
    const yearsToKeep = parseFloat(formData.yearsToKeep)
    const valueAfterDown = msrp - downPayment

    const salesTax = calcSalesTax(parseFloat(formData.salesTax), msrp)

    const initialCostBuy = downPayment

    const initialCostLease = downPayment + titleFee + registrationFee

    const financedBuy = msrp + salesTax + titleFee + registrationFee - downPayment


    const monthlyPaymentsBuy = calcLoanAmortization(
        financedBuy,
        apr,
        monthsFinanced
    )

    const monthlyGasPrice = calcMonthlyGas(
        milesPerMonth,
        mpg,
        gasPrice
    )

    const monthlyRepairPrice = msrp / 120

    const recurringCostBuy = monthlyPaymentsBuy + monthlyGasPrice + insRate + monthlyRepairPrice

    const monthlyMileOverageLease = calcMileOverage(milesPerMonth)
    const recurringCostLease = (
        monthlyLeasePayment
        + monthlyMileOverageLease
        + monthlyGasPrice
        + insRate
        + monthlyRepairPrice
    )

    let valueOfCar = 0
    if (yearsToKeep < 15) {
        valueOfCar = parseFloat(formData.displayDepreciationData[
            yearsToKeep - 1].value)
    }

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

    let totalCostBuy = (
        initialCostBuy + totalGasPrice + totalInsPrice + totalRepairPrice + totalFinanceCost
    ) - valueAfterFinance

    totalCostBuy = Math.floor(totalCostBuy)

    const totalMonthlyLeasePayments = yearsToKeep * 12 * (monthlyLeasePayment + monthlyMileOverageLease)

    const totalCostLease = (
        initialCostLease + totalGasPrice + totalInsPrice + totalRepairPrice + totalMonthlyLeasePayments
    )

    const costPerMileBuy = (
        totalCostBuy / (milesPerMonth * 12 * yearsToKeep)
    )
    const costPerMileLease = (
        totalCostLease / (milesPerMonth * 12 * yearsToKeep)
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
        financed: financedBuy,
        valueAfterDown,
        costPerMileBuy,
        costPerMileLease
    }

    return calculatedData
}
