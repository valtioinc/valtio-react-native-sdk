<h1 align="center">🛡Valtio React SDK</h1>
<h3 align="center">SDK for embedding Valtio UI elements into React Native applications.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/@valtioinc/valtio-react-sdk">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@valtioinc/valtio-react-sdk/latest.svg">
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk/actions/workflows/ci.yml">
    <img alt="Build states" src="https://github.com/valtioinc/valtio-react-sdk/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/valtioinc/valtio-react-sdk/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/valtioinc/valtio-react-sdk" />
  </a>
</p>

***

<h4 align="center">Securely collect & manage sensitive user data.</h4>

[Valtio](https://valtio.io) is a workflow automation platform that helps end-users design and power task-based digital
workflows for a variety of use cases. Tasks can include things like filling out forms, e-signatures, uploading documents,
identity verification, and many more. Users can assign other users to complete specific workflow steps and the platform
will handle notifying the user of their tasks and guiding them through the successful completion of those tasks.
***

## Highlights

This package provides an SDK for embedding Valtio into your React Native applications.
* Embed the workflow creator experience to allow application users to create new workflows (coming soon)
* Embed the workflow sender experience to allow application users to initiate workflows and assign other users to tasks
* Embed the workflow participant experience to allow application users to complete their workflow tasks
* Embed the full Valtio platform to allow application users to use all the capabilities of the platform.
***

## Install

```sh
npm install @valtioinc/valtio-react-native-sdk
```

```sh
yarn add @valtioinc/valtio-react-native-sdk
```
***

## Usage

#### Example: Show Valtio when user clicks a button

```typescript jsx
import React from "react";
import { View, Text, Button } from 'react-native'
import { ValtioApp } from "@valtioinc/valtio-react-sdk";

function App() {
  const [showValtio, setShowValtio] = React.useState(false)

  const onShow = () => {
    /*
     The user has requested to open the Valtio platform.
     */
    setShowValtio(true)
  }
  
  const onHide = () => {
    /*
      The user has requested to exit the Valtio platform and return to your application.
      Handle this event by either switching screens or removing the ValtioApp component.
     */
    setShowValtio(false)
  }
  
  return (
    <View>
      {!showValtio && (
        <View>
          <Text>Valtio React App Reference Implementation</Text>
          <Button title="Show Valtio" onPress={onShow} />
        </View>
      )}
      {showValtio && (
        <ValtioApp
          appID="75a8c8a8-8763-4590-ab5b-4d5278d41724"
          userFirstName="John"
          userLastName="Doe"
          userEmail="john.doe@example.com"
          userLanguage="en"
          onExit={onHide}
        />
      )}
    </View>
  )
}
```

***

## Author

👤 **Valtio Inc**

* Website: https://valtio.io
* Github: [@valtioinc](https://github.com/valtioinc)
* LinkedIn: [@https:\/\/www.linkedin.com\/company\/valtio-inc](https://linkedin.com/in/https:\/\/www.linkedin.com\/company\/valtio-inc)
***

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/valtioinc/valtio-react-sdk/issues).
***

## Show your support

Give a ⭐️ if this project helped you!
***

## 📝 License

Copyright © 2024 [Valtio Inc](https://github.com/valtioinc).<br />
This project is [MIT](https://github.com/valtioinc/valtio-react-sdk/blob/main/LICENSE) licensed.
