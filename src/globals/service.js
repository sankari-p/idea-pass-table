import { BASE_URL } from './app.properties'
export default (relativeUrl, successCallback) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('DEVENV')
    headers['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1YmI3MmExNGEzMDRiZjdlNjJlOGRiZWIiLCJpYXQiOjE1Mzk2OTU2ODMsImV4cCI6MTUzOTc4MjA4MywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiMmNlMjVkZjYtMTMxMS00Zjk4LTk0NTktYzgyMWI2YmYzYjVkIn0.Xy2j7Ryoo53zrWBRFmD7XMxgeHWyaerQtu_znEZAXZI'
  } else {
    headers['Authorization'] = localStorage.getItem('accessToken')
  }
  fetch(`${BASE_URL}/${relativeUrl}`, {
    headers
  })
    .then((response) => response.json())
    .then(successCallback)
}
