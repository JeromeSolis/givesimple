import pandas as pd
from pathlib import Path

DATA_DIR = Path(__file__).parent
CANADA_CHARITY_TAX_CREDIT_DATA_PATH = DATA_DIR/"canada_charity_tax_credit.csv"
TAX_CREDIT_DATA = pd.read_csv(CANADA_CHARITY_TAX_CREDIT_DATA_PATH,
                              index_col='region')
FED = TAX_CREDIT_DATA.index[0]
GIVING_WHAT_WE_CAN_PLEDGE = 0.1

"""
Financial variables
"""


class DonationLimit:
    default = 200


class HighIncomeLimit:
    default = 200000


class HighIncomeTaxCreditRate:
    default = 0.33


""""
Graph variables
"""


class DonationPlotRange:
    min = 25
