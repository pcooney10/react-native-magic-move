import React, { Component } from "react";
import { Animated, View } from "react-native";
import PropTypes from "prop-types";
import {
  withMagicMoveContext,
  MagicMoveContextProvider,
  MagicMoveContextPropType
} from "./Context";

/**
 * An Animated view that is magically "moved" to the
 * new position/size that it was mounted on.
 */
class MagicMoveView extends Component {
  static propTypes = {
    Component: PropTypes.any.isRequired,
    ComponentType: PropTypes.string,
    AnimatedComponent: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    useNativeDriver: PropTypes.bool,
    keepHidden: PropTypes.bool,
    duration: PropTypes.number,
    delay: PropTypes.number,
    easing: PropTypes.func,
    debug: PropTypes.bool,
    disabled: PropTypes.bool,
    transition: PropTypes.func,
    imageSizeHint: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    mmContext: MagicMoveContextPropType
  };

  static defaultProps = {
    Component: View,
    ComponentType: "view",
    AnimatedComponent: Animated.View,
    disabled: false,
    keepHidden: false
  };

  _ref = undefined;
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.state = {
      opacity: 1,
      id: props.id
    };
    if (props.id === undefined) {
      // eslint-disable-next-line
      console.error('[MagicMove] Missing "id" prop in MagicMove component');
    }
  }

  get isComponent() {
    return true;
  }

  get isImage() {
    return this.props.ComponentType === "image";
  }

  get ref() {
    return this._ref;
  }

  get id() {
    return this.props.id;
  }

  get scene() {
    return this.props.mmContext.scene;
  }

  get isDebug() {
    const { debug, mmContext } = this.props;
    return debug !== undefined ? debug : mmContext.isDebug;
  }

  get debugName() {
    const { Component, id } = this.props;
    return `${(Component.render ? Component.render.name : undefined) ||
      "component"} "${id}"`;
  }

  static getDerivedStateFromProps(props, state) {
    if (state.id !== props.id) {
      throw new Error(
        "[MagicMove] The id prop of MagicMove.View cannot be changed, previous: " +
          state.id +
          ", new: " +
          props.id
      );
    }
    return null;
  }

  componentDidMount() {
    const { isClone, administration } = this.props.mmContext;
    this._isMounted = true;
    if (!isClone) {
      administration.mountComponent(this);
    }
  }

  componentWillUnmount() {
    const { isClone, administration } = this.props.mmContext;
    this._isMounted = false;
    if (!isClone) {
      administration.unmountComponent(this);
    }
  }

  render() {
    const {
      Component,
      style,
      mmContext,
      id, // eslint-disable-line
      AnimatedComponent, // eslint-disable-line
      useNativeDriver, // eslint-disable-line
      keepHidden, // eslint-disable-line
      duration, // eslint-disable-line
      delay, // eslint-disable-line
      easing, // eslint-disable-line
      debug, // eslint-disable-line
      disabled, // eslint-disable-line
      transition, // eslint-disable-line
      imageSizeHint, // eslint-disable-line
      ...otherProps
    } = this.props;

    const { isClone, administration } = mmContext;
    const isAnimating = isClone && administration.isAnimatingComponent(this);
    const opacity = isAnimating ? 0 : this.state.opacity;
    return (
      <MagicMoveContextProvider value={this}>
        <Component
          ref={isAnimating ? undefined : this._setRef}
          style={[style, opacity !== undefined ? { opacity } : undefined]}
          {...otherProps}
          collapsable={isAnimating ? otherProps.collapsable : false}
        />
      </MagicMoveContextProvider>
    );
  }

  _setRef = ref => {
    this._ref = ref;
  };

  setOpacity(val) {
    if (this.state.opacity !== val && this._isMounted) {
      this.setState({
        opacity: val
      });
    }
  }
}

export default withMagicMoveContext(MagicMoveView);
