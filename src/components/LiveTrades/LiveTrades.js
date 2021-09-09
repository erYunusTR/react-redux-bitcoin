import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
    API_URL,
    CURRENCY_PAIR,
    AMOUNT_DIGITS,
    PRICE_DIGITS
} from "../../constants";
import clsx from "clsx";
import moment from "moment";
import styles from './LiveTrades.styles'
import stylesOrderBook from '../OrderBook/OrderBook.styles'

const useStyles = makeStyles(styles)
const useStylesOrderBook = makeStyles(stylesOrderBook)

function TableHeader() {
    const classes = useStyles()
    const classesOrderBook = useStylesOrderBook()

    return (
        <thead className={classesOrderBook.tableHeader}>
        <tr>
            <th className={classesOrderBook.tableTitle} colSpan="4">{"LIVE TRADES"}</th>
        </tr>
        <tr>
            <th className={classes.typeTh}>Type</th>
            <th className={classes.priceTh}>Price(USD)</th>
            <th className={classes.amountTh}>Amount(BTC)</th>
            <th className={classes.totalTh}>Time</th>
        </tr>
        </thead>
    );
}

function LiveTrades() {
    const classes = useStyles()
    const classesOrderBook = useStylesOrderBook()
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const subscribe = {
            event: 'bts:subscribe',
            data: {
                channel: `live_trades_${CURRENCY_PAIR}`
            }
        };

        const ws = new WebSocket(API_URL);

        ws.onopen = () => {
            ws.send(JSON.stringify(subscribe));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setOrders(orders => [response.data, ...orders]);
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
            const dateTime = item.timestamp;
            const type = parseInt(item.type);

            if (price && amount) {
                return (
                    <tr key={index}>
                        <td className={clsx(classes.typeColumn, type == 0 ? classesOrderBook.buyPriceColumn : classesOrderBook.sellPriceColumn)}> {type == 0 ? "BUY" : "SELL"} </td>
                        <td className={classes.priceColumn}> {price.toFixed(PRICE_DIGITS)} </td>
                        <td className={classes.amountColumn}> {amount.toFixed(AMOUNT_DIGITS)} </td>
                        <td className={classes.timeColumn}>{moment.unix(dateTime).format("HH:mm:ss")}</td>
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

export default LiveTrades
