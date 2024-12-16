import React from 'react'
import { BaseComponent, type ComponentProps } from './base'

export const ValtioApp: React.FC<ComponentProps> = (props) => {
  return <BaseComponent {...props} />
}

export const ValtioRequest: React.FC<ComponentProps> = (props) => {
  return <BaseComponent endpoint="e/request" {...props} />
}
