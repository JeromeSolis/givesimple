import matplotlib.pyplot as plt
import numpy as np
from data import constants
from models import get_tax_credit


def get_donation_to_income_ratio(donation_amount, yearly_income):
    ratio = donation_amount/yearly_income
    return ratio


def get_credit_to_donation_ratio(tax_credit, donation_amount):
    ratio = tax_credit/donation_amount
    return ratio


def plot_donation_to_credit_ratio(yearly_income, province):
    donation_amount_range = np.linspace(constants.DonationPlotRange.min,
                                        int(yearly_income * constants.
                                            GIVING_WHAT_WE_CAN_PLEDGE))
    tax_credit_range = np.zeros(len(donation_amount_range))
    tax_credit_range_percent = tax_credit_range
    iter = 0
    for donation_amount in donation_amount_range:
        temp_1, temp_2 = get_tax_credit(donation_amount, yearly_income,
                                        province)
        tax_credit_range[iter] = (temp_1 + temp_2)
        tax_credit_range_percent[iter] = tax_credit_range[iter]/donation_amount
        iter += 1
    plt.plot(donation_amount_range, tax_credit_range_percent*100)
    plt.xlabel('Donation amount (CAD)')
    plt.ylabel('Tax credit ratio (%)')
    plt.show()
