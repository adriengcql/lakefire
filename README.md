# Lakefire

## Quick Start

```
> npm install --save-dev lakefire
> lakefire init
```

Install VScode `Lakefire` extansion for language support

## Component based

Develop faster with components and enjoy their simplicity (similar to Angular or React)

```
container
    MyComponent(props={color: 'blue'})
```


## Simple template syntax

Use a simple and clear syntax to write your templates. (pug like)
- No unecessary punctuation and closing tags
- Build in loops and conditions
- Embedded javascript linked to your component
- Containers for simple layout
- Use observable inside template and refresh is trigger with new data

```
container middle left margin 20
    input#firstName.form-control(type='text')
    button.btn-light(title='title') Done
```

## Build in live data connection (experimental)

Stop fighting with REST endpoint, data fetching is made simplier
- Socket connection to fetch data in Mongo via Moongoose : live data without effort
- Simple request syntax on client side : get only the data you need, no less, no more (fields are compiled automatically)
- Powerful cache and request building to get your data faster

```
container
    table
        for city of database.get('City')
            tr
                td {city.name}
                td {city.population}
```

## Containers (experimental)

Build layout directly on your template and keep CSS for styling.

## Full liberty

Although usual features are simplified and automated, no limit is set to what you can do, just code as before.

## VSCode integration

Coloring and completion for .lkf template.