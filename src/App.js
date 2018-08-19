import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Page1 from './components/Page1';

// with code splitting, we dont need the below. We will load it async
// import Page2 from './components/Page2';
// import Page3 from './components/Page3';

//Async component loading
import AsyncComponent from './components/AsyncComponent';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      route: 'page1',
      component: null //added a component to the state for code-splitting
    }
  }

  onRouteChange = (route) => {
    //with no code splitting
    //this.setState({route: route});

    //with code splitting -- version 1
    // if (route === 'page1') {
    //   this.setState({ route: route});
    // } else if (route === 'page2') {
    //   //async
    //   //works because of webpack
    //   import('./components/Page2').then((Page2) => {
    //     //access component with Component.default 
    //     this.setState({route: route, component: Page2.default});
    //   });
    // } else if (route === 'page3') {
    //   //async
    //   //works because of webpack
    //   import('./components/Page3').then((Page3) => {
    //     this.setState({route: route, component: Page3.default});
    //   });
    // }

    //with code splitting -- version 2
    this.setState({ route: route});    
    
  }

  render() {
      //without code splitting
      // if(this.state.route === 'page1') {
      //   return <Page1 onRouteChange={this.onRouteChange}/>
      // } else if (this.state.route === 'page2') {
      //   return <Page2 onRouteChange={this.onRouteChange}/>
      // } else if (this.state.route === 'page3') {
      //   return <Page3 onRouteChange={this.onRouteChange}/>
      // }


      //with code splitting - version 1
      // if (this.state.route === 'page1') {
      //   return <Page1 onRouteChange={this.onRouteChange} />
      // } else {
      //   return <this.state.component onRouteChange={this.onRouteChange} />
      // }

      //with code splitting - version 2
      if(this.state.route === 'page1') {
        return <Page1 onRouteChange={this.onRouteChange}/>
      } else if (this.state.route === 'page2') {
        //load the component asynchronously
        //then render it
        const AsyncPage2 = AsyncComponent(() => import('./components/Page2'));
        return <AsyncPage2 onRouteChange={this.onRouteChange} />
      } else if (this.state.route === 'page3') {
        const AsyncPage3 = AsyncComponent(() => import('./components/Page3'));
        return <AsyncPage3 onRouteChange={this.onRouteChange} />
      }
  }
}

export default App;
