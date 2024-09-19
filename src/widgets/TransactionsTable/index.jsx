// components
import Spring from '@components/Spring';
import StyledTable from './styles';
import CalendarSelector from '@components/CalendarSelector';
import Select from '@ui/Select';
import Pagination from '@ui/Pagination';
import TransactionCollapseItem from '@components/TransactionCollapseItem';
import Empty from '@components/Empty';
import React from "react";


// hooks
import { useState, useEffect } from 'react';
import usePagination from '@hooks/usePagination';
import { useWindowSize } from 'react-use';

// constants
import { TRANSACTIONS_COLUMN_DEFS } from '@constants/columnDefs';
import { TRANSACTIONS_SORT_OPTIONS } from '@constants/options';

// data placeholder
// import transactions from '@db/transactions';
import { fetchUser } from '../../services/URLservice';
import { useAsyncList } from '@react-stately/data';
import { getKeyValue, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const TransactionsTable = () => {
    const { width } = useWindowSize();
    const [activeCollapse, setActiveCollapse] = useState('');
    const [sort, setSort] = useState(TRANSACTIONS_SORT_OPTIONS[0]);
    // const [listUser, setListUser] = useState([]);
    // const [isLoading, setIsLoading] = React.useState(true);
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://swapi.py4e.com/api/people/');
                const result = await res.json();
                if (res) {
                    console.log(result);
                    setTransactions(result.results);                                        
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    // https://swapi.py4e.com/api/people/
    // http://192.168.0.126:8000/id_card/
    // let list = useAsyncList({
    //     async load({ signal }) {
    //         let res = await fetch('https://swapi.py4e.com/api/people/', {
    //             signal,
    //         });
    //         // let res = await fetchUser();
    //         let data = await res.json();
    //         console.log(data);
    //         setIsLoading(false);
    //         if (data) {
    //             setListUser(data)
    //         }
    //         return {
    //             items: data,
    //         };
    //     },
    // });

    const sortedData = transactions.sort((a, b) => {
        switch (sort.value) {
            default:
            case 'recent':
                return new Date(b.timestamp) - new Date(a.timestamp);
            case 'oldest':
                return new Date(a.timestamp) - new Date(b.timestamp);
            case 'amount-high-to-low':
                return b.fee.localeCompare(a.fee);
            case 'amount-low-to-high':
                return a.fee.localeCompare(b.fee);
        }
    });

    const pagination = usePagination(sortedData, 6);

    // go to first page when period or sort changes and reset active collapse
    useEffect(() => {
        pagination.goToPage(0);
        setActiveCollapse('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);

    // reset active collapse when page or window width changes
    useEffect(() => {
        setActiveCollapse('');
    }, [pagination.currentPage, width]);

    const handleCollapse = (sku) => {
        if (activeCollapse === sku) {
            setActiveCollapse('');
        } else {
            setActiveCollapse(sku);
        }
    }

    return (
        <>
            <Spring className="flex flex-col flex-1">
                {
                    width >= 768 ?
                        // <Table
                        //     aria-label="Example table with client side sorting"
                        //     classNames={{
                        //         table: "min-h-[400px]",
                        //     }}
                        // >
                        //     <TableHeader>
                        //         <TableColumn allowsSorting>
                        //             No
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             Full name
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             Sex
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             DoB
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             Nationality
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             DoE
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             PoD
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             PoR
                        //         </TableColumn>
                        //         <TableColumn allowsSorting>
                        //             Time
                        //         </TableColumn>
                        //     </TableHeader>
                        //     <TableBody
                        //     >
                        //         {/* {(item) => (
                        //             <TableRow>
                        //                 {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        //             </TableRow>
                        //         )} */}
                        //         {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        //             return (
                        //                 <TableRow>
                        //                     <TableCell>{item.no}</TableCell>
                        //                     <TableCell>{item.fullname}</TableCell>
                        //                     <TableCell>{item.sex}</TableCell>
                        //                     <TableCell>{item.DoB}</TableCell>
                        //                     <TableCell>{item.nationality}</TableCell>
                        //                     <TableCell>{item.DoE}</TableCell>
                        //                     <TableCell>{item.PoD}</TableCell>
                        //                     <TableCell>{item.PoR}</TableCell>
                        //                     <TableCell>{item.time}</TableCell>
                        //                 </TableRow>
                        //             )
                        //         })}
                        //     </TableBody>
                        // </Table>
                        <StyledTable columns={TRANSACTIONS_COLUMN_DEFS}
                                     dataSource={pagination.currentItems()}
                                    //  rowKey={record => record.sku}
                                     locale={{
                                            emptyText: <Empty text="No transactions found"/>
                                     }}
                                     pagination={false}/>
                        :
                        <div className="flex flex-1 flex-col gap-5 mb-[26px]">
                            {
                                pagination.currentItems().map((item, index) => (
                                    <TransactionCollapseItem key={item.sku}
                                        handleCollapse={handleCollapse}
                                        activeCollapse={activeCollapse}
                                        transaction={item} />
                                ))
                            }
                        </div>
                }
                {
                    pagination.maxPage > 1 && <Pagination pagination={pagination} />
                }
            </Spring>
        </>
    )
}

export default TransactionsTable