import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import styles from './LiveOrders.styles'
import {
    API_URL,
    CURRENCY_PAIR,
    LIVE_ORDERS_TABLE_LIMIT,
    ORDER_BOOK_AMOUNT_DIGITS,
    ORDER_BOOK_PRICE_DIGITS
} from "../../constants/constants";
import clsx from "clsx";

const useStyles = makeStyles(styles)

function TableHeader() {
    const classes = useStyles()

    return (
        <thead className={classes.tableHeader}>
        <tr>
            <th>Price(USD)</th>
            <th>Amount(BTC)</th>
            <th>Time</th>
        </tr>
        </thead>
    );
}

function LiveOrders() {
    const classes = useStyles()
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const subscribe = {
            event: 'bts:subscribe',
            data: {
                channel: `live_orders_${CURRENCY_PAIR}`
            }
        };

        const ws = new WebSocket(API_URL);

        ws.onopen = () => {
            ws.send(JSON.stringify(subscribe));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setOrders(orders => [response.data, ...orders.slice(0, LIVE_ORDERS_TABLE_LIMIT - 1)]);
        };
        ws.onclose = () => {
            ws.close();
        };

        return () => {
        };
    }, []);


    const orderRows = (arr) => (
        arr &&
        arr.map((item, index) => {
            const price = item.price;
            const amount = item.amount;
            const dateTime = item.datetime;
            const orderType = item.order_type;

            return (
                <tr key={index}>
                    <td className={clsx(classes.priceColumn, orderType == 0 ? classes.buyPriceColumn : classes.sellPriceColumn)}> {price && price.toFixed(ORDER_BOOK_PRICE_DIGITS)} </td>
                    <td className={classes.amountColumn}> {amount && amount.toFixed(ORDER_BOOK_AMOUNT_DIGITS)} </td>
                    <td className={classes.timeColumn}> {(dateTime)} </td>
                </tr>
            )
        })
    );

    return (
        <div className={classes.root}>
            <table className={classes.table}>
                <TableHeader/>
                <tbody>{orders && orderRows(orders)}</tbody>
            </table>
        </div>
    )
}

export default LiveOrders
