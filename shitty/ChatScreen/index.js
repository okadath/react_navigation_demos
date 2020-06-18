import React, { Component } from "react";
import LucyChat from "./LucyChat.js";
// import JadeChat from "./JadeChat.js";
// import NineChat from "./NineChat.js";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
export default (MainScreenNavigator = createBottomTabNavigator(
  {
    LucyChat: { screen: LucyChat },
    // JadeChat: { screen: JadeChat },
    // NineChat: { screen: NineChat }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("LucyChat")}>
              <Icon name="bowtie" />
              <Text>Lucy</Text>
            </Button>
          
          </FooterTab>
        </Footer>
      );
    }
  }
));
