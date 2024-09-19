// components
import PageHeader from '@layout/PageHeader';
import TransactionsTable from '@widgets/TransactionsTable';

const Transactions = () => {
    return (
        <>
            <PageHeader title="History"/>
            <TransactionsTable/>
        </>
    )
}

export default Transactions