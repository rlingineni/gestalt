// @flow strict
import { type Node, useEffect, useState } from 'react';
import classnames from 'classnames';
import Box from '../Box.js';
import InternalCheckbox from '../Checkbox/InternalCheckbox.js';
import Flex from '../Flex.js';
import TapArea, { type OnTapType } from '../TapArea.js';
import Tooltip from '../Tooltip.js';
import useFocusVisible from '../useFocusVisible.js';
import useInteractiveStates from '../utils/useInteractiveStates.js';
import { type Indexable } from '../zIndex.js';
import styles from './Tile.css';

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

type TileChangeHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  selected: boolean,
  id?: string,
|}) => void;

type Props = {|
  /**
   * The content to be wrapped by tile.
   */
  children?: Node,
  /**
   * The background color of the tile as a hex. Don't forget about tokenization.
   */
  bgColor?: string,
  /**
   * The border color of the tile. Don't forget about tokenization.
   */
  borderColor?: string,
  /**
   * Indicates if TileData should be disabled. Disabled TileData is inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Id to identify the tile.
   */
  id?: string,
  /**
   * Indicate if tile is in a selected state.
   */
  selected?: boolean,
  /**
   * Handler if the item selection state is changed.
   */
  onTap?: TileChangeHandler,
  /**
   * Shows a visible checkbox when the tile is selected state. See when using in a [group](http://gestalt.pinterest.systems/web/tiledata#Group).
   */
  showCheckbox?: boolean,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the With Tooltip variant to learn more.
   */
  tooltip?: TooltipProps,
|};

function MaybeTooltip({
  children,
  disabled,
  tooltip,
}: {|
  children: Node,
  disabled?: boolean,
  tooltip?: TooltipProps,
|}) {
  if (!tooltip || disabled) return children;
  return (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      inline={tooltip.inline}
      idealDirection={tooltip.idealDirection || 'up'}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {children}
    </Tooltip>
  );
}

/**
 * Used Internally to wrap a component with a Tile View
 */
export default function Tile({
  bgColor,
  borderColor,
  children,
  disabled = false,
  id = '',
  onTap,
  selected = false,
  showCheckbox,
  tooltip,
}: Props): Node {
  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const [isSelected, setIsSelected] = useState(selected);
  const { isFocusVisible } = useFocusVisible();

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const classes = classnames(styles.tile, styles.tileWidth, {
    [styles.selected]: isSelected,
    [styles.hovered]: isHovered && !isFocusVisible,
    [styles.disabled]: disabled,
  });

  const handleClick: OnTapType = ({ event }) => {
    onTap?.({ event, id, selected: !isSelected });
    setIsSelected(!isSelected);
  };

  const handleKeyDown = ({
    event,
  }: {|
    event: SyntheticKeyboardEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    if (event.key === 'ENTER') {
      setIsSelected(!isSelected);
      onTap?.({ event, id, selected: !isSelected });
    }
  };

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {};
  if (isSelected && !disabled) {
    // the internal base component uses hex codes
    // but could be passed in pre-tokenized values
    if (borderColor && borderColor.startsWith('#')) {
      colorStyles.borderColor = `${borderColor}`;
    }
    if (bgColor && bgColor.startsWith('#')) {
      colorStyles.backgroundColor = `${bgColor}`;
    }
  }

  return (
    <Box position="relative">
      <MaybeTooltip tooltip={tooltip} disabled={disabled}>
        <TapArea
          role="button"
          disabled={disabled}
          rounding={4}
          onBlur={handleOnBlur}
          onTap={handleClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
        >
          <div className={classes} style={colorStyles}>
            <Flex direction="row" gap={2}>
              {children}
              {showCheckbox && (
                <InternalCheckbox
                  id={id}
                  checked={isSelected}
                  readOnly
                  size="sm"
                  style={{
                    backgroundColor: isSelected ? colorStyles.borderColor : 'transparent',
                    borderColor: 'transparent',
                  }}
                />
              )}
            </Flex>
          </div>
        </TapArea>
      </MaybeTooltip>
    </Box>
  );
}