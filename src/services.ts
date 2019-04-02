
import { Observable } from 'rxjs';

const socket = new WebSocket('ws://localhost:9000');

let requestStack: string[][] = [];

let database: any[] = [];

const dataObs = new Observable((observer) => {
    socket.onmessage = function (msg) {
        console.log(msg.data);
        database = database.concat(msg.data)
        observer.next(database)
    }
    return { unsubscribe() { } }
})

socket.onopen = function () {
    console.log('socket connected');
    while (requestStack.length) {
        fetch(requestStack.pop() || [])
    }
}

socket.onclose = function () {
    console.log('socket disconnected');
}

export function fetch(keys: string[], filters?: any): Observable<any> {
    if (socket.readyState === 1) {
        socket.send(JSON.stringify({ keys, filters }));
        console.log('request sent');
    } else {
        requestStack.push(keys);
    }
    return dataObs;
}