import React from 'react'
import { useWindowDimensions, View, Alert } from 'react-native'
import { WebView } from 'react-native-webview'

export interface ComponentProps {
  host?: string
  onExit?: (detail: any) => void
  onLoad?: (detail: any) => void
  debug?: boolean
}

export interface BaseComponentProps extends ComponentProps {
  endpoint?: string
}

export const BaseComponent: React.FC<BaseComponentProps> = ({
  host = 'https://app.valtio.io',
  endpoint = '',
  onExit = () => {},
  onLoad = () => {},
  debug = false,
}) => {
  let ref: any
  const url = `${host}/${endpoint}#embedded=true`
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
