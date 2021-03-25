import React from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Popover from '@material-ui/core/Popover'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DuoIcon from '@material-ui/icons/Duo'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import TodayIcon from '@material-ui/icons/Today'

import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { getMeetingInfo } from '../../redux/actions/meetingActions'
import { getDashboardInfo } from '../../redux/actions/dashboardActions'
import { getResponsibles } from '../../redux/actions/responsiblesActions'
import { getNotifications } from '../../redux/actions/userActions'

const NavigationBar = props => {
  const [open, setOpen] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const drawerWidth = 240
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const useStyles = makeStyles(theme => ({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    typography: {
      padding: theme.spacing(2),
    },
  }))
  const classes = useStyles()
  const popoverOpen = Boolean(anchorEl)
  const id = popoverOpen ? 'simple-popover' : undefined

  const redirectTo = page => {
    switch (page) {
      case 'Home':
        props.getDashboardInfo(props.user.id)
        props.getNotifications(props.user.id)
        props.history.push('/')
        break
      case 'Meetings':
        props.user && props.getMeetingInfo(props.user.id)
        props.history.push('/meetings')
        break
      case 'Calendar':
        props.user && props.getResponsibles(props.user.id)
        props.history.push('/calendar')
        break
      case 'Requests':
        props.history.push('/requests')
        break
      case 'Calls':
        props.history.push('/calls')
        break
    }
  }

  const handlePopoverClick = event => {
    setAnchorEl(event.currentTarget)
    console.log('popOver click')
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const renderNotifications = () => {
    if (!props.user.notifications || props.user.notifications.length === 0) {
      return (
        <Typography className={classes.typography}>
          The content of the Popover.
        </Typography>
      )
    } else {
      return props.user.notifications.map((row, idx) => {
        return (
          <Typography key={idx} className={classes.typography}>
            {new Date(row.notificationDate).toDateString()} -{' '}
            {row.notificationMessage}{' '}
            <IconButton aria-label="delete" className={classes.margin}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Typography>
        )
      })
    }
  }

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handlePopoverClick}>
            <Badge
              badgeContent={props.user && props.user.notifications && props.user.notifications.length}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={popoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {/* <Typography className={classes.typography}>
              The content of the Popover.
            </Typography> */}
            {renderNotifications()}
          </Popover>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => redirectTo('Home')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => redirectTo('Meetings')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Meetings" />
          </ListItem>
          <ListItem button onClick={() => redirectTo('Calendar')}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          {/* <ListItem button onClick={() => redirectTo('Requests')}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Requests" />
          </ListItem> */}
          <ListItem button onClick={() => redirectTo('Calls')}>
            <ListItemIcon>
              <DuoIcon />
            </ListItemIcon>
            <ListItemText primary="Calls" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default connect(({ user }) => ({ user }), {
  getDashboardInfo,
  getMeetingInfo,
  getResponsibles,
  getNotifications,
})(NavigationBar)
