import React, { Component, createContext } from "react";
import { View } from "react-native";
import { PropTypes } from "prop-types";
import MagicMoveAdministration from "./Administration";

const MagicMoveSceneContext = createContext(undefined);

let autoId = 0;

class MagicMoveScene extends Component {
  static propTypes = {
    children: PropTypes.any,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
  };

  static defaultProps = {
    disabled: false
  };

  _ref = undefined;
  _uniqueId = "__autoSceneId" + autoId++;
  _active = undefined;

  render() {
    // eslint-disable-next-line
    const { children, id, disabled, active, ...otherProps } = this.props;
    return (
      <View ref={this._setRef} {...otherProps} collapsable={false}>
        <MagicMoveAdministration.Context.Consumer>
          {administration => {
            this._administration = administration;
            return (
              <MagicMoveSceneContext.Provider value={this}>
                {children}
              </MagicMoveSceneContext.Provider>
            );
          }}
        </MagicMoveAdministration.Context.Consumer>
      </View>
    );
  }

  componentDidUpdate() {
    const { active } = this.props;
    if (active !== undefined) {
      if (this._active !== active) {
        this._active = active;
        this._administration.activateScene(this, active);
      }
    }
  }

  _setRef = ref => {
    this._ref = ref;
  };

  getRef() {
    return this._ref;
  }

  getId() {
    return this._uniqueId;
  }
}

let HookedComponent;
function addHook(Component) {
  HookedComponent = Component;
}

const MagicMoveSceneWrapper = props => {
  const scene = <MagicMoveScene {...props} />;
  if (HookedComponent) {
    return <HookedComponent>{scene}</HookedComponent>;
  } else {
    return scene;
  }
};

MagicMoveSceneWrapper.Context = MagicMoveSceneContext;
MagicMoveSceneWrapper.addHook = addHook;

export default MagicMoveSceneWrapper;
