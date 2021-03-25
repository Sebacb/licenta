const DEV_URL = 'https://localhost'
const PRODUCTION_URL = 'http://meetapp.itcompany.ro'

const BASE_URL_DEV = DEV_URL + ':44374/api'
const BASE_URL_PRODUCTION = PRODUCTION_URL + '/'

export const getAppBaseUrl = () => {
  switch (process.env.REACT_APP_BUILD_FOR) {
    case 'PRODUCTION':
      return BASE_URL_PRODUCTION
    default:
      return BASE_URL_DEV
  }
}
