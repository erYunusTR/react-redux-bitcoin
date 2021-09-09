import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
    API_URL,
    CURRENCY_PAIR,
    LIVE_ORDERS_TABLE_LIMIT,
    AMOUNT_DIGITS,
    PRICE_DIGITS
} from "../../constants/constants";
import clsx from "clsx";
import moment from "moment";
import styles from './LiveOrders.styles'
import stylesOrderBook from '../OrderBook/OrderBook.styles'

const useStyles = makeStyles(styles)
const useStylesOrderBook = makeStyles(stylesOrderBook)

function TableHeader() {
    const classes = useStyles()
    const classesOrderBook = useStylesOrderBook()

    return (
        <thead className={classesOrderBook.tableHeader}>
        <tr>
            <th className={classesOrderBook.tableTitle} colSpan="3">{"LIVE ORDERS"}</th>
        </tr>
        <tr>
            <th className={classesOrderBook.priceTh}>Price(USD)</th>
            <th className={classesOrderBook.amountTh}>Amount(BTC)</th>
            <th className={classesOrderBook.totalTh}>Time</th>
        </tr>
        </thead>
    );
}

function LiveOrders() {
    const classes = useStyles()
    const classesOrderBook = useStylesOrderBook()
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

    const orderRows = (array) => (
        array &&
        array.map((item, index) => {
            const price = parseFloat(item.price);
            const amount = parseFloat(item.amount);
            const dateTime = item.datetime;
            const orderType = parseInt(item.order_type);

            if (price && amount) {
                return (
                    <tr key={index}>
                        <td className={clsx(classesOrderBook.priceColumn, orderType == 0 ? classesOrderBook.buyPriceColumn : classesOrderBook.sellPriceColumn)}> {price.toFixed(PRICE_DIGITS)} </td>
                        <td className={classesOrderBook.amountColumn}> {amount.toFixed(AMOUNT_DIGITS)} </td>
                        <td className={classesOrderBook.totalColumn}>{moment.unix(dateTime).format("HH:mm:ss")}</td>
                    </tr>
                )
            }
        })
    );

    return (
        <div className={classesOrderBook.root}>
            <table className={classesOrderBook.table}>
                <TableHeader/>
                <tbody>{orders && orderRows(orders)}</tbody>
            </table>
        </div>
    )
}

export default LiveOrders
