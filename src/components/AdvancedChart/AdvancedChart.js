import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import styles from './AdvancedChart.styles'
import TradingViewWidget from 'react-tradingview-widget';
import {CURRENCY_PAIR} from "../../constants";

const useStyles = makeStyles(styles)

function AdvancedChart() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TradingViewWidget
                autosize
                symbol={CURRENCY_PAIR.toUpperCase()}
                interval="15"
                theme="Dark"
                style="1"
                locale="tr"
                toolbar_bg="#161a1e"
            />
        </div>

    )
}

export default AdvancedChart
