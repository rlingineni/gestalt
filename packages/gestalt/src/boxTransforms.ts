import borders from './Borders.css';
import styles from './Box.css';
import {
  AlignContent,
  AlignItems,
  AlignSelf,
  BorderStyle,
  Color,
  Column,
  DangerouslySetInlineStyle,
  Dimension,
  Direction,
  Display,
  Flex,
  JustifyContent,
  Margin,
  Opacity,
  Overflow,
  Padding,
  Position,
  UserSelect,
} from './boxTypes';
import whitespace from './boxWhitespace.css';
import { getRoundingStyle } from './getRoundingClassName';
import layout from './Layout.css';
import {
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  toProps,
  ToPropsOutput,
} from './style';
import { bind, Functor, mapping, range, rangeWithZero, toggle, union } from './transforms';
import omit from './utils/omit';
import { Indexable } from './zIndex';

/*

# Transformers

This is where the meat and the bones of Box's transforms are. You can read more about the DSL in `./transforms.js`, but basically they are a small declarative way of specifying how a property (i.e. `marginTop={4}`) gets turned into a CSS class (`marginTop4`).

There's a little preamble here, but it culminates in a big object mapping the actual property names to the transformer values.

*/

const alignItems: Functor<AlignItems> = mapping({
  start: layout.xsItemsStart,
  end: layout.xsItemsEnd,
  center: layout.xsItemsCenter,
  baseline: layout.xsItemsBaseline,
});
const display: Functor<Display> = mapping({
  none: styles.xsDisplayNone,
  flex: styles.xsDisplayFlex,
  block: styles.xsDisplayBlock,
  inlineBlock: styles.xsDisplayInlineBlock,
  visuallyHidden: styles.xsDisplayVisuallyHidden,
});
const column: Functor<Column> = bind(range('xsCol'), styles);
const direction: Functor<Direction> = mapping({
  row: styles.xsDirectionRow,
  column: styles.xsDirectionColumn,
});

const smAlignItems: Functor<AlignItems> = mapping({
  start: layout.smItemsStart,
  end: layout.smItemsEnd,
  center: layout.smItemsCenter,
  baseline: layout.smItemsBaseline,
});
const smDisplay: Functor<Display> = mapping({
  none: styles.smDisplayNone,
  flex: styles.smDisplayFlex,
  block: styles.smDisplayBlock,
  inlineBlock: styles.smDisplayInlineBlock,
  visuallyHidden: styles.smDisplayVisuallyHidden,
});
const smColumn: Functor<Column> = bind(range('smCol'), styles);
const smDirection: Functor<Direction> = mapping({
  row: styles.smDirectionRow,
  column: styles.smDirectionColumn,
});

const mdAlignItems: Functor<AlignItems> = mapping({
  start: layout.mdItemsStart,
  end: layout.mdItemsEnd,
  center: layout.mdItemsCenter,
  baseline: layout.mdItemsBaseline,
});
const mdDisplay: Functor<Display> = mapping({
  none: styles.mdDisplayNone,
  flex: styles.mdDisplayFlex,
  block: styles.mdDisplayBlock,
  inlineBlock: styles.mdDisplayInlineBlock,
  visuallyHidden: styles.mdDisplayVisuallyHidden,
});
const mdColumn: Functor<Column> = bind(range('mdCol'), styles);
const mdDirection: Functor<Direction> = mapping({
  row: styles.mdDirectionRow,
  column: styles.mdDirectionColumn,
});

const lgAlignItems: Functor<AlignItems> = mapping({
  start: layout.lgItemsStart,
  end: layout.lgItemsEnd,
  center: layout.lgItemsCenter,
  baseline: layout.lgItemsBaseline,
});
const lgDisplay: Functor<Display> = mapping({
  none: styles.lgDisplayNone,
  flex: styles.lgDisplayFlex,
  block: styles.lgDisplayBlock,
  inlineBlock: styles.lgDisplayInlineBlock,
  visuallyHidden: styles.lgDisplayVisuallyHidden,
});
const lgColumn: Functor<Column> = bind(range('lgCol'), styles);
const lgDirection: Functor<Direction> = mapping({
  row: styles.lgDirectionRow,
  column: styles.lgDirectionColumn,
});

