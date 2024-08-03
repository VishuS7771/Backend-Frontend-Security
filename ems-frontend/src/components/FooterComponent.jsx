import React from 'react';

const FooterComponent = () => {

  const footerStyle = {
    backgroundColor: 'rgb(3, 14, 3)',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    height: '50px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 1000,
  };

  return (
    <div>
      <footer style={footerStyle}>
        <span>Test Project Of React Js</span>
      </footer>
    </div>
  );
}

export default FooterComponent;
