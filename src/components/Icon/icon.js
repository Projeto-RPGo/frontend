export const Icon = ({
    id,
    size,
    width,
    height,
    viewBox,
    onClick,
    ...props
  }) => {
    return (
      <svg
        {...props}
        onClick={onClick}
        width={size ? size : width}
        height={size ? size : height}
        viewBox={viewBox}
        className={props.className}
      >
        <use href={`/sprite.svg#${id}`} />
      </svg>
    );
  };