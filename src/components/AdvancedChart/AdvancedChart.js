import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import styles from './AdvancedChart.styles'
import TradingViewWidget from 'react-tradingview-widget';

const useStyles = makeStyles(styles)

function AdvancedChart() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TradingViewWidget
                autosize
                symbol="BTCUSDT"
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
