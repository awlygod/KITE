import React, { useState } from 'react';

const ColorPicker = ({ onColorChange, onClose, currentColor }) => {
  const [color, setColor] = useState(currentColor);

  const predefinedColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
    '#008000', '#000080', '#808080', '#c0c0c0', '#800000',
  ];

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleApply = () => {
    onColorChange(color);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '120px',
      left: '20px',
      background: '#2a2a2a',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      border: '1px solid #3a3a3a',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h3 style={{ margin: 0, color: '#ffffff', fontSize: '16px' }}>Change Color</h3>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#b0b0b0',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#b0b0b0', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
          Pick a color:
        </label>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          style={{
            width: '100%',
            height: '40px',
            border: '1px solid #3a3a3a',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#b0b0b0', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
          Quick colors:
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px'
        }}>
          {predefinedColors.map((presetColor) => (
            <button
              key={presetColor}
              onClick={() => {
                setColor(presetColor);
                onColorChange(presetColor);
              }}
              style={{
                width: '30px',
                height: '30px',
                background: presetColor,
                border: color === presetColor ? '2px solid #ffffff' : '1px solid #3a3a3a',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleApply}
        style={{
          width: '100%',
          padding: '10px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        Apply Color
      </button>
    </div>
  );
};

export default ColorPicker;