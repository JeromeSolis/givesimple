#import csv
import pandas as pd


def load_file():
#    tax_chart = []
#    with open('canada_charity_tax_credit.csv') as csv_file:
#        csv_reader = csv.reader(csv_file, delimiter=',')
#        for row in csv_reader:
#            tax_chart.append(row)
    tax_chart = pd.read_csv('canada_charity_tax_credit.csv')
    tax_chart.columns = ['region', 'rate_1_2017', 'rate_2_2017', 'rate_1_2016', 'rate_2_2016']
    return tax_chart;

def donation_ratio(yearly_income, donation_amount):
    ratio = donation_amount/yearly_income
    return ratio;

def tax_credit_calculator(donation_amount, yearly_income, province):
    federal_credit = 0
    provincial_credit = 0
    tax_chart = load_file()
    province_code = tax_chart.loc[tax_chart['region'] == province]
    if yearly_income > 200000 and donation_amount > 200:
        federal_credit = 200*tax_chart['rate_1_2017'].values[0] + \
                         min(yearly_income - 200000, donation_amount - 200)*0.33 + \
                         ((donation_amount-200) - min(yearly_income - 200000, donation_amount - 200))*tax_chart['rate_2_2017'].values[0]
        provincial_credit = 200*province_code['rate_1_2017'].values[0] + \
                            (donation_amount - 200)*province_code['rate_2_2017'].values[0]
    elif yearly_income <= 200000 and donation_amount > 200:
        federal_credit = 200*tax_chart['rate_1_2017'].values[0] + \
                         (donation_amount - 200)*tax_chart['rate_2_2017'].values[0]
        provincial_credit = 200*province_code['rate_1_2017'].values[0] + \
                            (donation_amount - 200)*province_code['rate_2_2017'].values[0]
    else:
        federal_credit = donation_amount*tax_chart['rate_1_2017'].values[0]
        provincial_credit = donation_amount*province_code['rate_1_2017'].values[0]
    return federal_credit, provincial_credit;

if __name__ == "__main__":
    donation_amount = float(input('How much have you given to charity this year?: '))
    yearly_income = float(input('What is your yearly gross income?: '))
    (federal_credit, provincial_credit) = tax_credit_calculator(donation_amount, yearly_income, 'QC')
    total_credit = federal_credit + provincial_credit
    donation_ratio = donation_ratio(yearly_income, donation_amount)
    print('Your donations represent ', '{:0.2f}'.format(donation_ratio*100), '% of your income')
    print('Your total charitable donation tax credit for this year is $', total_credit,' which represent ', '{:0.2f}'.format(total_credit/donation_amount*100), '% of your total donations')