const xlAlignItems: Functor<AlignItems> = mapping({
  start: layout.xlItemsStart,
  end: layout.xlItemsEnd,
  center: layout.xlItemsCenter,
  baseline: layout.xlItemsBaseline,
});
const xlDisplay: Functor<Display> = mapping({
  none: styles.xlDisplayNone,
  flex: styles.xlDisplayFlex,
  block: styles.xlDisplayBlock,
  inlineBlock: styles.xlDisplayInlineBlock,
  visuallyHidden: styles.xlDisplayVisuallyHidden,
});
const xlColumn: Functor<Column> = bind(range('xlCol'), styles);
const xlDirection: Functor<Direction> = mapping({
  row: styles.xlDirectionRow,
  column: styles.xlDirectionColumn,
});

const xxlAlignItems: Functor<AlignItems> = mapping({
  start: layout.xxlItemsStart,
  end: layout.xxlItemsEnd,
  center: layout.xxlItemsCenter,
  baseline: layout.xxlItemsBaseline,
});
const xxlDisplay: Functor<Display> = mapping({
  none: styles.xxlDisplayNone,
  flex: styles.xxlDisplayFlex,
  block: styles.xxlDisplayBlock,
  inlineBlock: styles.xxlDisplayInlineBlock,
  visuallyHidden: styles.xxlDisplayVisuallyHidden,
});
const xxlColumn: Functor<Column> = bind(range('xxlCol'), styles);
const xxlDirection: Functor<Direction> = mapping({
  row: styles.xxlDirectionRow,
  column: styles.xxlDirectionColumn,
});

const xxxlAlignItems: Functor<AlignItems> = mapping({
  start: layout.xxxlItemsStart,
  end: layout.xxxlItemsEnd,
  center: layout.xxxlItemsCenter,
  baseline: layout.xxxlItemsBaseline,
});
const xxxlDisplay: Functor<Display> = mapping({
  none: styles.xxxlDisplayNone,
  flex: styles.xxxlDisplayFlex,
  block: styles.xxxlDisplayBlock,
  inlineBlock: styles.xxxlDisplayInlineBlock,
  visuallyHidden: styles.xxxlDisplayVisuallyHidden,
});
const xxxlColumn: Functor<Column> = bind(range('xxxlCol'), styles);
const xxxlDirection: Functor<Direction> = mapping({
  row: styles.xxxlDirectionRow,
  column: styles.xxxlDirectionColumn,
});

/* ***************************************** */

const alignContent: Functor<AlignContent> = mapping({
  start: layout.contentStart,
  end: layout.contentEnd,
  center: layout.contentCenter,
  between: layout.contentBetween,
  around: layout.contentAround,
  evenly: layout.contentEvenly,
});
const alignSelf: Functor<AlignSelf> = mapping({
  start: layout.selfStart,
  end: layout.selfEnd,
  center: layout.selfCenter,
  baseline: layout.selfBaseline,
  stretch: layout.selfStretch,
});
const bottom: Functor<boolean> = toggle(layout.bottom0);
const borderStyle: Functor<BorderStyle> = (value) => {
  const borderProps =
    value === 'sm' || value === 'lg'
      ? [fromClassName(borders.solid), fromClassName(borders.borderColorLightGray)]
      : [];
  return concat([
    mapping({
      sm: borders.sizeSm,
      lg: borders.sizeLg,
      shadow: borders.shadow,
      raisedTopShadow: borders.raisedTop,
      raisedBottomShadow: borders.raisedBottom,
    })(value),
    ...borderProps,
  ]);
};
const color: Functor<Color> = mapping({
  default: styles.default,
  infoBase: styles.infoBase,
  infoWeak: styles.infoWeak,
  errorBase: styles.errorBase,
  errorWeak: styles.errorWeak,
  warningBase: styles.warningBase,
  warningWeak: styles.warningWeak,
  successBase: styles.successBase,
  successWeak: styles.successWeak,
  recommendationBase: styles.recommendationBase,
  recommendationWeak: styles.recommendationWeak,
  shopping: styles.shopping,
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  selected: styles.selected,
  inverse: styles.inverse,
  brand: styles.brand,
  education: styles.education,
  elevationAccent: styles.elevationAccent,
  elevationFloating: styles.elevationFloating,
  elevationRaised: styles.elevationRaised,
  dark: styles.dark,
  light: styles.light,
  lightWash: styles.lightWash,
  darkWash: styles.darkWash,
  transparentDarkGray: styles.transparentDarkGrayBg,
  transparent: styles.transparent,
});

