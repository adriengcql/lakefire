import { TokenList } from "./tokenUtil";

const vsctm = require('vscode-textmate')
const jsonGrammar = require('../resources/syntaxes/lkf.tmLanguage.json')

const registry = new vsctm.Registry()
const loader = registry.addGrammar(jsonGrammar)

export async function tokenize(input: string, tabWidth: number = 4): Promise<TokenList> {

    const grammar = await loader

    const tokens: any[] = []
    let i = 1
    let ruleStack = null
    for (const line of input.split('\r\n')) {
        const lineTokens: any = grammar.tokenizeLine(line, ruleStack)
        ruleStack = lineTokens.ruleStack

        const tok: any = {
            line: i,
            indent: Math.floor(line.search(/[^\s]/) / tabWidth),
            tokens: lineTokens.tokens.map((t: any) => ({
                line: i,
                col: t.startIndex,
                value: line.substring(t.startIndex, t.endIndex),
                type: t.scopes.slice().reverse().find((s: string) => s.split('.')[0] === 'entity') || t.scopes.length && t.scopes[t.scopes.length - 1] || '',
                scopes: t.scopes
            })).filter((t: any) => t.value.search(/\w/) >= 0)
        }
        tok.type = tok.tokens.length && tok.tokens[0].scopes.length > 1 && tok.tokens[0].scopes[1]
        tokens.push(tok)
        i++
    }

    return tokens
}