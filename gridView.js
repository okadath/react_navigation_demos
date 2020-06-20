import React, { Component } from "react";
import { Container, Header, Content, Toast, Button, Text, Icon, Title, Body } from "native-base";
export default class GridView extends Component {
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
            <Title>Grid View</Title>
          </Body>
        </Header>
        <Content padder>
          

          <Button
            style={{ marginTop: 15 }}
            onPress={() => this.props.navigation.navigate("FeedView")}
          >
            <Text> Go to Feed View</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
