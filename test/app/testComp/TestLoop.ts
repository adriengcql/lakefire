import { Component, head } from '../../../dist'
import { database } from '../'


@head({
    template: require('./TestLoop.json'),
    components: { database }
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