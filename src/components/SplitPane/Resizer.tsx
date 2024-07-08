export const RESIZER_DEFAULT_CLASSNAME = 'Resizer';

function Resizer({
    className,
    onClick,
    onDoubleClick,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    resizerClassName,
    split,
    style
}:any) {
  const classes = [resizerClassName, split, className, 'Resizer'];

  return (
    <span
      role="presentation"
      className={classes.join(' ')}
      style={style}
      onMouseDown={event => onMouseDown(event)}
      onTouchStart={event => {
        event.preventDefault();
        onTouchStart(event);
      }}
      onTouchEnd={event => {
        event.preventDefault();
        onTouchEnd(event);
      }}
      onClick={event => {
        if (onClick) {
          event.preventDefault();
          onClick(event);
        }
      }}
      onDoubleClick={event => {
        if (onDoubleClick) {
          event.preventDefault();
          onDoubleClick(event);
        }
      }}
    />
  );
}
export default Resizer;
