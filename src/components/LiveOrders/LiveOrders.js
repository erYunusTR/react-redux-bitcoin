import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './LiveOrders.styles'

const useStyles = makeStyles(styles)

function LiveOrders() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <span>LiveOrders Component</span>
    </div>
  )
}

export default LiveOrders
