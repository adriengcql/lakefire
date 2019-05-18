import { parse } from "./parser";

export default async function (source: string) {
    const output = await parse(source)
    return `module.exports = ${JSON.stringify(output)}`;
}

