import {faker} from '@faker-js/faker';
import albo from '@assets/sellers/1.webp';
import ecom from '@assets/sellers/3.webp';
import delight from '@assets/sellers/4.webp';
import whale from '@assets/sellers/7.webp';
import academy from '@assets/sellers/9.webp';
import oakley from '@assets/sellers/11.webp';
import { fetchUser } from '../services/URLservice';

const transactions = [
    {
        sku: faker.finance.accountNumber(5),
        timestamp: faker.date.past(),
        method: 'Visa',
        type: faker.finance.transactionType(),
        status: 'waiting',
        country: 'USA',
        currency: faker.finance.currencyCode(),
        fee: faker.finance.amount(1, 10000, 2),
        tax: faker.finance.amount(0, 1, 1),
        seller: {
            name: 'Albo E-Store',
            logo: albo,
        }
    },
]

export default transactions