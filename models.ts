const giving_what_we_can_pledge = 0.1
const donation_limit = 200
const high_income_tax_credit_rate = 0.33
const high_income_limit = 200000

var canada_charity_tax_credit_data = [
  {
    region: 'CA',
    rate_sub_200: 0.15,
    rate_over_200: 0.29,
  },
  {
    region: 'AB',
    rate_sub_200: 0.10,
    rate_over_200: 0.21,
  },
  {
    region: 'BC',
    rate_sub_200: 0.05,
    rate_over_200: 0.15,
  },
  {
    region: 'MB',
    rate_sub_200: 0.11,
    rate_over_200: 0.17,
  },
  {
    region: 'NB',
    rate_sub_200: 0.10,
    rate_over_200: 0.18,
  },
  {
    region: 'NL',
    rate_sub_200: 0.09,
    rate_over_200: 0.18,
  },
  {
    region: 'NS',
    rate_sub_200: 0.09,
    rate_over_200: 0.21,
  },
  {
    region: 'NT',
    rate_sub_200: 0.06,
    rate_over_200: 0.14,
  },
  {
    region: 'NU',
    rate_sub_200: 0.04,
    rate_over_200: 0.12,
  },
  {
    region: 'ON',
    rate_sub_200: 0.05,
    rate_over_200: 0.11,
  },
  {
    region: 'PE',
    rate_sub_200: 0.10,
    rate_over_200: 0.17,
  },
  {
    region: 'QC',
    rate_sub_200: 0.20,
    rate_over_200: 0.24,
  },
  {
    region: 'SK',
    rate_sub_200: 0.11,
    rate_over_200: 0.15,
  },
  {
    region: 'YT',
    rate_sub_200: 0.06,
    rate_over_200: 0.13,
  }
];

function getTaxCredit(donationAmount: number, yearlyIncome: number, highIncome: boolean, region: string) {
  let federalData = canada_charity_tax_credit_data.find(data => data.region === 'CA');
  let provincialData = canada_charity_tax_credit_data.find(data => data.region === region);
  let federalCredit: number = 0;
  let provincialCredit: number = 0;
  if (highIncome && donationAmount > donation_limit)
  {
    federalCredit = (donation_limit * federalData.rate_sub_200) + Math.min(yearlyIncome - high_income_limit, donationAmount - donation_limit) * high_income_tax_credit_rate + ((donationAmount - donation_limit) - Math.min(yearlyIncome - high_income_limit, donationAmount - donation_limit)) * federalData.rate_over_200;
    provincialCredit = (donation_limit * provincialData.rate_sub_200) + (donationAmount - donation_limit) * provincialData.rate_over_200;
  }
  else if (!highIncome && donationAmount > donation_limit)
  {
    federalCredit = (donation_limit * federalData.rate_sub_200) + (donationAmount - donation_limit) * federalData.rate_over_200;
    provincialCredit = (donation_limit * provincialData.rate_sub_200) + (donationAmount - donation_limit) * provincialData.rate_over_200;
  }
  else
  {
    federalCredit = donationAmount * federalData.rate_sub_200;
    provincialCredit = donationAmount * provincialData.rate_sub_200;
  }
  return [federalCredit, provincialCredit];
}

const value = getTaxCredit(20000, 215000, true, 'QC');
console.log(value[0] + value[1])
