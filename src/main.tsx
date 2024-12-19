import React from 'react'
import { BaseComponent, type ComponentProps } from './base'

interface ValtioAppProps extends ComponentProps {
  user: {
    first_name?: string
    last_name?: string
    email?: string
  }
}

export const ValtioApp: React.FC<ValtioAppProps> = (props) => {
  return <BaseComponent {...props} />
}

export const ValtioRequest: React.FC<ComponentProps> = (props) => {
  return <BaseComponent endpoint="e/request" {...props} />
}
