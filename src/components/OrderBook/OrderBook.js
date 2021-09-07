import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './OrderBook.styles'

const useStyles = makeStyles(styles)

function OrderBook() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <span>OrderBook Component</span>
    </div>
  )
}

export default OrderBook
