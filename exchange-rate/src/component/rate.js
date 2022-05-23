import React from 'react'
import exr from './exchangeStyle.module.scss'

export const Rate = ({ currency }) => {
  return (
    <>
      <div className={exr.container_exchange}>
        <div className={exr.exchange_block}>
          <input type="number" className={exr.container_input} />
          <select name="select" className={exr.select}>
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
