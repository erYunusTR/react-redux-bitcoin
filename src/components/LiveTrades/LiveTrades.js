import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import styles from './LiveTrades.styles'
import {
    API_URL,
    CURRENCY_PAIR,
    AMOUNT_DIGITS,
    PRICE_DIGITS,
    LIVE_TRADES_TABLE_LIMIT
} from "../../constants/constants";
import clsx from "clsx";
import moment from "moment";

const useStyles = makeStyles(styles)

function TableHeader() {
    const classes = useStyles()

    return (
        <thead className={classes.tableHeader}>
        <tr>
            <th colSpan="4">{"LIVE TRADES"}</th>
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
            setOrders(orders => [response.data, ...orders.slice(0, LIVE_TRADES_TABLE_LIMIT - 1)]);
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
                        <td className={clsx(classes.typeColumn, type == 0 ? classes.buyPriceColumn : classes.sellPriceColumn)}> {type == 0 ? "BUY" : "SELL"} </td>
                        <td className={classes.priceColumn}> {price.toFixed(PRICE_DIGITS)} </td>
                        <td className={classes.amountColumn}> {amount.toFixed(AMOUNT_DIGITS)} </td>
                        <td className={classes.timeColumn}>{moment.unix(dateTime).format("HH:mm:ss")}</td>
                    </tr>
                )
            }
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

export default LiveTrades
