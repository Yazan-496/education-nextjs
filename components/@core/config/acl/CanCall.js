import React from "react"
import {Can } from './Can'

const CanCall = ({action, children}) => {
  return (
    <Can I='call' a={action}>
      {children}
    </Can>
  )
}

export default CanCall