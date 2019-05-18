import { Component, head } from 'lakefire'
import { database } from './'

@head({
    template: require('./app.json'),
    stylesheet: require('./app.css'),
    components: { database }
})
export default class App extends Component {

    componentDidMount() { }

}