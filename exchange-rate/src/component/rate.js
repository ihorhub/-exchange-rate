import React from 'react'
import exr from './exchangeStyle.module.scss'

export const Rate = ({
  currency,
  onChangeCurrency,
  // selectedCurrency,
  onChangeInput,
  valueInput
}) => {
  return (
    <>
      <div className={exr.container_exchange}>
        <div className={exr.exchange_block}>
          <input
            type="number"
            className={exr.container_input}
            value={valueInput}
            onChange={onChangeInput}
          />
          <select
            // name="select"
            // value={selectedCurrency}
            className={exr.select}
            onChange={onChangeCurrency}
          >
            {currency.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
