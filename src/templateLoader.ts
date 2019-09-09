import { parse } from "./parser";

export default async function (this: any, source: string) {
    console.log(this as any);

    const output = await parse(source)
    return `
        module.exports = ${JSON.stringify(output)}`;
}

