import { useState, useRef, useEffect } from 'react';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const anchorHandler = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };
  return { open, anchorEl, anchorHandler, closeHandler };
};

export const useLatest = (value: any) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
    console.log(ref.current);
  }, [value]);
  return ref;
};
