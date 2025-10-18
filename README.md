#  Canvas Editor

A real-time collaborative canvas editor built with React, Fabric.js, and Firebase. Create, edit, and share your drawings with automatic cloud synchronization.

##  Features

- **Draw & Edit**: Create shapes, text, and freehand drawings with an intuitive toolbar
- **Real-time Sync**: Changes are automatically synchronized across all users viewing the same canvas
- **Auto-Save**: Your work is automatically saved to the cloud every 5 seconds
- **Export PNG**: Download your canvas as a high-quality PNG image
- **Shareable Links**: Each canvas has a unique URL that can be shared with others
- **Rich Editing Tools**:
  - Rectangle and Circle shapes
  - Text editing with custom fonts
  - Freehand drawing with pen tool
  - Color picker for customizing objects
  - Move, resize, and rotate any object
  - Delete and clear canvas options

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd canvas-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Go to Project Settings > General
   - Copy your Firebase configuration

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📖 How to Use

### Creating a New Canvas

1. Click **"Start Creating"** on the landing page
2. You'll be redirected to a new blank canvas at `/canvas/new`
3. Use the toolbar to add shapes, text, or draw freehand
4. Click **"Save"** to create a shareable link
5. The URL will update with a unique canvas ID

### Editing an Existing Canvas

1. Open a canvas URL (e.g., `http://localhost:5173/canvas/abc123`)
2. The saved canvas will load automatically
3. Make your changes
4. Changes are auto-saved every 5 seconds

### Toolbar Options

- **Select**: Click to select and move objects
- **Rectangle**: Add a blue rectangle to the canvas
- **Circle**: Add a red circle to the canvas
- **Text**: Add editable text
- **Pen**: Draw freehand with the pen tool
- **Color**: Change the color of selected objects
- **Save**: Manually save your canvas
- **Delete**: Remove selected objects
- **Clear**: Clear the entire canvas
- **Export**: Download canvas as PNG

### Sharing Your Canvas

1. After saving, copy the URL from your browser's address bar
2. Share the URL with others
3. Multiple users can view and edit the same canvas in real-time

## 🏗️ Project Structure

```
canvas-editor/
├── src/
│   ├── components/
│   │   ├── Canvas.jsx           # Main canvas component
│   │   ├── Toolbar.jsx          # Toolbar with editing tools
│   │   └── ColorPicker.jsx      # Color selection component
│   ├── hooks/
│   │   └── useCanvas.jsx        # Custom hook for canvas logic
│   ├── pages/
│   │   ├── LandingPage.jsx      # Home page
│   │   └── CanvasPage.jsx       # Canvas editor page
│   ├── services/
│   │   ├── firebase.js          # Firebase configuration
│   │   └── canvasService.js     # Firestore operations
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── .env                         # Environment variables
├── package.json                 # Dependencies
└── vite.config.js              # Vite configuration
```

## 🔧 Tech Stack

- **Frontend**: React 18 with Vite
- **Canvas Library**: Fabric.js 6.x
- **Database**: Firebase Firestore
- **Routing**: React Router v6
- **Styling**: Inline CSS (no external libraries)

## 🗄️ Database Schema

### Firestore Collection: `canvases`

```javascript
{
  canvasJSON: {
    version: "6.0.0",
    objects: [
      {
        type: "rect",
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: "#3498db",
        // ... other fabric.js properties
      }
    ],
    background: "#ffffff"
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔄 How It Works

### Canvas Creation Flow

```
User clicks "Start Creating"
    ↓
Navigate to /canvas/new
    ↓
Empty canvas loads
    ↓
User adds shapes/drawings
    ↓
User clicks "Save"
    ↓
Canvas JSON saved to Firestore
    ↓
New document ID returned
    ↓
URL updates to /canvas/{id}
    ↓
Auto-save enabled
```

### Canvas Loading Flow

```
User opens /canvas/{id}
    ↓
useCanvas hook initializes
    ↓
Fetch canvas data from Firestore
    ↓
Load canvas JSON into Fabric.js
    ↓
Render all objects
    ↓
Subscribe to real-time updates
    ↓
Listen for changes from other users
```

### Real-time Synchronization

```
User A edits canvas
    ↓
Auto-save triggered (5s interval)
    ↓
Canvas JSON saved to Firestore
    ↓
Firestore triggers snapshot listener
    ↓
User B receives update
    ↓
Canvas reloads with new data
    ↓
User B sees User A's changes
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Changing Canvas Size

Edit `useCanvas.jsx`:
```javascript
fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
  width: 1200,  // Change width
  height: 800,  // Change height
  backgroundColor: '#ffffff',
});
```

### Changing Auto-Save Interval

Edit `CanvasPage.jsx`:
```javascript
const interval = setInterval(async () => {
  // ...
}, 10000); // Change to 10 seconds (10000ms)
```

### Adding Custom Shapes

Edit `useCanvas.jsx`:
```javascript
const addTriangle = () => {
  const triangle = new fabric.Triangle({
    left: 100,
    top: 100,
    fill: 'green',
    width: 100,
    height: 100,
  });
  fabricCanvasRef.current.add(triangle);
};
```

## 🐛 Troubleshooting

### Canvas not loading
- Check browser console for errors
- Verify Firebase credentials in `.env`
- Ensure Firestore rules allow read/write access

### Objects not appearing after reload
- Check if `canvasJSON` exists in Firestore
- Open browser console and look for "Canvas loaded successfully" message
- Verify the canvas ID in the URL matches Firestore document ID

### Real-time sync not working
- Check if Firestore snapshot listener is active
- Verify network connection
- Check Firestore quota limits

## 🔐 Security Notes

**⚠️ Important**: The `.env` file contains sensitive Firebase credentials. 

For production:
1. Add `.env` to `.gitignore`
2. Set up Firebase Security Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /canvases/{canvas} {
         allow read, write: if true; // Update with proper auth
       }
     }
   }
   ```
3. Enable Firebase Authentication for user-based access control

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Fabric.js, and Firebase**
