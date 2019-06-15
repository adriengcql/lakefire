import { Component, head } from 'lakefire'
import { database } from './'

@head({
    template: require('./app.lkf'),
    stylesheet: require('./app.scss'),
    components: { database }
})
export default class App extends Component {

    componentDidMount() { }

}