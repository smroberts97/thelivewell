import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/materialLayouts/Header.js'
import Footer from './components/materialLayouts/Footer.js'
import AddNewFish from './components/fish/AddNewFish.js'
import SingleFish from './components/fish/SingleFish.js'
import AddNewBait from './components/bait/AddNewBait.js'
import SingleBait from './components/bait/SingleBait'
import AddNewInvoice from './components/invoice/AddNewInvoice.js'
import SingleInvoice from './components/invoice/SingleInvoice.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={Footer} />
          <Route exact path="/fish/create-fish" component={AddNewFish} />
          <Route exact path="/fish/:fishId" component={SingleFish} />
          <Route exact path="/bait/new-piece" component={AddNewBait} />
          <Route exact path="/bait/:baitId" component={SingleBait} />
          <Route exact path="/all-invoices/create-invoice/:customerId" component={AddNewInvoice} />
          <Route exact path="/all-invoices/:invoiceId" component={SingleInvoice} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;