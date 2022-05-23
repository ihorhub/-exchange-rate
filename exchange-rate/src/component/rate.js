import React from 'react'
import exr from './exchangeStyle.module.scss'
export const Rate = () => {
  return (
    <>
      <div className={exr.container_exchange}>
        <div>
          <input type="number" className={exr.container_input} />
          <select name="select" className={exr.select}>
            <option value="value1">Значение 1</option>
            <option value="value2" selected>
              Значение 2
            </option>
            <option value="value3">Значение 3</option>
          </select>
        </div>
        <div>
          <input type="number" className={exr.container_input} />
          <select name="select" className={exr.select}>
            <option value="value1">Значение 1</option>
            <option value="value2" selected>
              Значение 2
            </option>
            <option value="value3">Значение 3</option>
          </select>
        </div>
      </div>
    </>
  )
}
