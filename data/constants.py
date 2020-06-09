import pandas as pd
from pathlib import Path

DATA_DIR = Path(__file__).parent
CANADA_CHARITY_TAX_CREDIT_DATA_PATH = DATA_DIR/"canada_charity_tax_credit.csv"
TAX_CREDIT_DATA = pd.read_csv(CANADA_CHARITY_TAX_CREDIT_DATA_PATH,
                              index_col='region')
FED = TAX_CREDIT_DATA.index[0]

"""
Financial variables
"""


class FirstDonationLimit:
    default = 200


class HighIncomeLimit:
    default = 200000


class HighIncomeTaxCredit:
    default = 0.33


""""
Graph variables
"""


class DonationRange:
    min_amount = 25
    max_percent_income = 0.1
