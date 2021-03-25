import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}))

const Requests = () => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                My open requests
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Create a new request
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </React.Fragment>
  )
}
export default Requests
