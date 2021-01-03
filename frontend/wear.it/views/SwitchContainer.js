import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import AuthNavigation from './AuthNavigation.js'
import MainApplication from "./MainApplication.js"
import React from "react";
// nawigacja pomiedzy ekranami logowanie/rejestracja, a główną aplikacją

const SwitchNavigator = createAnimatedSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: MainApplication,
    },
    {
        initialRouteName: 'Auth',
        backBehavior:'Auth',
        transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
    }
)


const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer