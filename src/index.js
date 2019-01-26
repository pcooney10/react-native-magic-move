import { Animated, Text as CoreText, Image as CoreImage } from "react-native";
import MagicMoveView from "./View";
import MagicMoveProvider from "./Provider";
import MagicMoveScene from "./Scene";
import {
  MagicMoveContextConsumer,
  MagicMoveContextPropType,
  withMagicMoveContext
} from "./Context";
import createComponent from "./createMagicMoveComponent";
import * as MagicMoveTransition from "./transitions";
import AnimatedText from "./AnimatedText";

export const Provider = MagicMoveProvider;
export const Scene = MagicMoveScene;
export const Context = MagicMoveContextConsumer;
export const ContextPropType = MagicMoveContextPropType;
export const withContext = withMagicMoveContext;
export const createMagicMoveComponent = createComponent;
export const View = MagicMoveView;
export const Text = createComponent(CoreText, AnimatedText);
export const Image = createComponent(CoreImage, Animated.Image);
export const Transition = MagicMoveTransition;
