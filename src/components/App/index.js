import React, { useState } from 'react';

import Quiz from '../Quiz';
import Welcome from '../WelcomePage';

const App = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <Welcome onStart={() => setStarted(true)} />;
  }

  return <Quiz level="easy" onRestart={() => setStarted(false)} />;
};

export default App;
