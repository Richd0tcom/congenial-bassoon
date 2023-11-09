import { transaction } from 'objection';
import { Transaction } from '../entities/transactions';
import User from '../entities/users';

const transaction_types = ['Deposit', 'Transfer', 'Withdraw'];
const transaction_actions = ['Credit', 'Debit'];

export const createTransactionForWallet = async (
  transaction_type: string,
  transaction_action: string,
  amount: string | number,
  user_id: string,
  description: string,
  reason: string
) => {
  return await transaction(Transaction, User, async (Transaction, User) => {
    if (isNaN(Number(amount))) {
      throw new Error('Invalid amount');
    }
    const user = await User.query()
      .findById(user_id)
      .catch((e) => {
        console.log(e);
      });

    if (!user) {
      throw new Error('user not found for transaction');
    }
    let wallet_balance = Number(user.wallet_balance);

    switch (transaction_action) {
      case 'Debit':
        if (Number(amount) > wallet_balance) {
          throw new Error('Insufficient Wallet Funds');
        }
        wallet_balance -= Number(amount);
        break;
      case 'Credit':
        wallet_balance += Number(amount);
        break;
      default:
        throw new Error('Invalid Transaction Action');
    }
    const [transaction_data, user_data] = await Promise.all([
      Transaction.query()
        .insert({
          amount,
          user_id: user.id,
          transaction_type,
          transaction_action,
          transaction_status: 'Success',
          description,
          reason,
        })
        .catch((e) => {
          console.log(e);
          throw new Error('Invalid Transaction body');
        }),

      User.query()
        .patchAndFetchById(user.id, {
          wallet_balance: wallet_balance.toString(),
        })
        .catch((e) => {
          console.log(e);
          throw new Error('Invalid User body');
        }),
    ]);

    return {
      transaction_data,
      user_data,
    };
  });
};
