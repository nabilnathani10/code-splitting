import React, { Component} from 'react';

//Create a higher order component
//similar to higher order function
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            //destructuring the component.default
            const { default: component } = await importComponent();
            this.setState({
                component: component
            })
        }

        render() {
            const Component = this.state.component;
            return Component ? <Component {...this.props} /> : null;
        }
    }

    return AsyncComponent;
} 