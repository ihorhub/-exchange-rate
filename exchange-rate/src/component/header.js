import React, { useState, useEffect } from 'react'
import { Rate } from './rate'
import exs from './exchangeStyle.module.scss'

const urlPrivat =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5 '

// JSON[
//   ({
//     ccy: 'RUR',
//     base_ccy: 'UAH',
//     buy: '0.28000',
//     sale: '0.32000'
//   },
//   {
//     ccy: 'EUR',
//     base_ccy: 'UAH',
//     buy: '19.20000',
//     sale: '20.00000'
//   },
//   {
//     ccy: 'USD',
//     base_ccy: 'UAH',
//     buy: '15.50000',
//     sale: '15.85000'
//   })
// ]
const urlFinance =
  'https://openexchangerates.org/api/latest.json?app_id=770556d2b59b4b4a8b064a5ca2df658e'
//   {
//     disclaimer: "Usage subject to terms: https://openexchangerates.org/terms",
//     license: "https://openexchangerates.org/license",
//     timestamp: 1582466108,
//     base: "USD",
//     rates: {
//         CNY: 7.0272,
//         UAH: 24.472774
//....................   }
// }
export const Header = () => {
  const [isLoading, setIsLoading] = useState(null)
  const [response, setResponse] = useState([])
  const [currency, setCurrency] = useState([])
  const [currencyRes, setCurrencyRes] = useState([])
  const [firstCurrency, setFirstCurrency] = useState()
  const [secondCurrency, setSecondCurrency] = useState()
  const [valueInputs, setValueInput] = useState(null)
  const [active, setActive] = useState(true)

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
  }

  const changeSecondCurrency = (e) => {
    setSecondCurrency(e.target.value)
  }

  let firstInput, secondInput
  if (active && firstCurrency !== undefined && secondCurrency !== undefined) {
    firstInput = valueInputs
    secondInput = (
      (valueInputs * currencyRes.rates[secondCurrency]) /
      currencyRes.rates[firstCurrency]
    ).toFixed(2)
  } else if (!active) {
    firstInput = (
      (valueInputs * currencyRes.rates[firstCurrency]) /
      currencyRes.rates[secondCurrency]
    ).toFixed(2)
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

  const option = response?.map((el) => (
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

  const LoadingIndicator = () => (
    <div className={exs.main_container}>
      <div className={exs.loader}>Loading...</div>
    </div>
  )
  return (
    <>
      {isLoading || isLoading === null ? (
        LoadingIndicator()
      ) : (
        <div className={exs.main_container}>
          <div className={exs.container_rate}>{option}</div>
          <p className={exs.text}>CONVERT -- {timedate}</p>

          <Rate
            currency={currency}
            selectedCurrency={firstCurrency}
            onChangeInput={handleFirstChange}
            onChangeCurrency={changeFirstCurrency}
            valueInput={firstInput}
          />
          <Rate
            currency={currency}
            onChangeInput={handleSecondChange}
            selectedCurrency={secondCurrency}
            onChangeCurrency={changeSecondCurrency}
            valueInput={secondInput}
          />

          <p>
            only for test "author": Ihor Babii <br />
            e-mail:"ihor.babiy2203@gmail.com"
          </p>
        </div>
      )}
    </>
  )
}
