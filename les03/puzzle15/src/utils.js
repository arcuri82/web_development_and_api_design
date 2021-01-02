
export function createMatrix(rows, columns, value){

    //    A matrix is an array (rows) of arrays (columns)

    //first create an array with given number of rows
    return Array(rows)
        /*
            unfortunately, in JS, Array(n) does not properly initialize the array and its indices,
            which would let the following needed "map()" to not work :(
            so, we force the initialization with fill(), even though we do not care of its content (eg, can be null).
            Note, an alternative would be to write something like "Array.from(Array(rows))"
         */
        .fill(null)
        // the map here will return a new array, where each value is what returned by the given lambda (ie the =>
        // function). In this case, each element in the input array (which are null) is replaced with a new array,
        // representing the column values for that given row
        .map(() => Array(columns).fill(value));
}


export function cloneMatrix(matrix){
    /*
        Here, we need a deep cloning.
        The "map()" will create a new array for the rows, but we still need to clone each single column array.
        To copy an array, we can use the method "slice()".
        However, that does a shallow copy, ie the "values" in the array are just copied by reference.
        This is fine only as long as such values are immutable, eg numbers and strings.
        If the values are mutable objects, then we would need clone them as well.
     */
    return matrix.map(e => e.slice());
}
