import React, { useState, useEffect } from 'react'
import exs from './exchangeStyle.module.scss'
const urlFinance =
  // 'https://openexchangerates.org/api/latest.json?app_id=770556d2b59b4b4a8b064a5ca2df658e'
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5 '

export const Header = () => {
  const [response, setResponse] = useState([])
  useEffect(() => {
    fetch(urlFinance)
      .then((res) => res.json())
      .then((res) => {
        setResponse(
          res
          // ccy: res.ccy,
          // base_ccy: res.base_ccy,
          // buy: res.buy,
          // sale: res.sale
        )
      })

    return () => {}
  }, [])
  console.log(response, 'respons')

  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000)
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    let year = a.getFullYear()
    let month = months[a.getMonth()]
    let date = a.getDate()
    let hour = a.getHours()
    let min = a.getMinutes()
    let sec = a.getSeconds()
    let time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
  }
  const option = response.map((el) => (
    <div className={exs.container_rate_ccy}>
      <p className={exs.style_rate}> {el.ccy}</p>
      <p className={exs.style_rate}>
        buy: {+el.buy} {el.base_ccy}
      </p>
      <p className={exs.style_rate}>
        sale: {+el.sale} {el.base_ccy}
      </p>
    </div>
  ))
  // console.log(timeConverter(0))

  // let now = new Date()
  // console.log(now)
  return (
    <div>
      <div className={exs.main_container}>
        <div className={exs.container_rate}>{option}</div>

        <div className={exs.container_exchange}>
          <div>
            <input type="number" className={exs.container_input} />
            <select name="select" className={exs.select}>
              <option value="value1">Значение 1</option>
              <option value="value2" selected>
                Значение 2
              </option>
              <option value="value3">Значение 3</option>
            </select>
          </div>
          <div>
            <input type="number" className={exs.container_input} />
            <select name="select" className={exs.select}>
              <option value="value1">Значение 1</option>
              <option value="value2" selected>
                Значение 2
              </option>
              <option value="value3">Значение 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
