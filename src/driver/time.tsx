export const getTimestamp = (timestamp: string | null) => {
  var a = new Date(timestamp ? timestamp : Date.now())
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate()

  var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours()
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
  // var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()

  var time = `${date}. ${month} ${year}, ${hour}:${min}`
  return time
}
