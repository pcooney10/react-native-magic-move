import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import * as MagicMove from "./magic-move";
import { Actions } from "react-native-router-flux";
import "./NavigationScene";
import { storeObserver, StorePropType } from "./Store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    padding: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16
  },
  box: {
    width: 140,
    height: 140,
    borderRadius: 70,
    flexDirection: "column",
    justifyContent: "center"
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    fontSize: 20
  }
});

class Main extends Component {
  static propTypes = {
    store: StorePropType
  };

  renderItem({ id, style, text, onPress }) {
    const { debug } = this.props.store;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <MagicMove.View id={id} style={[styles.box, style]} debug={debug}>
          <MagicMove.Text id={`${id}.title`} style={styles.text} debug={debug}>
            {text}
          </MagicMove.Text>
        </MagicMove.View>
      </TouchableOpacity>
    );
  }

  renderImageItem({ id, source, onPress }) {
    const { debug } = this.props.store;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View style={styles.box}>
          <MagicMove.Image
            id={id}
            source={source}
            style={[styles.box, StyleSheet.absoluteFill]}
            debug={debug}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <MagicMove.Scene style={styles.container}>
        <View style={styles.row}>
          {this.renderItem({
            id: "list5",
            text: "Morph",
            style: {
              backgroundColor: "purple",
              borderBottomRightRadius: 0
            },
            onPress: () => Actions.push("scene2")
          })}
          {this.renderImageItem({
            id: "image",
            source: require("./assets/waves.jpg"),
            onPress: () => Actions.push("scene3")
          })}
        </View>
        <View style={styles.row}>
          {this.renderItem({
            id: "scene5",
            text: "Flip",
            style: {
              backgroundColor: "goldenrod"
            },
            onPress: () => Actions.push("scene5")
          })}
          {this.renderItem({
            id: "scene6",
            text: "Dissolve",
            style: {
              backgroundColor: "seagreen"
            },
            onPress: () => Actions.push("scene6")
          })}
        </View>
        <View style={styles.row}>
          {this.renderItem({
            id: "scene7",
            text: "Shrink & Grow",
            style: {
              backgroundColor: "salmon"
            },
            onPress: () => Actions.push("scene7")
          })}
          {this.renderItem({
            id: "scene8",
            text: "Squash & Stretch",
            style: {
              backgroundColor: "steelblue"
            },
            onPress: () => Actions.push("scene8")
          })}
        </View>
        <View style={styles.row}>
          {this.renderItem({
            id: "scene1",
            text: "Scale",
            style: {
              backgroundColor: "blueviolet",
              borderRadius: 0
            },
            onPress: () => Actions.push("scene1")
          })}
          {this.renderItem({
            id: "scene4",
            text: "Color Change",
            style: {
              backgroundColor: "orange",
              borderTopLeftRadius: 0
            },
            onPress: () => Actions.push("scene4")
          })}
        </View>
      </MagicMove.Scene>
    );
  }
}

export default storeObserver(Main);
