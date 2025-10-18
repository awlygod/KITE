import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Canvas from '../components/Canvas';
import Toolbar from '../components/Toolbar';
import ColorPicker from '../components/ColorPicker';
import { useCanvas } from '../hooks/useCanvas';

const CanvasPage = () => {
  const navigate = useNavigate();
  const { canvasId } = useParams();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentCanvasId, setCurrentCanvasId] = useState(canvasId);

  const {
    canvasRef,
    selectedTool,
    setSelectedTool,
    addRectangle,
    addCircle,
    addText,
    enablePenTool,
    disablePenTool,
    deleteSelected,
    clearCanvas,
    saveCanvas,
    exportCanvas,
    changeColor,
    getSelectedObject,
  } = useCanvas(currentCanvasId);

  // Auto-save every 5 seconds
  useEffect(() => {
    // Don't auto-save for "new" canvas
    if (currentCanvasId === 'new') return;

    const interval = setInterval(async () => {
      if (canvasRef.current && currentCanvasId) {
        try {
          await saveCanvas(currentCanvasId);
          console.log('Auto-saved at', new Date().toLocaleTimeString());
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentCanvasId, saveCanvas]);

  const handleSave = async () => {
    try {
      const newId = await saveCanvas(currentCanvasId);
      
      // If it was a "new" canvas, update the URL with the real ID
      if (newId && currentCanvasId === 'new') {
        setCurrentCanvasId(newId);
        navigate(`/canvas/${newId}`, { replace: true });
        alert('Canvas saved! You can now share this URL.');
      } else {
        alert('Canvas saved successfully!');
      }
    } catch (error) {
      alert('Error saving canvas: ' + error.message);
    }
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    if (tool !== 'pen') {
      disablePenTool();
    }
  };

  const handleEnablePen = () => {
    setSelectedTool('pen');
    enablePenTool();
  };

  const handleClear = () => {
    if (window.confirm('Clear entire canvas?')) {
      clearCanvas();
    }
  };

  const handleColorChange = (color) => {
    changeColor(color);
    setShowColorPicker(false);
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column',
      background: '#1a1a1a',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        padding: '15px 20px',
        background: '#252525',
        color: '#e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff' }}>
          Canvas Editor 
          {currentCanvasId && currentCanvasId !== 'new' && (
            <span style={{ fontSize: '0.7rem', opacity: 0.6, color: '#b0b0b0', marginLeft: '10px' }}>
              ID: {currentCanvasId.substring(0, 8)}...
            </span>
          )}
        </h1>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 25px',
            background: '#3a3a3a',
            color: '#ffffff',
            border: '1px solid #555',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#4a4a4a';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#3a3a3a';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Home Page
        </button>
      </div>
      
      <Toolbar
        selectedTool={selectedTool}
        onToolChange={handleToolChange}
        onAddRectangle={addRectangle}
        onAddCircle={addCircle}
        onAddText={addText}
        onEnablePen={handleEnablePen}
        onSave={handleSave}
        onDelete={deleteSelected}
        onClear={handleClear}
        onExport={exportCanvas}
        onColorPicker={() => setShowColorPicker(!showColorPicker)}
      />

      {showColorPicker && (
        <ColorPicker 
          onColorChange={handleColorChange}
          onClose={() => setShowColorPicker(false)}
          currentColor={getSelectedObject()?.fill || '#000000'}
        />
      )}
      
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        background: '#1a1a1a'
      }}>
        <Canvas canvasRef={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasPage;