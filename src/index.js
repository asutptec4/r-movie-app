import React from 'react';
import ReactDOM from 'react-dom';

import Greeting from './Greeting';
import './index.scss';

const element = document.createElement('div');
element.id = 'app';
document.body.appendChild(element);

ReactDOM.render(<Greeting name="React" />, document.getElementById('app'));
