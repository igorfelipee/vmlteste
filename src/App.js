import React, { Component } from 'react';
import SideBar from './components/SideBar';
import './css/font-awesome.min.css';

class App extends Component{
  render(){
    return(
      <div>
        <SideBar />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
