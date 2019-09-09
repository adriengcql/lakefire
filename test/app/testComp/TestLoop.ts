import { Component } from '../../../lib'
import * as path from 'path'
require('./TestLoop.lkf')
require('./TestLoop.scss')
// @head({
//     template: path.resolve(__dirname, './TestLoop.lkf'),
//     components: {},
//     stylesheet: require('./TestLoop.scss')
// })
export default class TestLoop extends Component {
    hello = 'variable test'

    componentDidMount() {
        // setTimeout(() => {
        //     this.hello = 'Hello'

        // }, 5000);
    }

    test(b: boolean) {

        return b && this.hello === 'Hello'
    }
}