import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCreateCanvas = () => {
    navigate(`/canvas/new`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a',
      color: '#e0e0e0',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        padding: '40px'
      }}>
        <h1 style={{
          fontSize: '4rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#fffffff6'
        }}>
          Want to create amazing drawings?
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '40px',
          color: '#b0b0b0'
        }}>
          Create and edit your drawings with ease
        </p>

        <button
          onClick={handleCreateCanvas}
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#1a1a1a',
            background: '#ebebebff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#e0e0e0';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#ffffff';
          }}
        >
          Start Creating 
        </button>

        <div style={{
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '12px 24px',
            background: '#2a2a2a',
            color: '#ffffff',
            border: '1px solid #3a3a3a',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#3a3a3a';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#2a2a2a';
          }}
          >
            Draw & Edit
          </button>

          <button style={{
            padding: '12px 24px',
            background: '#2a2a2a',
            color: '#ffffff',
            border: '1px solid #3a3a3a',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#3a3a3a';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#2a2a2a';
          }}
          >
            Real-time Sync
          </button>

          <button style={{
            padding: '12px 24px',
            background: '#2a2a2a',
            color: '#ffffff',
            border: '1px solid #3a3a3a',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#3a3a3a';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#2a2a2a';
          }}
          >
            Auto-Save
          </button>

          <button style={{
            padding: '12px 24px',
            background: '#2a2a2a',
            color: '#ffffff',
            border: '1px solid #3a3a3a',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#3a3a3a';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#2a2a2a';
          }}
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;