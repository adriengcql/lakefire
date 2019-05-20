
import { Observable } from 'rxjs';
import { debug, last } from './helpers';
import { EventEmitter } from 'events';

interface IQuery {
    model: string
    keys: string[]
    filters: any
    options: any
}

class Collection {
    private data: any = {};
    model: string;

    constructor(model: string) {
        this.model = model;
    }

    public insert(obj: any) {

    }

    public insertMany(array: any[]) {
        array.map((obj) => this.insert(obj))
    }
}

class QueryObs extends Observable<any> {

    emitter: EventEmitter = new EventEmitter()
    public type: 'array' | 'value'
    public data: any[] | any

    constructor(type: 'array' | 'value') {

        super((observer) => {
            //observer.next(this.data)
            this.emitter.on('data', (data: any) => {
                observer.next(data)
            })
            this.emitter.on('error', (err) => {
                observer.error(last(err))
            })
            return {
                unsubscribe() { }
            }
        })

        this.type = type
        return this.data
    }

    send(data: any) {
        if (Array.isArray(data)) {
            if (!this.data) {
                this.data = []
            }
            this.data = this.data.concat(data)
        }
        else {
            this.data = data
        }
        this.emitter.emit('data', data)
    }

    error(err: any) {
        this.emitter.emit('error', [err])
    }
}


export class Database {


    socket: WebSocket
    requestStack: any[] = []
    queries: any[] = []
    sentQueries = new Set()
    queriesObs: QueryObs[] = []
    queriesIndex: string[] = []
    database: { [model: string]: Collection } = {}

    constructor(url: string) {
        this.socket = new WebSocket('ws://' + url)

        this.socket.onopen = () => {
            debug('socket connected');
            while (this.requestStack.length) {
                this.fetch(this.requestStack.pop())
            }
        }

        this.socket.onclose = () => {
            debug('socket disconnected');
        }

        this.socket.onmessage = (msg) => {
            const data = JSON.parse(msg.data)

            const srcQuery = this.queries[data.requestId]
            const collection = this.database[srcQuery.model]
            const obs = this.queriesObs[data.requestId]

            if (data.err) {
                console.error(data.err)
                obs.error(data.err)
                return
            }

            if (srcQuery.options.one) {
                collection.insert(data.item)
                obs.send(data.item)
            }
            else {
                collection.insertMany(data.items)
                obs.send(data.items)
            }
        }
    }

    public get(model: string, keys: string[] = [], filters: any = {}, options: any = {}): Observable<any> {
        const query = { model, keys, filters, options } as IQuery
        return this.fetch(query)

    }

    private fetch(query: IQuery): Observable<any> {
        if (!this.database[query.model]) {
            this.database[query.model] = new Collection(query.model)
        }
        let requestId = this.queriesIndex.indexOf(JSON.stringify(query))
        if (requestId === -1) {
            requestId = this.queries.length;
            this.queriesIndex.push(JSON.stringify(query))
            this.queries.push(query)
            this.queriesObs.push(new QueryObs(query.options.one ? 'value' : 'array'))
        }
        if (this.socket.readyState === 1) {
            if (!this.sentQueries.has(requestId)) {
                this.sentQueries.add(requestId)
                this.socket.send(JSON.stringify({ requestId, ...query }))
                console.log('request sent ', query)
            }
        } else {
            this.requestStack.push(query)
        }
        return this.queriesObs[requestId];
    }
}