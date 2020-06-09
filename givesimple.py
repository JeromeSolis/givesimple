import models
import analytics


if __name__ == "__main__":
    province = 'QC'
    donation_amount = float(input('How much have you given to charity ' +
                                  'this year?: '))
    yearly_income = float(input('What is your yearly gross income?: '))
    federal_credit, provincial_credit = models.get_tax_credit(donation_amount,
                                                              yearly_income,
                                                              province)
    total_credit = federal_credit + provincial_credit
    donation_ratio = analytics.get_donation_to_income_ratio(donation_amount,
                                                            yearly_income)
    credit_ratio = analytics.get_credit_to_donation_ratio(total_credit,
                                                          donation_amount)
    print('Your donations represent', '{:0.2f}'.format(donation_ratio*100),
          '% of your income')
    print('Your total charitable donation tax credit for this year is $',
          '{:0.2f}'.format(total_credit), 'which represent',
          '{:0.2f}'.format(credit_ratio*100), '% of your total donations')
    analytics.plot_donation_to_credit_ratio(yearly_income, province)
