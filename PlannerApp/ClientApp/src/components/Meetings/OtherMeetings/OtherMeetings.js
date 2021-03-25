import React from 'react'
import { connect } from 'react-redux'

const OtherMeetings = props => {
  const { meetings } = props
  if (Array.isArray(meetings) && meetings.length === 0) {
    return <React.Fragment>There are no other meetings</React.Fragment>
  }
  return <React.Fragment>a</React.Fragment>
}
export default connect(
  ({ meetings }) => ({ meetings }),
  {},
)(OtherMeetings)
