import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import styles from './App.styles'
import {Grid} from "@material-ui/core";
import OrderBook from "./components/OrderBook";
import LiveOrders from "./components/LiveOrders";
import LiveTrades from "./components/LiveTrades";
import AdvancedChart from "./components/AdvancedChart";

const useStyles = makeStyles(styles)

function App() {
    const classes = useStyles()

    return (
        <div className={classes.app}>
            <div className={classes.gridContainer}>
                <div className={classes.orderBook}>
                    <OrderBook/>
                </div>
                <div className={classes.liveOrders}>
                    <LiveOrders/>
                </div>
                <div className={classes.liveTrades}>
                    <LiveTrades/>
                </div>
                <div className={classes.advancedChart}>
                    <AdvancedChart/>
                </div>
                <div className={classes.left}/>
                <div className={classes.right}/>
            </div>
        </div>
    );
}

export default App;
