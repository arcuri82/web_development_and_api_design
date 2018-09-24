
export const createMatrix = function(rows, columns, value){
    return Array(rows).fill(null).map(() => Array(columns).fill(value));
};


export const cloneMatrix = function(matrix){
    if(matrix === null){
        return null;
    }
    return matrix.map(e => e.slice());
};
