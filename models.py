from data import constants
from data.constants import FED
from data.constants import TAX_CREDIT_DATA as tax_chart


def get_tax_credit(donation_amount, yearly_income, province):
    federal_credit = 0
    provincial_credit = 0
    if (yearly_income > constants.HighIncomeLimit.default and
       donation_amount > constants.DonationLimit.default):
        federal_credit = (constants.DonationLimit.default *
                          tax_chart.loc[FED, '2017 rates <=200'] +
                          min(yearly_income -
                              constants.HighIncomeLimit.default,
                              donation_amount -
                              constants.DonationLimit.default) *
                          constants.HighIncomeTaxCreditRate.default +
                          ((donation_amount -
                            constants.DonationLimit.default) -
                           min(yearly_income -
                               constants.HighIncomeLimit.default,
                               donation_amount -
                               constants.DonationLimit.default)) *
                          tax_chart.loc[FED, '2017 rates >200'])
        provincial_credit = (constants.DonationLimit.default *
                             tax_chart.loc[province, '2017 rates <=200'] +
                             (donation_amount -
                              constants.DonationLimit.default) *
                             tax_chart.loc[province, '2017 rates >200'])
    elif (yearly_income <= constants.HighIncomeLimit.default and
          donation_amount > constants.DonationLimit.default):
        federal_credit = (constants.DonationLimit.default *
                          tax_chart.loc[FED, '2017 rates <=200'] +
                          (donation_amount -
                           constants.DonationLimit.default) *
                          tax_chart.loc[FED, '2017 rates >200'])
        provincial_credit = (constants.DonationLimit.default *
                             tax_chart.loc[province, '2017 rates <=200'] +
                             (donation_amount -
                              constants.DonationLimit.default) *
                             tax_chart.loc[province, '2017 rates >200'])
    else:
        federal_credit = (donation_amount *
                          tax_chart.loc[FED, '2017 rates <=200'])
        provincial_credit = (donation_amount *
                             tax_chart.loc[province, '2017 rates <=200'])
    return federal_credit, provincial_credit
