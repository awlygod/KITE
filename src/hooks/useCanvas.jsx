import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { canvasService } from '../services/canvasService';

export const useCanvas = (canvasId) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const isSavingRef = useRef(false);

  useEffect(() => {
    let unsubscribe;
    
    const initCanvas = async () => {
      if (canvasRef.current && !fabricCanvasRef.current) {
        // Create new fabric canvas
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff',
        });

        // Load from Firestore if canvasId exists and is not "new"
        if (canvasId && canvasId !== 'new') {
          try {
            console.log('Loading canvas:', canvasId);
            const canvasData = await canvasService.getCanvas(canvasId);
            console.log('Canvas data:', canvasData);
            
            if (canvasData && canvasData.canvasJSON) {
              await new Promise((resolve) => {
                fabricCanvasRef.current.loadFromJSON(canvasData.canvasJSON, () => {
                  fabricCanvasRef.current.renderAll();
                  // Force a second render after a short delay
                  setTimeout(() => {
                    fabricCanvasRef.current.requestRenderAll();
                  }, 100);
                  console.log('Canvas loaded successfully with', fabricCanvasRef.current.getObjects().length, 'objects');
                  resolve();
                });
              });
            }

            // Subscribe to real-time updates
            unsubscribe = canvasService.subscribeToCanvas(canvasId, (data) => {
              if (isSavingRef.current) return;
              
              if (data.canvasJSON && fabricCanvasRef.current) {
                const activeObject = fabricCanvasRef.current.getActiveObject();
                if (!activeObject) {
                  fabricCanvasRef.current.loadFromJSON(data.canvasJSON, () => {
                    fabricCanvasRef.current.renderAll();
                    setTimeout(() => {
                      fabricCanvasRef.current.requestRenderAll();
                    }, 100);
                  });
                }
              }
            });
          } catch (error) {
            console.error('Error loading canvas:', error);
          }
        }
      }
    };

    initCanvas();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [canvasId]);

  const addRectangle = () => {
    if (!fabricCanvasRef.current) return;
    
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#3498db',
      width: 100,
      height: 100,
      stroke: '#2980b9',
      strokeWidth: 2,
    });
    fabricCanvasRef.current.add(rect);
    fabricCanvasRef.current.setActiveObject(rect);
    fabricCanvasRef.current.renderAll();
  };

  const addCircle = () => {
    if (!fabricCanvasRef.current) return;
    
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: '#e74c3c',
      radius: 50,
      stroke: '#c0392b',
      strokeWidth: 2,
    });
    fabricCanvasRef.current.add(circle);
    fabricCanvasRef.current.setActiveObject(circle);
    fabricCanvasRef.current.renderAll();
  };

  const addText = () => {
    if (!fabricCanvasRef.current) return;
    
    const text = new fabric.IText('Edit me!', {
      left: 200,
      top: 200,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#2c3e50',
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  };

  const enablePenTool = () => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.isDrawingMode = true;
    fabricCanvasRef.current.freeDrawingBrush.color = '#000000';
    fabricCanvasRef.current.freeDrawingBrush.width = 3;
  };

  const disablePenTool = () => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.isDrawingMode = false;
  };

  const deleteSelected = () => {
    if (!fabricCanvasRef.current) return;
    
    const activeObjects = fabricCanvasRef.current.getActiveObjects();
    if (activeObjects.length) {
      fabricCanvasRef.current.remove(...activeObjects);
      fabricCanvasRef.current.discardActiveObject();
      fabricCanvasRef.current.renderAll();
    }
  };

  const clearCanvas = () => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.clear();
    fabricCanvasRef.current.backgroundColor = '#ffffff';
    fabricCanvasRef.current.renderAll();
  };

  const changeColor = (color) => {
    if (!fabricCanvasRef.current) return;
    
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      activeObject.set('fill', color);
      fabricCanvasRef.current.renderAll();
    }
  };

  const getSelectedObject = () => {
    if (!fabricCanvasRef.current) return null;
    return fabricCanvasRef.current.getActiveObject();
  };

  const saveCanvas = async (currentId) => {
    if (!fabricCanvasRef.current) return;
    
    isSavingRef.current = true;
    const canvasJSON = fabricCanvasRef.current.toJSON();
    
    try {
      if (!currentId || currentId === 'new') {
        const newId = await canvasService.saveCanvas({ canvasJSON });
        isSavingRef.current = false;
        return newId;
      } else {
        await canvasService.updateCanvas(currentId, { canvasJSON });
        isSavingRef.current = false;
      }
    } catch (error) {
      console.error('Error saving canvas:', error);
      isSavingRef.current = false;
      throw error;
    }
  };

  const exportCanvas = () => {
    if (!fabricCanvasRef.current) return;
    
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.download = `canvas-${canvasId || 'export'}.png`;
    link.href = dataURL;
    link.click();
  };

  return {
    canvasRef,
    fabricCanvasRef,
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
  };
};