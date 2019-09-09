import { Component, LNode } from '../../lib'
import TestComp from './testComp/TestComp'
import TestLoop from './testComp/TestLoop'
import * as path from 'path'


require('./app.lkf')
require('./app.css')
// @head({
//     template: path.resolve(__dirname, 'app.lkf'),
//     stylesheet: require('./app.css'),
//     components: { TestComp, TestLoop }
// })
export default class App extends Component {

    vartest: string = 'Hello there'

    componentDidMount() {

        //database.get('City').subscribe((data) => console.log('obs', data))

        // setTimeout(() => {
        //     //this.refresh()
        //     this.vartest = 'Hi!'

        // }, 2000);


    }
}