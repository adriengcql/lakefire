import { Component, head } from '../../../lib'


@head({
    template: require('./TestComp.lkf'),
    stylesheet: require('./TestComp.css')
})
export default class TestComp extends Component {

    componentDidMount() {
        // setTimeout(() => {
        //     if (this.elements.div) {
        //         this.elements.div.innerText = 'new text'
        //     }
        // }, 1000);
    }
}