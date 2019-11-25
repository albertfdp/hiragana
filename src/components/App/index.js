import React from 'react';

import { Router, navigate } from '@reach/router';

import Quiz from '../Quiz';
import Welcome from '../WelcomePage';

const App = () => {
  return (
    <Router className="router">
      <Quiz level="easy" path="/quiz/:kana" onRestart={() => navigate('/')} />
      <Welcome path="/" />
    </Router>
  );
};

export default App;
