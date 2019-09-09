import { Component } from '.';

export class Router {

    private previous: string | undefined

    constructor(private component: Component, private path: string = '') {
    }

    navigate(route: string) {
        history.pushState({}, '', this.path + route)
        this.component.refresh()
    }

    back() {
        history.pushState({}, '', this.path + this.previous)
    }
}