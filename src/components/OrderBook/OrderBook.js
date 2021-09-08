import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import styles from './OrderBook.styles'
import {
    API_URL,
    CURRENCY_PAIR,
    ORDER_BOOK_AMOUNT_DIGITS, ORDER_BOOK_PRICE_DIGITS,
    ORDER_BOOK_TABLE_LIMIT,
    ORDER_BOOK_TOTAL_DIGITS
} from "../../constants/constants";

const useStyles = makeStyles(styles)

function TableHeader() {
    const classes = useStyles()

    return (
        <thead className={classes.tableHeader}>
        <tr>
            <th>Price(USD)</th>
            <th>Amount(BTC)</th>
            <th>Total</th>
        </tr>
        </thead>
    );
}

function OrderBook() {
    const classes = useStyles()
    const [orders, setOrders] = useState([]);
    const ASKS = "ASKS"
    const BIDS = "BIDS"

    useEffect(() => {
        const subscribe = {
            event: 'bts:subscribe',
            data: {
                channel: `order_book_${CURRENCY_PAIR}`
            }
        };
        const ws = new WebSocket(API_URL);

        ws.onopen = () => {
            ws.send(JSON.stringify(subscribe));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setOrders(response.data);
        };
        ws.onclose = () => {
            ws.close();
        };

        return () => {
            ws.close();
        };
    }, []);

    const {bids, asks} = orders;

    const sortArrayBigToSmall = (arr) => {
        return arr && arr.sort((a, b) => (a[0] + b[0]))
    }

    const sortArraySmallToBig = (arr) => {
        return arr && arr.sort((a, b) => (a[0] - b[0]))
    }

    const limitArray = (arr) => {
        let newArray = []
        arr &&
        arr.map((item, index) => {
            if (index < ORDER_BOOK_TABLE_LIMIT) {
                newArray.push(item)
            }
        })
        return newArray
    }

    const orderRows = (arr, type) => (
        arr &&
        arr.map((item, index) => {
            const price = parseFloat(item[0]);
            const amount = parseFloat(item[1]);
            const total = item[0] * item[1];
            return (
                <tr key={index}>
                    <td className={type === ASKS ? classes.asksColumn : classes.bidsColumn}> {price.toFixed(ORDER_BOOK_PRICE_DIGITS)} </td>
                    <td> {amount.toFixed(ORDER_BOOK_AMOUNT_DIGITS)} </td>
                    <td style={{textAlign: "right"}}> {total.toFixed(ORDER_BOOK_TOTAL_DIGITS)} </td>
                </tr>
            )
        })
    );

    return (
        <div className={classes.root}>
            {/*Order book asks table*/}
            <table className={classes.table}>
                <TableHeader/>
                <tbody>{asks && orderRows(limitArray(sortArraySmallToBig(asks)).reverse(), ASKS)}</tbody>
            </table>
            {/*Order book bids table*/}
            <table className={classes.table}>
                <TableHeader/>
                <tbody>{bids && orderRows(limitArray(sortArrayBigToSmall(bids)), BIDS)}</tbody>
            </table>
        </div>
    )
}

export default OrderBook
