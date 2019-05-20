export class Router {

    static navigate(route: string) {
        history.pushState({}, '', route)
    }
}