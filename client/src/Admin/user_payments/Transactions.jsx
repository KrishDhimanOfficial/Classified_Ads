import React, { useEffect, useState } from 'react'
import { Notify } from '../../hooks/hooks'
import { DataService, GetCookie } from '../../hooks/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "motion/react"

const Transactions = () => {
    const navigate = useNavigate()
    const [transactions, settransactions] = useState([])
    const [pagination, setpagination] = useState({})

    const fetchTransctions = async (page) => {
        const res = await DataService.post(`/seller/payment-transactions?page=${page}`, {}, {
            headers: {
                'Authorization': `Bearer ${GetCookie(navigate)}`,
            }
        })
        Notify(res)
        settransactions(res.collectionData)
        delete res.collectionData
        setpagination(res)
    }
    useEffect(() => { fetchTransctions() }, [])
    return (
        <>
            <div className="d-flex justify-content-center">
                <h4>Payments History</h4>
            </div>
            <motion.table
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="table">
                <thead>
                    <tr>
                        <th>Payment Status</th>
                        <th>Deposit Amount</th>
                        <th>Deposit Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions?.map((transaction, i) => (
                            <motion.tr
                                key={i}
                                initial={{ opacity: 0, translateX: 100 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <td>
                                    <span className={transaction.status ? 'status-completed' : 'status-cancel'}>
                                        {transaction.status ? 'Completed' : 'Cancel'}
                                    </span>
                                </td>
                                <td> <i className="fa-solid fa-indian-rupee-sign"></i> {transaction.amount}</td>
                                <td>{transaction.formattedDate} {transaction.formattedtime}</td>
                            </motion.tr>
                        ))
                    }
                </tbody>
            </motion.table>
            <div className='w-100 d-flex justify-content-center'>
                <ul className="back-pagination">
                    {pagination.prevpage && (
                        <li className="back-next">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                fetchTransctions(pagination.page - 1)
                            }}> Previous </Link>
                        </li>
                    )}
                    {
                        pagination?.totalDocs > pagination?.limit && (
                            Array.from({ length: pagination.totalPages })?.map((_, i) => (
                                <li key={i}>
                                    <Link to="#" onClick={(e) => {
                                        e.preventDefault()
                                        fetchTransctions(i + 1)
                                    }}>{i + 1}</Link>
                                </li>
                            ))
                        )
                    }
                    {pagination.nextpage && (
                        <li className="back-next p-0">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                fetchTransctions(pagination.page + 1)
                            }
                            }> Next </Link>
                        </li>
                    )}
                </ul>
            </div >
        </>
    )
}

export default React.memo(Transactions)