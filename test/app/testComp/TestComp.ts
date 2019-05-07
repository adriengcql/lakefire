import { Component, head } from '../../../dist'


@head({
    template: require('./TestComp.json'),
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