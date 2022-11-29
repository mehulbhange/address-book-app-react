import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/home/Home';
import AddressForm from './components/address-book-form/AddressForm';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Header2 from './components/Header2';


function App() {
  return (
    <div>
      <Header />
      {/* <Header2 /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/addressbook-form" component={AddressForm} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
