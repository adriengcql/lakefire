
import { Observable } from 'rxjs';
import { debug } from './helpers';

const socket = new WebSocket('ws://localhost:9000');

const requestStack: any[] = [];

const queries: any[] = []
const sentQueries = new Set()
const queriesObs: QueryObs[] = []

const database: { [model: string]: Collection } = {};

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
    requestId: number
    constructor(requestId: number) {
        super((observer) => {
            socket.onmessage = (msg) => {
                const data = JSON.parse(msg.data)
                if (data.err) {
                    observer.error(data.err)
                    return
                }
                if (data.requestId !== this.requestId) {
                    return
                }
                const srcQuery = queries[data.requestId]
                const collection = database[srcQuery.model]
                if (srcQuery.options.one) {
                    collection.insert(data.item)
                    observer.next(data.item)
                }
                else {
                    collection.insertMany(data.items)
                    observer.next(data.items)
                }
                //console.log('database', database)

            }
            return { unsubscribe() { } }
        })
        this.requestId = requestId
    }
}


function messageHandler(observer: any) {
    socket.onmessage = function (msg) {
        const data = JSON.parse(msg.data)
        console.log('message', data);
        if (data.err) {
            observer.error(data.err)
            return
        }
        const srcQuery = queries[data.requestId]
        const collection = database[srcQuery.model]
        if (srcQuery.options.one) {
            collection.insert(data.item)
            observer.next(data.item)
        }
        else {
            collection.insertMany(data.items)
            observer.next(data.items)
        }
        //console.log('database', database)

    }
    return { unsubscribe() { } }
}

socket.onopen = function () {
    debug('socket connected');
    while (requestStack.length) {
        fetchQuery(requestStack.pop())
    }
}

socket.onclose = function () {
    debug('socket disconnected');
}

export function fetchQuery(query: IQuery): Observable<any> {
    if (!database[query.model]) {
        database[query.model] = new Collection(query.model)
    }
    let requestId = queries.indexOf(query)
    if (requestId === -1) {
        requestId = queries.length;
        queries.push(query)
        queriesObs.push(new QueryObs(requestId))
    }
    if (socket.readyState === 1 && !sentQueries.has(query)) {
        sentQueries.add(query)
        socket.send(JSON.stringify({ requestId, ...query }))
        debug('request sent ' + query)
    } else {
        requestStack.push(query)
    }
    return queriesObs[requestId];
}

export function fetch(model: string, keys: string[] = [], filters: any = {}, options: any = {}): Observable<any> {
    const query = { model, keys, filters, options } as IQuery
    return fetchQuery(query)

}