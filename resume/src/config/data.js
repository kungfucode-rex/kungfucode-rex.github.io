/**
 * Created by wlilo on 2017/3/7.
 */
import config from '@/config/config'
import axios from 'axios'
let data = null
axios.get('/static/data.json', {
  responseType: 'json'
})
  .then((response) => {
    data = response.data
    console.log(data)
  })
  .catch(function (error) {
    console.log(error)
  })
export default function () {
  return data[config.lang]
}
