export const handleClose = (
  { target, currentTarget, code },
  onCloseCallback
) => {
  if (target === currentTarget || code === 'Escape') {
    onCloseCallback();
  }
};
