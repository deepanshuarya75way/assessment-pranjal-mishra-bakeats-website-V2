import { computeTotal } from "../../../functions/_lib/prices.js";

const items= [{title : 'Classic Rusks', qty: 2}]
console.log('supported 201310:',  computeTotal(items, "201310"))
console.log('unsupported 202020:',  computeTotal(items, "202020"))