import React from 'react';
import {Link} from 'react-router-dom';
import ReactDom from 'react-dom';
import Header from './HomePage/Header'
import Intro from './HomePage/Intro'
import Content from './HomePage/Content'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const styles = {
            fontFamily: 'Menlo-Regular, Menlo, monospace',
            fontSize: 14,
            lineHeight: '10px',
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }
    return (
      <div>
      <Header/>
      <Intro/>
      <Content/>
    </div>
    );
  }
}
