import { Component, head } from '../../lib'
import TestComp from './testComp/TestComp'
import TestLoop from './testComp/TestLoop'
import { database } from './'

@head({
    template: require('./app.lkf'),
    components: { TestComp, TestLoop, database }
})
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