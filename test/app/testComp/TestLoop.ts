import { Component, head } from '../../../lib'
import { database } from '../'


@head({
    template: require('./TestLoop.lkf'),
    components: { database },
    stylesheet: require('./TestLoop.scss')
})
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