import React, { Component } from "react";
import { Container, Header, Content, Toast, Button, Text, Icon, Title, Body } from "native-base";
export default class FeedView extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Feed View</Title>
          </Body>
        </Header>
        <Content padder>
          <Button
            onPress={() =>
              Toast.show({
                text: "Feed View Toast",
                position: "bottom",
                buttonText: "Okay",
              })}
          >
            <Text>Show Toast</Text>
          </Button>
          <Button
            style={{ marginTop: 15 }}
            onPress={() => this.props.navigation.navigate("GridView")}
          >
            <Text> Go to Grid View</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}