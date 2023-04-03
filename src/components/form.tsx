import { useState } from 'react';

import { SketchPicker } from 'react-color';

const ColorInput = ({ value = '', onChange }: any) => {
  const [color, setColor] = useState(value);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (colorObj: any) => {
    const { rgb } = colorObj;
    setColor(rgb);
    if (onChange) {
      onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`);
    }
  };

  const background =
    typeof color === 'object'
      ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      : color;

  const styles: any = {
    color: {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background,
    },
    swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
  };

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export { ColorInput };
