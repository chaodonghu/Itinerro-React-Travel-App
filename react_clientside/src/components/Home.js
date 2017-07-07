import React from 'react';
import {Link} from 'react-router-dom';
import ReactDom from 'react-dom';
import Header from './HomePage/Header'
import Intro from './HomePage/Intro'
import Content from './HomePage/Content'
import Parallax from 'react-springy-parallax'

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
      <Parallax ref="parallax" pages={3}>

    <Parallax.Layer offset={0} speed={1} style={{ backgroundColor: '#243B4A' }} />
    <Parallax.Layer offset={1} speed={1} style={{ backgroundColor: '#A5ECFF' }} />
    <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />


    {/* Header Video */}
    <Parallax.Layer
        offset={0}
        speed={0.5}
        style={styles}
        onClick={() => this.refs.parallax.scrollTo(1)}>
        <Header/>
    </Parallax.Layer>

    {/* Landmark */}
    <Parallax.Layer
        offset={1.4}
        speed={0.5}
        >
        <img src="/static/images/landmark1.png" style={{display: 'block', 'marginRight': '90%'}}/>
    </Parallax.Layer>

    {/* Tourist Gif */}
    <Parallax.Layer
        offset={1.0}
        speed={1}
        >
        <img src="/static/images/tourist.gif" style={{display: 'block', 'marginLeft': '55%'}}/>
    </Parallax.Layer>

    {/* Intro */}

    <Parallax.Layer
        offset={1}
        speed={1}
        style={styles}
        onClick={() => this.refs.parallax.scrollTo(2)}>
        <Intro/>
    </Parallax.Layer>

    {/* Cloud SVG */}
    <Parallax.Layer
        offset={2.1}
        speed={0.5}
        >
        <img src="/static/images/cloud.svg" style={{display: 'block', width: '20%', 'marginLeft': '50%', opacity: '0.6'}}/>
    </Parallax.Layer>

    {/* Cloud SVG */}
    <Parallax.Layer
        offset={2.3}
        speed={-0.2}
        >
        <img src="/static/images/cloud.svg" style={{display: 'block', width: '20%', 'marginLeft': '80%', opacity: '0.6'}}/>
    </Parallax.Layer>

    {/* Cloud SVG */}
    <Parallax.Layer
        offset={2.4}
        speed={-0.3}
        >
        <img src="/static/images/cloud.svg" style={{display: 'block', width: '20%', 'marginLeft': '10%', opacity: '0.6'}}/>
    </Parallax.Layer>

    {/* Kangaroo SVG */}
    <Parallax.Layer
        offset={2.5}
        speed={1}
        >
        <img src="/static/images/kangaroo.svg" style={{display: 'block', width: '15%', 'marginLeft': '40%'}}/>
    </Parallax.Layer>

    {/* Earth SVG */}
    <Parallax.Layer
        offset={2.5}
        speed={-0.4}
        >
        <img src="/static/images/earth.svg" style={{width: '60%','marginLeft': '40%'}}/>
    </Parallax.Layer>

    {/* Content */}
    <Parallax.Layer
        offset={2}
        speed={0.7}
        style={styles}
        onClick={() => this.refs.parallax.scrollTo(0)}>
        <Content/>
    </Parallax.Layer>

    {/* Plane SVG */}
    <Parallax.Layer
        offset={2.7}
        speed={-0.89}
        >
        <img src="/static/images/plane.png" style={{display: 'block', width: '10%', 'marginLeft': '88%'}}/>
    </Parallax.Layer>




</Parallax>
    );
  }
}
