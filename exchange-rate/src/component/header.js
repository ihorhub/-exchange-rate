import React, { useState, useEffect } from 'react'
import { Rate } from './rate'
import exs from './exchangeStyle.module.scss'
const urlFinance =
  'https://openexchangerates.org/api/latest.json?app_id=770556d2b59b4b4a8b064a5ca2df658e'
const urlPrivat =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5 '

export const Header = () => {
  const [response, setResponse] = useState([])
  const [currency, setCurrency] = useState([])
  const [currencyRes, setCurrencyRes] = useState([])
  console.log(currency, 'rat')
  console.log(currencyRes, 'currencyRes')
  console.log(response, 'response')
  useEffect(() => {
    try {
      fetch(urlFinance)
        .then((res) => res.json())
        .then((res) => {
          const rat = Object.keys(res.rates)
          setCurrency([...rat])
          setCurrencyRes(res)
        })
    } catch (e) {
      console.error(e, 'error')
    }
  }, [])

  useEffect(() => {
    try {
      fetch(urlPrivat)
        .then((res) => res.json())
        .then((res) => {
          setResponse(res)
        })
    } catch (er) {
      console.error(er)
    }
  }, [])

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
    let time = date + ' ' + month + ' ' + year
    return time
  }

  let timedate = timeConverter(currencyRes.timestamp)
  const option = response.map((el) => (
    <div className={exs.container_rate_ccy}>
      <p className={exs.style_rate_ccy}> {el.ccy} </p>
      <p className={exs.style_rate}>
        buy: {+el.buy} {el.base_ccy}
      </p>
      <p className={exs.style_rate}>
        sale: {+el.sale} {el.base_ccy}
      </p>
    </div>
  ))

  return (
    <>
      <div className={exs.main_container}>
        <div className={exs.container_rate}>{option}</div>
        <p className={exs.text}>CONVERT -- {timedate}</p>
        <Rate currency={currency} />
        <Rate currency={currency} />
      </div>
    </>
  )
}
