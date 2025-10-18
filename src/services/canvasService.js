import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';

export const canvasService = {
  async saveCanvas(canvasData) {
    try {
      const docRef = await addDoc(collection(db, 'canvases'), {
        ...canvasData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Canvas created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving canvas:', error);
      throw error;
    }
  },

  async updateCanvas(canvasId, canvasData) {
    try {
      const canvasRef = doc(db, 'canvases', canvasId);
      await updateDoc(canvasRef, {
        ...canvasData,
        updatedAt: new Date()
      });
      console.log('Canvas updated:', canvasId);
    } catch (error) {
      console.error('Error updating canvas:', error);
      throw error;
    }
  },

  subscribeToCanvas(canvasId, callback) {
    const canvasRef = doc(db, 'canvases', canvasId);
    return onSnapshot(canvasRef, (doc) => {
      if (doc.exists()) {
        console.log('Canvas snapshot received');
        callback({ id: doc.id, ...doc.data() });
      } else {
        console.log('Canvas document does not exist');
      }
    });
  },

  async getCanvas(canvasId) {
    try {
      const canvasRef = doc(db, 'canvases', canvasId);
      const canvasDoc = await getDoc(canvasRef);
      if (canvasDoc.exists()) {
        console.log('Canvas fetched:', canvasDoc.id);
        return { id: canvasDoc.id, ...canvasDoc.data() };
      } else {
        console.log('Canvas not found');
        return null;
      }
    } catch (error) {
      console.error('Error getting canvas:', error);
      throw error;
    }
  }
};