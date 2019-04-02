import { render } from './render';

const input = require('../test/template.lkf').default;

const page = render(input);

document.body.appendChild(page)
