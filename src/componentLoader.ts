
export default async function (source: string) {
    if (/extends\s+Component/.test(source)) {
        const m = source.match(/import\s*\{([^\{]*Component[^\{]*)\}\s*from/)

        if (!m) {
            return
        }
        let cursor = m.index || 0 + m[0].search(m[1])
        const set = new Set(m[1].split(',').map((i) => i.trim()))
        set.add('LNode')
        set.add('components')
        source = source.replace(/(import\s*\{)([^\{]*Component[^\{]*)(\}\s*from)/, '$1' + Array.from(set).join(', ') + '$3')

        const template = source.match(/require\((.*\.lkf.)*\)/)
        source = source.replace(/require\(.*\.lkf.*\)/, '')
        const stylesheet = source.match(/require\(.*\.(?:css|scss|less|sass).*\)/)
        source = source.replace(/require\(.*\.(css|scss|less|sass).*\)/, '')
        const components = source.match(/(?<=import)\s+(\w+)\s+(?=from)/g)

        const decorator = `
            @components ({
                template: ${template && template[0]},
                stylesheet: ${stylesheet && stylesheet[0]},
                components: { ${components ? components.map((c) => c.trim()).join(', ') : ''} }
            })
        `
        cursor = source.search(/export.*extends\s+Component/)
        source = insert(source, cursor, decorator)

        if (template) {
            const hot = `
                protected initHMR() {
                    if (module.hot) {
                        module.hot.accept(${template[1]}, () => {
                            this.root = { ...require(${template[1]}) as LNode };
                            this.refresh();
                        });
                    }
                }
            `
            const n = source.match(/extends\s+Component\s+\{/)
            if (n && n.index) {
                cursor = n.index + n[0].length
                source = insert(source, cursor, hot)
            }
        }
    }
    return source;
}



function insert(src: string, index: number, str: string) {
    return src.substring(0, index) + str + src.substring(index)
}