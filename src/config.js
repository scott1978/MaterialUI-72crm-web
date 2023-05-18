const getLocationOrigin = () => {
  return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
}

const companyName = 'UCRM'
const version = 'V11.1.1'
const baiduKey = '2d2fb5a342d7d5fa008ac35406ba82da'

export default {
  version,
  companyName,
  getLocationOrigin,
  baiduKey
}
