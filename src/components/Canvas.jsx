import React from 'react';

const Canvas = ({ canvasRef }) => {
  return (
    <div style={{
      border: '2px solid #3a3a3a',
      boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
      borderRadius: '8px',
      overflow: 'hidden',
      background: '#ffffff'
    }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;