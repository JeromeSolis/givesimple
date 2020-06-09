import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from data import constants


def load_file():
    tax_chart = pd.read_csv(constants.CANADA_CHARITY_TAX_CREDIT_DATA_PATH)
    tax_chart.columns = ['region', 'rate_1_2017', 'rate_2_2017',
                         'rate_1_2016', 'rate_2_2016']
    return tax_chart


def donation_to_income_ratio(donation_amount, yearly_income):
    ratio = donation_amount/yearly_income
    return ratio


def credit_to_donation_ratio(tax_credit, donation_amount):
    ratio = tax_credit/yearly_income
    return ratio


def tax_credit_calculator(donation_amount, yearly_income, province):
    federal_credit = 0
    provincial_credit = 0
    tax_chart = load_file()
    province_code = tax_chart.loc[tax_chart['region'] == province]
    if (yearly_income > constants.HighIncomeLimit.default and
       donation_amount > constants.FirstDonationLimit.default):
        federal_credit = (constants.FirstDonationLimit.default *
                          tax_chart['rate_1_2017'].values[0] +
                          min(yearly_income -
                              constants.HighIncomeLimit.default,
                              donation_amount -
                              constants.FirstDonationLimit.default) *
                          constants.HighIncomeTaxCredit.default +
                          ((donation_amount -
                            constants.FirstDonationLimit.default) -
                           min(yearly_income -
                               constants.HighIncomeLimit.default,
                               donation_amount -
                               constants.FirstDonationLimit.default))
                          * tax_chart['rate_2_2017'].values[0])
        provincial_credit = (constants.FirstDonationLimit.default *
                             province_code['rate_1_2017'].values[0] +
                             (donation_amount -
                              constants.FirstDonationLimit.default) *
                             province_code['rate_2_2017'].values[0])
    elif (yearly_income <= constants.HighIncomeLimit.default and
          donation_amount > constants.FirstDonationLimit.default):
        federal_credit = (constants.FirstDonationLimit.default *
                          tax_chart['rate_1_2017'].values[0] +
                          (donation_amount -
                           constants.FirstDonationLimit.default) *
                          tax_chart['rate_2_2017'].values[0])
        provincial_credit = (constants.FirstDonationLimit.default *
                             province_code['rate_1_2017'].values[0] +
                             (donation_amount -
                              constants.FirstDonationLimit.default) *
                             province_code['rate_2_2017'].values[0])
    else:
        federal_credit = donation_amount * tax_chart['rate_1_2017'].values[0]
        provincial_credit = (donation_amount *
                             province_code['rate_1_2017'].values[0])
    return federal_credit, provincial_credit


def plot_analytics(yearly_income, province):
    donation_amount_range = np.linspace(50, int(yearly_income*0.1))
    tax_credit_range = np.zeros(len(donation_amount_range))
    tax_credit_range_percent = tax_credit_range
    iter = 0
    for donation_amount in donation_amount_range:
        temp_1, temp_2 = tax_credit_calculator(donation_amount, yearly_income,
                                               province)
        tax_credit_range[iter] = (temp_1 + temp_2)
        tax_credit_range_percent[iter] = tax_credit_range[iter]/donation_amount
        iter += 1
    plt.plot(donation_amount_range, tax_credit_range_percent*100)
    plt.xlabel('Donation amount (CAD)')
    plt.ylabel('Tax credit ratio (%)')
    plt.show()


if __name__ == "__main__":
    province = 'QC'
    donation_amount = float(input('How much have you given to charity ' +
                                  'this year?: '))
    yearly_income = float(input('What is your yearly gross income?: '))
    federal_credit, provincial_credit = tax_credit_calculator(donation_amount,
                                                              yearly_income,
                                                              province)
    total_credit = federal_credit + provincial_credit
    donation_ratio = donation_to_income_ratio(donation_amount, yearly_income)
    credit_ratio = credit_to_donation_ratio(total_credit, donation_amount)
    print('Your donations represent ', '{:0.2f}'.format(donation_ratio*100),
          '% of your income')
    print('Your total charitable donation tax credit for this year is $',
          '{:0.2f}'.format(total_credit), ' which represent ',
          '{:0.2f}'.format(credit_ratio*100), '% of your total donations')
    plot_analytics(yearly_income, province)
