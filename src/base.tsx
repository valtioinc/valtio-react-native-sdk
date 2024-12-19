import React from 'react'
import { useWindowDimensions, View, Alert } from 'react-native'
import { WebView } from 'react-native-webview'
import { flattenObject, isValidUrl } from './utils'

export interface ComponentProps {
  appID: string
  host?: string
  language?: 'en' | 'es'
  debug?: boolean
  onLoad?: (detail: any) => void
  onExit?: (detail: any) => void
}

export interface BaseComponentProps extends ComponentProps {
  endpoint?: string
}

export const BaseComponent: React.FC<BaseComponentProps> = ({
  appID,
  host = 'https://app.valtio.io',
  endpoint = '',
  language = 'en',
  onExit = () => {},
  onLoad = () => {},
  debug = false,
  ...extras
}) => {
  if (typeof appID !== 'string') {
    throw new TypeError(`'appID=${appID}' is not valid application ID.`)
  }

  if (!isValidUrl(host)) {
    throw new TypeError(`'host=${host}' is not a valid URL.`)
  }

  if (typeof endpoint !== 'string') {
    throw new TypeError(`'endpoint=${endpoint}' is not valid URL path.`)
  }

  if (!['en', 'es'].includes(language)) {
    throw new TypeError(`'language=${language}' is not a supported language`)
  }

  if (!(onExit instanceof Function)) {
    throw new TypeError(`'onExit=${onExit}' is not a valid callback function.`)
  }

  if (!(onLoad instanceof Function)) {
    throw new TypeError(`'onLoad=${onLoad}' is not a valid callback function.`)
  }

  const params = new URLSearchParams(
    flattenObject({
      embedded: 'true',
      appID,
      language,
      ...extras,
    })
  )
  const url = `${host}/${endpoint}#${params.toString()}`
  let ref: any
  const [ready, setReady] = React.useState<boolean>(false)
  const { width } = useWindowDimensions()

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WebView
          // @ts-ignore
          ref={(r: any) => (ref = r)}
          originWhitelist={['*']}
          incognito={false}
          style={{
            flexGrow: 1,
            width,
          }}
          source={{ uri: url }}
          onMessage={(syntheticEvent: any) => {
            debug && console.info('onMessage', syntheticEvent.nativeEvent)

            const { type, detail } = JSON.parse(syntheticEvent.nativeEvent.data)

            if (type === 'exit') {
              onExit && onExit(detail)
            }
          }}
          onShouldStartLoadWithRequest={(request: any) => {
            debug && console.info('onShouldStartLoadWithRequest', request)
            return true
          }}
          onLoad={(syntheticEvent: any) => {
            debug && console.info('onLoad', syntheticEvent.nativeEvent)
            setReady(true)
            onLoad && onLoad({ ready })
          }}
          onError={(syntheticEvent: any) => {
            console.error(syntheticEvent.nativeEvent)
            debug && console.error('onError', syntheticEvent.nativeEvent)
            Alert.alert(`1 - There was an error loading the Valtio Platform`)
            onExit && onExit({})
          }}
          onHttpError={(syntheticEvent: any) => {
            debug && console.error('onHttpError', syntheticEvent.nativeEvent)
            Alert.alert(`2 - There was an error loading the Valtio Platform`)
            onExit && onExit({})
          }}
          onRenderProcessGone={(syntheticEvent: any) => {
            debug && console.error('onRenderProcessGone', syntheticEvent.nativeEvent)
            ref?.reload()
          }}
          onContentProcessDidTerminate={(syntheticEvent: any) => {
            debug && console.error('onContentProcessDidTerminate', syntheticEvent.nativeEvent)
            ref?.reload()
          }}
        />
      </View>
    </View>
  )
}
