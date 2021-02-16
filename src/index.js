import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Greeting from './Greeting';

const element = document.createElement('div');
element.id = 'app';
document.body.appendChild(element);

ReactDOM.render(<Greeting name="React" />, document.getElementById('app'));
