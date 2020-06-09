from pathlib import Path

DATA_DIR = Path(__file__).parent
CANADA_CHARITY_TAX_CREDIT_DATA_PATH = DATA_DIR/"canada_charity_tax_credit.csv"


class FirstDonationLimit:
    default = 200


class HighIncomeLimit:
    default = 200000


class HighIncomeTaxCredit:
    default = 0.33
