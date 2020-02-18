import React, { Component, createContext, useContext } from 'react';

export const ContentialContext = createContext();
export const useContential = () => useContext(ContentialContext);

export class ContentialProvider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, client } = this.props;

    return (
      <ContentialContext.Provider value={{ client }}>
        {children}
      </ContentialContext.Provider>
    );
  }
}
