import React, { useState, useEffect } from 'react';
import Welcome from './welcomescr';
import Home from './home';

function App() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []); 

  return (
    <div>
     <div>
      {isVisible && <Welcome />}
    </div>
   <div>
   {!isVisible && <Home />}
   
   </div> 
   
  
   </div> 
  );
}

export default App;
