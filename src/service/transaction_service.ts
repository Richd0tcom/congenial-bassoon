import { transaction } from 'objection';
import { Transaction } from '../entities/transactions';
import User from '../entities/users';

const transaction_types = ['Deposit', 'Transfer', 'Withdraw'];
const transaction_actions = ['Credit', 'Debit'];

export const createTransactionForBid = async (
  amount: string | number,
  from_user_id: string,
  to_user_id: string,
  description: string,
  reason: string
) => {
  return await transaction(Transaction, User, async (Transaction, User) => {
    if (isNaN(Number(amount))) {
      throw new Error('Invalid amount');
    }
    const from_user = await User.query()
      .findById(from_user_id)
      .catch((e) => {
        console.log(e);
      });

    const to_user = await User.query()
      .findById(to_user_id)
      .catch((e) => {
        console.log(e);
      });

    if (!from_user) {
      throw new Error('user not found for transaction');
    }
    if (!to_user) {
      throw new Error('user not found for transaction');
    }
    let from_wallet_balance = Number(from_user.wallet_balance);
    let to_wallet_balance = Number(to_user.wallet_balance);

    if (Number(amount) > from_wallet_balance) {
      throw new Error('Insufficient Wallet Funds');
    }
    from_wallet_balance -= Number(amount);
    to_wallet_balance += Number(amount);

    const [transaction_data1, transaction_data2, user_data1, user_data2] =
      await Promise.all([
        Transaction.query()
          .insert({
            amount,
            user_id: from_user.id,
            transaction_type: transaction_types[2],
            transaction_action: transaction_actions[1],
            transaction_status: 'Success',
            description,
            reason,
          })
          .catch((e) => {
            console.log(e);
            throw new Error('Invalid Transaction body');
          }),
        Transaction.query()
          .insert({
            amount,
            user_id: to_user.id,
            transaction_type: transaction_types[0],
            transaction_action: transaction_actions[0],
            transaction_status: 'Success',
            description,
            reason,
          })
          .catch((e) => {
            console.log(e);
            throw new Error('Invalid Transaction body');
          }),

        User.query()
          .patchAndFetchById(from_user.id, {
            wallet_balance: from_wallet_balance.toString(),
          })
          .catch((e) => {
            console.log(e);
            throw new Error('Invalid User body');
          }),
        User.query()
          .patchAndFetchById(to_user.id, {
            wallet_balance: to_wallet_balance.toString(),
          })
          .catch((e) => {
            console.log(e);
            throw new Error('Invalid User body');
          }),
      ]);

    return {
      transaction_data1,
      transaction_data2,
      user_data1,
      user_data2,
    };
  });
};
