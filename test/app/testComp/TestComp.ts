import { Component } from '../../../lib'
import * as path from 'path'
require('./TestComp.lkf')
require('./TestComp.css')
// @head({
//     template: path.resolve(__dirname, './TestComp.lkf'),
//     stylesheet: require('./TestComp.css')
// })
export default class TestComp extends Component {

    componentDidMount() {
        // setTimeout(() => {
        //     if (this.elements.div) {
        //         this.elements.div.innerText = 'new text'
        //     }
        // }, 1000);
    }
}