# Lakefire

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

```
container middle left margin 20
    input#firstName.form-control(type='text')
    button.btn-light(title='title') Done
```

## Built in live data connection

- Socket connection to fetch data in Mongo via Moongoose: live data without effort
- Simple request syntax on client side: get only the data you need, no less, no more (fields are compiled automatically)
- Powerful cache and request building to get your data faster

```
container
    for city of database.get('City')
        table
            tr
                td {city.name}
                td {city.population}
```

## VSCode integration

Syntax highlight and auto completion for .lkf template
