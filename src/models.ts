const giving_what_we_can_pledge = 0.1
const donation_limit = 200
const high_income_tax_credit_rate = 0.33
const high_income_limit = 200000

type Region =
    | 'CA'
    | 'AB'
    | 'BC'
    | 'MB'
    | 'NB'
    | 'NL'
    | 'NS'
    | 'NT'
    | 'NU'
    | 'ON'
    | 'PE'
    | 'QC'
    | 'SK'
    | 'YT'

interface CreditData {
    overThresholdRate: number
    underThresholdRate: number
    region: Region
}

const CreditMap: Record<Region, CreditData> = {
    CA: {
        region: 'CA',
        underThresholdRate: 0.15,
        overThresholdRate: 0.29,
    },
    AB: {
        region: 'AB',
        underThresholdRate: 0.1,
        overThresholdRate: 0.21,
    },
    BC: {
        region: 'BC',
        underThresholdRate: 0.05,
        overThresholdRate: 0.15,
    },
    MB: {
        region: 'MB',
        underThresholdRate: 0.11,
        overThresholdRate: 0.17,
    },
    NB: {
        region: 'NB',
        underThresholdRate: 0.1,
        overThresholdRate: 0.18,
    },
    NL: {
        region: 'NL',
        underThresholdRate: 0.09,
        overThresholdRate: 0.18,
    },
    NS: {
        region: 'NS',
        underThresholdRate: 0.09,
        overThresholdRate: 0.21,
    },
    NT: {
        region: 'NT',
        underThresholdRate: 0.06,
        overThresholdRate: 0.14,
    },
    NU: {
        region: 'NU',
        underThresholdRate: 0.04,
        overThresholdRate: 0.12,
    },
    ON: {
        region: 'ON',
        underThresholdRate: 0.05,
        overThresholdRate: 0.11,
    },
    PE: {
        region: 'PE',
        underThresholdRate: 0.1,
        overThresholdRate: 0.17,
    },
    QC: {
        region: 'QC',
        underThresholdRate: 0.2,
        overThresholdRate: 0.24,
    },
    SK: {
        region: 'SK',
        underThresholdRate: 0.11,
        overThresholdRate: 0.15,
    },
    YT: {
        region: 'YT',
        underThresholdRate: 0.06,
        overThresholdRate: 0.13,
    },
}

function getTaxCredit(
    donationAmount: number,
    yearlyIncome: number,
    highIncome: boolean,
    region: Region,
) {
    const federalData = CreditMap.CA
    const provincialData = CreditMap[region]
    let federalCredit: number = 0
    let provincialCredit: number = 0
    if (highIncome && donationAmount > donation_limit) {
        federalCredit =
            donation_limit * federalData.underThresholdRate +
            Math.min(
                yearlyIncome - high_income_limit,
                donationAmount - donation_limit,
            ) *
                high_income_tax_credit_rate +
            (donationAmount -
                donation_limit -
                Math.min(
                    yearlyIncome - high_income_limit,
                    donationAmount - donation_limit,
                )) *
                federalData.overThresholdRate
        provincialCredit =
            donation_limit * provincialData.underThresholdRate +
            (donationAmount - donation_limit) * provincialData.overThresholdRate
    } else if (!highIncome && donationAmount > donation_limit) {
        federalCredit =
            donation_limit * federalData.underThresholdRate +
            (donationAmount - donation_limit) * federalData.overThresholdRate
        provincialCredit =
            donation_limit * provincialData.underThresholdRate +
            (donationAmount - donation_limit) * provincialData.overThresholdRate
    } else {
        federalCredit = donationAmount * federalData.underThresholdRate
        provincialCredit = donationAmount * provincialData.underThresholdRate
    }
    return [federalCredit, provincialCredit]
}

const value = getTaxCredit(20000, 215000, true, 'QC')
console.log(value[0] + value[1])
