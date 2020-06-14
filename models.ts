const giving_what_we_can_pledge = 0.1
const donation_limit = 200
const high_income_tax_credit_rate = 0.33

/*
Header: region, 2017 rates <=200, 2017 rates >200, 2016 rates <=200, 2016 rates >200
*/
const canada_charity_tax_credit_data: [string, number, number, number, number][] =
    [['CA', 0.15, 0.29, 0.15, 0.29],
    ['AB', 0.10, 0.21, 0.10, 0.21],
    ['BC', 0.05, 0.15, 0.05, 0.15],
    ['MB', 0.11, 0.17, 0.11, 0.17],
    ['NB', 0.10, 0.18, 0.10, 0.18],
    ['NL', 0.09, 0.18, 0.08, 0.17],
    ['NS', 0.09, 0.21, 0.09, 0.21],
    ['NT', 0.06, 0.14, 0.06, 0.14],
    ['NU', 0.04, 0.12, 0.04, 0.12],
    ['ON', 0.05, 0.11, 0.05, 0.11],
    ['PE', 0.10, 0.17, 0.10, 0.17],
    ['QC', 0.20, 0.24, 0.20, 0.24],
    ['SK', 0.11, 0.15, 0.11, 0.15],
    ['YT', 0.06, 0.13, 0.06, 0.13]];

function getData(region: string) {
  let data: [number, number, number, number]
  for (let index in canada_charity_tax_credit_data) {
    if (canada_charity_tax_credit_datap[index][0] == region)
      canada_charity_tax_credit_data.forEach(element => {

      });[index]
  }
}

function getTaxCredit(donationAmount: number, highIncomeLimit: boolean, region: string) {
  let federalCredit: number = 0;
  let provincialCredit: number = 0;
  if (!highIncomeLimit && donationAmount > donation_limit)
  {
    federalCredit = (donation_limit *
                     CanadaCharityTaxCredit.data[data[:][0] == region][1]) +
                     math.min()
  }
  else
  {
    federalCredit = (donationAmount * canada_charity_tax_credit_data[0][1]);
    provincialCredit = (donationAmount * canada_charity_tax_credit_data[region][1]);
  }
  return [federalCredit, provincialCredit];
}

const value = getTaxCredit(150, false, 'QC');
console.log(value[0] + value[1])