const fit: Functor<boolean> = toggle(layout.fit);
const flex: Functor<Flex> = mapping({
  grow: layout.flexGrow,
  none: layout.flexNone,
});
const flexBasis: Functor<number | string> = (v) => fromInlineStyle({ flexBasis: v });
const height: Functor<Dimension> = (h) => fromInlineStyle({ height: h });
const justifyContent: Functor<JustifyContent> = mapping({
  end: layout.justifyEnd,
  center: layout.justifyCenter,
  between: layout.justifyBetween,
  around: layout.justifyAround,
  evenly: layout.justifyEvenly,
});
const left: Functor<boolean> = toggle(layout.left0);

/* ***************************************** */

type MarginFunctorType = Functor<Margin>;

const transformNumberOrPassthrough =
  (selector: string): MarginFunctorType =>
  (m) => {
    if (typeof m === 'number') {
      return bind(rangeWithZero(selector), whitespace)(m);
    }

    if (m === 'auto') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore cannot infer type with dynamic property name
      return fromClassName(whitespace[`${selector}Auto`]);
    }

    return identity();
  };

const marginStart: MarginFunctorType = transformNumberOrPassthrough('marginStart');
const marginEnd: MarginFunctorType = transformNumberOrPassthrough('marginEnd');
const marginTop: MarginFunctorType = transformNumberOrPassthrough('marginTop');
const marginBottom: MarginFunctorType = transformNumberOrPassthrough('marginBottom');
const margin: MarginFunctorType = union(marginTop, marginBottom, marginStart, marginEnd);

const smMarginStart: MarginFunctorType = transformNumberOrPassthrough('smMarginStart');
const smMarginEnd: MarginFunctorType = transformNumberOrPassthrough('smMarginEnd');
const smMarginTop: MarginFunctorType = transformNumberOrPassthrough('smMarginTop');
const smMarginBottom: MarginFunctorType = transformNumberOrPassthrough('smMarginBottom');
const smMargin: MarginFunctorType = union(smMarginTop, smMarginBottom, smMarginStart, smMarginEnd);

const mdMarginStart: MarginFunctorType = transformNumberOrPassthrough('mdMarginStart');
const mdMarginEnd: MarginFunctorType = transformNumberOrPassthrough('mdMarginEnd');
const mdMarginTop: MarginFunctorType = transformNumberOrPassthrough('mdMarginTop');
const mdMarginBottom: MarginFunctorType = transformNumberOrPassthrough('mdMarginBottom');
const mdMargin: MarginFunctorType = union(mdMarginTop, mdMarginBottom, mdMarginStart, mdMarginEnd);

const lgMarginStart: MarginFunctorType = transformNumberOrPassthrough('lgMarginStart');
const lgMarginEnd: MarginFunctorType = transformNumberOrPassthrough('lgMarginEnd');
const lgMarginTop: MarginFunctorType = transformNumberOrPassthrough('lgMarginTop');
const lgMarginBottom: MarginFunctorType = transformNumberOrPassthrough('lgMarginBottom');
const lgMargin: MarginFunctorType = union(lgMarginTop, lgMarginBottom, lgMarginStart, lgMarginEnd);

const xlMarginStart: MarginFunctorType = transformNumberOrPassthrough('xlMarginStart');
const xlMarginEnd: MarginFunctorType = transformNumberOrPassthrough('xlMarginEnd');
const xlMarginTop: MarginFunctorType = transformNumberOrPassthrough('xlMarginTop');
const xlMarginBottom: MarginFunctorType = transformNumberOrPassthrough('xlMarginBottom');
const xlMargin: MarginFunctorType = union(xlMarginTop, xlMarginBottom, xlMarginStart, xlMarginEnd);

const xxlMarginStart: MarginFunctorType = transformNumberOrPassthrough('xxlMarginStart');
const xxlMarginEnd: MarginFunctorType = transformNumberOrPassthrough('xxlMarginEnd');
const xxlMarginTop: MarginFunctorType = transformNumberOrPassthrough('xxlMarginTop');
const xxlMarginBottom: MarginFunctorType = transformNumberOrPassthrough('xxlMarginBottom');
const xxlMargin: MarginFunctorType = union(
  xxlMarginTop,
  xxlMarginBottom,
  xxlMarginStart,
  xxlMarginEnd,
);

const xxxlMarginStart: MarginFunctorType = transformNumberOrPassthrough('xxxlgMarginStart');
const xxxlMarginEnd: MarginFunctorType = transformNumberOrPassthrough('xxxlMarginEnd');
const xxxlMarginTop: MarginFunctorType = transformNumberOrPassthrough('xxxlMarginTop');
const xxxlMarginBottom: MarginFunctorType = transformNumberOrPassthrough('xxxlMarginBottom');
const xxxlMargin: MarginFunctorType = union(
  xxxlMarginTop,
  xxxlMarginBottom,
  xxxlMarginStart,
  xxxlMarginEnd,
);

