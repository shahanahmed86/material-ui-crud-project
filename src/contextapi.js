import React, { createContext } from 'react';

export const { Provider, Consumer } = createContext();

export const withContext = (Component) => (props) => (
    <Consumer>
        {(value) => <Component {...props} {...value} />}
    </Consumer>
);