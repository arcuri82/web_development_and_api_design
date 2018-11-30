
export function createMatrix(rows, columns, value){
    return Array(rows).fill(null).map(() => Array(columns).fill(value));
}


export function cloneMatrix(matrix){
    return matrix.map(e => e.slice());
}