/* ***************************************** */

const maxHeight: Functor<Dimension> = (d) => fromInlineStyle({ maxHeight: d });
const maxWidth: Functor<Dimension> = (d) => fromInlineStyle({ maxWidth: d });
const minHeight: Functor<Dimension> = (d) => fromInlineStyle({ minHeight: d });
const minWidth: Functor<Dimension> = (d) => fromInlineStyle({ minWidth: d });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore cannot infer type with dynamic property name
const opacityMap = mapClassName((name) => styles[name]);
const opacity: Functor<Opacity> = (val) => {
  if (val > 0 && val < 1) {
    return opacityMap(range('opacity0')(val * 10));
  }
  return opacityMap(range('opacity')(val));
};
const overflow: Functor<Overflow> = mapping({
  hidden: layout.overflowHidden,
  scroll: layout.overflowScroll,
  auto: layout.overflowAuto,
  scrollX: layout.overflowScrollX,
  scrollY: layout.overflowScrollY,
  // default: visible
});

/* ***************************************** */

type PaddingFunctor = Functor<Padding>;

const paddingX: PaddingFunctor = bind(rangeWithZero('paddingX'), whitespace);
const paddingY: PaddingFunctor = bind(rangeWithZero('paddingY'), whitespace);
const padding: PaddingFunctor = union(paddingX, paddingY);

const smPaddingX: PaddingFunctor = bind(rangeWithZero('smPaddingX'), whitespace);
const smPaddingY: PaddingFunctor = bind(rangeWithZero('smPaddingY'), whitespace);
const smPadding: PaddingFunctor = union(smPaddingX, smPaddingY);

const mdPaddingX: PaddingFunctor = bind(rangeWithZero('mdPaddingX'), whitespace);
const mdPaddingY: PaddingFunctor = bind(rangeWithZero('mdPaddingY'), whitespace);
const mdPadding: PaddingFunctor = union(mdPaddingX, mdPaddingY);

const lgPaddingX: PaddingFunctor = bind(rangeWithZero('lgPaddingX'), whitespace);
const lgPaddingY: PaddingFunctor = bind(rangeWithZero('lgPaddingY'), whitespace);
const lgPadding: PaddingFunctor = union(lgPaddingX, lgPaddingY);

const xlPaddingX: PaddingFunctor = bind(rangeWithZero('xlPaddingX'), whitespace);
const xlPaddingY: PaddingFunctor = bind(rangeWithZero('xlPaddingY'), whitespace);
const xlPadding: PaddingFunctor = union(xlPaddingX, xlPaddingY);

const xxlPaddingX: PaddingFunctor = bind(rangeWithZero('xxlPaddingX'), whitespace);
const xxlPaddingY: PaddingFunctor = bind(rangeWithZero('xxlPaddingY'), whitespace);
const xxlPadding: PaddingFunctor = union(xxlPaddingX, xxlPaddingY);

const xxxlPaddingX: PaddingFunctor = bind(rangeWithZero('xxxlPaddingX'), whitespace);
const xxxlPaddingY: PaddingFunctor = bind(rangeWithZero('xxxlPaddingY'), whitespace);
const xxxlPadding: PaddingFunctor = union(xxxlPaddingX, xxxlPaddingY);

/* ***************************************** */

const position: Functor<Position> = mapping({
  absolute: layout.absolute,
  relative: layout.relative,
  fixed: layout.fixed,
  // default: static
});
const right: Functor<boolean> = toggle(layout.right0);
const rounding = getRoundingStyle;
const top: Functor<boolean> = toggle(layout.top0);
const userSelect: Functor<UserSelect> = mapping({
  none: styles.userSelectNone,
  // default: auto
});
const width: Functor<Dimension> = (w) => fromInlineStyle({ width: w });
const wrap: Functor<boolean> = toggle(layout.flexWrap);
const dangerouslySetInlineStyle: Functor<DangerouslySetInlineStyle> = (value) =>
  // eslint-disable-next-line no-underscore-dangle
  value && value.__style ? fromInlineStyle(value.__style) : identity();
const zIndex: Functor<Indexable | null | undefined> = (value) => {
  if (!value) {
    return identity();
  }
  return fromInlineStyle({ zIndex: value.index() });
};

/*

It's preferable to put new properties into that object directly just so it's easier to read.
Unfortunately Flow doesn't like that for the vast majority of the fields. :(

*/

