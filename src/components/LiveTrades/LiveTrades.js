import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './LiveTrades.styles'

const useStyles = makeStyles(styles)

function LiveTrades() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <span>LiveTrades Component</span>
    </div>
  )
}

export default LiveTrades
