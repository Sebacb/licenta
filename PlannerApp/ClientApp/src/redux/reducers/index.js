import { combineReducers } from 'redux'

// Imports: Reducers
import user from './userReducer'
import dashboard from './dashboardReducer'
import meetings from './meetingReducer'
import apiCallsInProgress from './apiStatusReducer'
import responsibles from './responsiblesReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
  user,
  dashboard,
  meetings,
  responsibles,
  apiCallsInProgress,
})

export default rootReducer