export const propToFn = {
  alignItems,
  display,
  column,
  direction,

  smAlignItems,
  smDisplay,
  smColumn,
  smDirection,

  mdAlignItems,
  mdDisplay,
  mdColumn,
  mdDirection,

  lgAlignItems,
  lgDisplay,
  lgColumn,
  lgDirection,

  xlAlignItems,
  xlDisplay,
  xlColumn,
  xlDirection,

  xxlAlignItems,
  xxlDisplay,
  xxlColumn,
  xxlDirection,

  xxxlAlignItems,
  xxxlDisplay,
  xxxlColumn,
  xxxlDirection,

  alignContent,
  alignSelf,
  bottom,
  borderStyle,
  color,
  fit,
  flex,
  flexBasis,
  height,
  justifyContent,
  left,

  margin,
  marginTop,
  marginBottom,
  marginStart,
  marginEnd,

  smMargin,
  smMarginTop,
  smMarginBottom,
  smMarginStart,
  smMarginEnd,

  mdMargin,
  mdMarginTop,
  mdMarginBottom,
  mdMarginStart,
  mdMarginEnd,

  lgMargin,
  lgMarginTop,
  lgMarginBottom,
  lgMarginStart,
  lgMarginEnd,

  xlMargin,
  xlMarginTop,
  xlMarginBottom,
  xlMarginStart,
  xlMarginEnd,

  xxlMargin,
  xxlMarginTop,
  xxlMarginBottom,
  xxlMarginStart,
  xxlMarginEnd,

  xxxlMargin,
  xxxlMarginTop,
  xxxlMarginBottom,
  xxxlMarginStart,
  xxxlMarginEnd,

  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  overflow,

  padding,
  paddingX,
  paddingY,

  smPadding,
  smPaddingX,
  smPaddingY,

  mdPadding,
  mdPaddingX,
  mdPaddingY,

  lgPadding,
  lgPaddingX,
  lgPaddingY,

  xlPadding,
  xlPaddingX,
  xlPaddingY,

  xxlPadding,
  xxlPaddingX,
  xxlPaddingY,

  xxxlPadding,
  xxxlPaddingX,
  xxxlPaddingY,

  position,
  right,
  rounding,
  top,
  userSelect,
  width,
  wrap,
  dangerouslySetInlineStyle,
  zIndex,
} as const;

/*

# Style Builder

This is where it all comes together. This function takes the base styles for the component,
the component's props, and any disallowed props. It outputs the passthrough props (after
removing disallowed and given props), as well as an object with the combined classNames
and styles from the given props.

Optionally, for more restrictive components, this function can accept an allowlist of
valid props. Any props not on this list will be ignored.

*/

export function buildStyles<T extends any>({
  baseStyles,
  props,
  blocklistProps,
  allowlistProps,
}: {
  baseStyles: string;
  props: T;
  blocklistProps?: ReadonlyArray<string>;
  allowlistProps?: ReadonlyArray<string>;
}): {
  passthroughProps: T;
  propsStyles: ToPropsOutput;
} {
  // Flow can't reason about the constant nature of Object.keys so we can't use
  // a functional (reduce) style here.

  // All Box's are box-sized by default, so we start off building up the styles
  // to be applied with a Box base class.
  let s = fromClassName(baseStyles);

  // Init the list of props we'll omit from passthrough. We'll add to this
  // list as we match props against the transforms list.
  const omitProps = [...(blocklistProps ?? [])];

  // This loops through each property and if it exists in the previously
  // defined transform map, concatenates the resulting styles to the base
  // styles. If there's a match, we also don't pass through that property. This
  // means Box's runtime is only dependent on the number of properties passed
  // to it (which is typically small) instead of the total number of possible
  // properties (~30 or so). While it may ~feel~ like Box is inefficient, its
  // biggest performance impact is on startup time because there's so much code
  // here.

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in props) {
    if (
      Object.prototype.hasOwnProperty.call(propToFn, prop) &&
      !omitProps.includes(prop) &&
      (!allowlistProps || allowlistProps.includes(prop))
    ) {
      // @ts-expect-error - TS2536 - Type 'Extract<keyof T, string>' cannot be used to index type '{ readonly alignItems: Functor<AlignItems>; readonly display: Functor<Display>; readonly column: Functor<Column>; readonly direction: Functor<...>; ... 69 more ...; readonly zIndex: Functor<...>; }'.
      const fn = propToFn[prop];
      const value = props[prop];
      omitProps.push(prop);
      s = concat([s, fn(value)]);
    }
  }

  return {
    passthroughProps: omit(omitProps, props),
    propsStyles: toProps(s),
  };
}
