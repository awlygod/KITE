import React from 'react';

const Toolbar = ({ 
  selectedTool, 
  onToolChange, 
  onAddRectangle,
  onAddCircle,
  onAddText,
  onEnablePen,
  onSave, 
  onDelete,
  onClear,
  onExport,
  onColorPicker
}) => {
  const tools = [
    { id: 'select', label: 'Select', icon: '', onClick: () => { onToolChange('select'); } },
    { id: 'rectangle', label: 'Rectangle', icon: '', onClick: onAddRectangle },
    { id: 'circle', label: 'Circle', icon: '', onClick: onAddCircle },
    { id: 'text', label: 'Text', icon: '', onClick: onAddText },
    { id: 'pen', label: 'Pen', icon: '', onClick: onEnablePen }
  ];

  return (
    <div style={{ 
      padding: '15px 20px', 
      borderBottom: '1px solid #333', 
      display: 'flex', 
      gap: '10px',
      alignItems: 'center',
      background: '#252525',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={tool.onClick}
            style={{
              padding: '10px 20px',
              background: selectedTool === tool.id ? '#4a4a4a' : '#2a2a2a',
              color: selectedTool === tool.id ? '#ffffff' : '#b0b0b0',
              border: `1px solid ${selectedTool === tool.id ? '#666' : '#3a3a3a'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s',
              fontSize: '14px'
            }}
            onMouseOver={(e) => {
              if (selectedTool !== tool.id) {
                e.target.style.background = '#3a3a3a';
                e.target.style.color = '#ffffff';
              }
            }}
            onMouseOut={(e) => {
              if (selectedTool !== tool.id) {
                e.target.style.background = '#2a2a2a';
                e.target.style.color = '#b0b0b0';
              }
            }}
          >
            {tool.icon} {tool.label}
          </button>
        ))}
        
        <button
          onClick={onColorPicker}
          style={{
            padding: '10px 20px',
            background: '#2a2a2a',
            color: '#b0b0b0',
            border: '1px solid #3a3a3a',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s',
            fontSize: '14px'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#3a3a3a';
            e.target.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#2a2a2a';
            e.target.style.color = '#b0b0b0';
          }}
        >
          🎨 Color
        </button>
      </div>
      
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={onSave} style={actionButtonStyle('#3c9651ff')}>
          Save
        </button>
        <button onClick={onDelete} style={actionButtonStyle('#ca3746ff')}>
          Delete
        </button>
        <button onClick={onClear} style={actionButtonStyle('#be9723ff')}>
          Clear
        </button>
        <button onClick={onExport} style={actionButtonStyle('#17a2b8')}>
          Export
        </button>
      </div>
    </div>
  );
};

const actionButtonStyle = (bgColor) => ({
  padding: '10px 20px',
  background: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '550',
  fontSize: '14px',
  transition: 'all 0.2s',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
});

export default Toolbar;