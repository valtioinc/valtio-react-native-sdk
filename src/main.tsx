import React from 'react'
import { BaseComponent, type ComponentProps } from './base'

interface ValtioAppProps extends ComponentProps {
  userFirstName?: string
  userLastName?: string
  userEmail?: string
  userLanguage?: string
}

export const ValtioApp: React.FC<ValtioAppProps> = (props) => {
  return <BaseComponent {...props} />
}

export const ValtioRequest: React.FC<ComponentProps> = (props) => {
  return <BaseComponent endpoint="e/request" {...props} />
}
