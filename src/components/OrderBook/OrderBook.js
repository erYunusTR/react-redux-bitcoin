import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
    API_URL,
    CURRENCY_PAIR,
    PRICE_DIGITS,
    AMOUNT_DIGITS,
    TOTAL_DIGITS,
    ORDER_BOOK_TABLE_LIMIT
} from "../../constants";
import clsx from "clsx";
import styles from './OrderBook.styles'

const useStyles = makeStyles(styles)

function TableHeader() {
    const classes = useStyles()

    return (
        <thead className={classes.tableHeader}>
        <tr>
            <th className={classes.tableTitle} colSpan="3" >{"ORDER BOOK"}</th>
        </tr>
        <tr>
            <th className={classes.priceTh}>Price(USD)</th>
            <th className={classes.amountTh}>Amount(BTC)</th>
            <th className={classes.totalTh}>Total</th>
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

    const sortArrayBigToSmall = (array) => {
        return array && array.sort((a, b) => (a[0] + b[0]))
    }

    const sortArraySmallToBig = (array) => {
        return array && array.sort((a, b) => (a[0] - b[0]))
    }

    const limitArray = (array) => {
        if (array.length > ORDER_BOOK_TABLE_LIMIT) {
            let newArray = []
            newArray = array.slice(0, ORDER_BOOK_TABLE_LIMIT)
            return newArray
        } else {
            return array
        }
    }

    const orderRows = (array, type) => (
        array &&
        array.map((item, index) => {
            const price = parseFloat(item[0]);
            const amount = parseFloat(item[1]);
            const total = item[0] * item[1];
            return (
                <tr key={index}>
                    <td className={clsx(classes.priceColumn, type === ASKS ? classes.sellPriceColumn : classes.buyPriceColumn)}> {price.toFixed(PRICE_DIGITS)} </td>
                    <td className={classes.amountColumn}> {amount.toFixed(AMOUNT_DIGITS)} </td>
                    <td className={classes.totalColumn}> {total.toFixed(TOTAL_DIGITS)} </td>
                </tr>
            )
        })
    );

    return (
        <div className={classes.root}>
            <table className={classes.table}>
                <TableHeader/>
                {/*Order book asks*/}
                <tbody>{asks && orderRows(limitArray(sortArraySmallToBig(asks)).reverse(), ASKS)}</tbody>
                {/*Order book bids*/}
                <tbody>{bids && orderRows(limitArray(sortArrayBigToSmall(bids)), BIDS)}</tbody>
            </table>
        </div>
    )
}

export default OrderBook
