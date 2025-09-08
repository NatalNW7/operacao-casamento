import os
import pandas as pd


payments_file = os.path.join(os.getcwd(), 'payments.json')
users_file = os.path.join(os.getcwd(), 'users.json')

payments = pd.read_json(payments_file)
users = pd.read_json(users_file)

cancelled_payments = payments[payments['status'] == 'cancelled'].drop_duplicates(subset=['userId'])
approved_payments = payments[payments['status'] == 'approved'].drop_duplicates(subset=['userId'])


users_with_ticket = list()
users_without_ticket = list()

for cancelled_payment in cancelled_payments.to_dict(orient='records'):
    user_id = cancelled_payment['userId']
    user_name = users[users['id'] == user_id].iat[0, 1]
    # print(user_name)
    user_has_not_ticket = approved_payments[approved_payments['userId'] == user_id].dropna().empty
    if(user_has_not_ticket):
        print('Não tem ticket', user_name)
    else:
        print('Já tem', user_name)