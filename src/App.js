import React from 'react';

import Header from './Header'
import ContentArea from './ContentArea';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <ContentArea/>
      </div>
    );
  }
}

export default App;
