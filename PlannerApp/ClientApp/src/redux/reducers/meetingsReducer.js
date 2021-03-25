import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function meetings(state = initialState.meetings, action = {}) {
  switch (action.type) {
    case types.MEETINGS_GET_USER:
      console.log(action.payload)
      const meetings = action.payload
      return meetings
    default:
      return state
  }
}
