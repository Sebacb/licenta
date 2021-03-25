import * as React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Scheduler, WeekView } from '@progress/kendo-react-scheduler'
import {
  createMeeting,
  deleteMeeting,
} from '../../redux/actions/meetingActions'
import '@progress/kendo-date-math/tz/Europe/Bucharest'

const useStyles = makeStyles(theme => ({
  customScheduler: {
    height: '80vh !important',
  },
}))

const AppScheduler = props => {
  console.log('aschedluer', props)
  const classes = useStyles()
  const [view, setView] = React.useState('week')
  const [date, setDate] = React.useState(new Date(Date.now()))
  const [orientation, setOrientation] = React.useState('horizontal')
  const [data, setData] = React.useState([])

  const handleViewChange = React.useCallback(
    event => {
      setView(event.value)
    },
    [setView],
  )

  const parseAdjust = eventDate => {
    const date = new Date(eventDate)
    date.setFullYear(new Date().getFullYear())
    return date
  }

  React.useEffect(() => {
    const mergedArray = props.meetings.weekMeetings.map(row => {
      return {
        id: row.meetingId,
        start: new Date(row.start),
        startTimezone: null,
        end: new Date(row.end),
        endTimezone: null,
        isAllDay: false,
        title: row.subject,
        description: row.description,
        recurrenceRule: null,
        recurrenceId: null,
        recurrenceExceptions: null,
        roomId: 1,
        ownerID: props.user.id,
        personId: row.attendees[0].employeeId,
      }
    })
    setData(mergedArray)
  }, [props.meetings, props.user])

  const handleDateChange = React.useCallback(
    event => {
      setDate(event.value)
    },
    [setDate],
  )

  const handleDataChange = React.useCallback(
    ({ created, updated, deleted }) => {
      if (Array.isArray(created) && created.length > 0) {
        props.createMeeting({ ...created[0], userId: props.user.id })
        return
      }
      if (Array.isArray(deleted) && deleted.length > 0) {
        props.deleteMeeting({ userId: props.user.id, meetingId: deleted[0].id })
      }
    },
  )

  const renderResponsibles = () => {
    if (Array.isArray(props.responsibles) && props.responsibles.length === 0) {
      return []
    } else {
      return props.responsibles.map((r, idx) => {
        return {
          text: r.employeeName,
          value: r.employeeId,
          color: `#5${idx}${idx}2E4`,
        }
      })
    }
  }

  return (
    <Scheduler
      timezone="Europe/Bucharest"
      data={data}
      onDataChange={handleDataChange}
      view={view}
      onViewChange={handleViewChange}
      date={date}
      editable={true}
      onDateChange={handleDateChange}
      className={classes.customScheduler}
      group={{
        resources: ['Rooms'],
        orientation,
      }}
      resources={[
        {
          name: 'Rooms',
          data: [{ text: 'My Agenda', value: 1 }],
          field: 'RoomID',
          valueField: 'value',
          textField: 'text',
          colorField: 'color',
        },
        {
          name: 'Persons',
          data: renderResponsibles(),
          field: 'PersonIDs',
          valueField: 'value',
          textField: 'text',
          colorField: 'color',
        },
      ]}
    >
      <WeekView />
    </Scheduler>
  )
}

export default connect(
  ({ responsibles, user, meetings }) => ({ responsibles, user, meetings }),
  {
    createMeeting,
    deleteMeeting,
  },
)(AppScheduler)
