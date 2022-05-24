import React, { useState, useEffect } from 'react'
import { Rate } from './rate'
import exs from './exchangeStyle.module.scss'
const urlFinance =
  'https://openexchangerates.org/api/latest.json?app_id=770556d2b59b4b4a8b064a5ca2df658e'
const urlPrivat =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5 '

export const Header = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState([])
  const [currency, setCurrency] = useState([])
  const [currencyRes, setCurrencyRes] = useState([])
  const [firstCurrency, setFirstCurrency] = useState(null)
  const [secondCurrency, setSecondCurrency] = useState(null)
  const [valueInputs, setValueInput] = useState()
  const [active, setActive] = useState(true)

  console.log(currency[0], 'rat currency[5]')
  console.log(currencyRes.rates[firstCurrency], 'currencyRes.rates')
  console.log(response, 'response')
  console.log(secondCurrency, 'secondCurrency')
  console.log(firstCurrency, 'firstCurrency')
  console.log(valueInputs, 'valueInputs')
  console.log(active, 'active')
  let firstInput, secondInput
  if (active && valueInputs != null && undefined) {
    secondInput =
      (valueInputs * currencyRes.rates[secondCurrency]) /
      currencyRes.rates[firstCurrency]
  } else {
    firstInput =
      (valueInputs * currencyRes.rates[firstCurrency]) /
      currencyRes.rates[secondCurrency]
  }

  useEffect(() => {
    try {
      setIsLoading(true)
      fetch(urlPrivat)
        .then((res) => res.json())
        .then((res) => {
          setResponse(res)
        })
    } catch (er) {
      console.error(er)
    } finally {
      setIsLoading(false)
    }
  }, [])
  useEffect(() => {
    try {
      setIsLoading(true)
      fetch(urlFinance)
        .then((res) => res.json())
        .then((res) => {
          const rat = Object.keys(res.rates)
          setCurrency([...rat])
          setCurrencyRes(res)
        })
    } catch (e) {
      console.error(e, 'error')
    } finally {
      setIsLoading(false)
    }
  }, [])
  const handleFirstChange = (e) => {
    setValueInput(e.target.value)
    setActive(true)
  }
  const handleSecondChange = (e) => {
    setValueInput(e.target.value)
    setActive(false)
  }
  const changeFirstCurrency = (e) => {
    setFirstCurrency(e.target.value)
    console.log(e.target, 'target')
  }
  const changeSecondCurrency = (e) => {
    setSecondCurrency(e.target.value)

    console.log(e.target, 'target')
  }
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
  const LoadingIndicator = () => <div className={exs.loading}>Loading...</div>
  return (
    <>
      {' '}
      {isLoading || isLoading === null ? (
        LoadingIndicator()
      ) : (
        <div className={exs.main_container}>
          <div className={exs.container_rate}>{option}</div>
          <p className={exs.text}>CONVERT -- {timedate}</p>
          <Rate
            currency={currency}
            // selectedCurrency={firstCurrency}
            onChangeInput={handleFirstChange}
            onChangeCurrency={changeFirstCurrency}
            valueInput={firstInput}
          />
          <Rate
            currency={currency}
            onChangeInput={handleSecondChange}
            // selectedCurrency={secondCurrency}
            onChangeCurrency={changeSecondCurrency}
            valueInput={secondInput}
          />
        </div>
      )}
    </>
  )
}
