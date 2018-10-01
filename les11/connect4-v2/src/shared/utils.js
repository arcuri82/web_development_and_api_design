
function createMatrix (rows, columns, value){
    return Array(rows).fill(null).map(() => Array(columns).fill(value));
}


function cloneMatrix(matrix){
    if(matrix === null){
        return null;
    }
    return matrix.map(e => e.slice());
}


module.exports = {createMatrix, cloneMatrix};