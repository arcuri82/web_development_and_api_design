import {computeMax, computeMin, computeMean, computeSum} from "./my-math";


export function validateInput(input) {

    if (typeof(input) !== 'string') {
        return false;
    }

    /*
        JS regular expressions are inside / /
        ^: match beginning of the string
        $: match end of the string
        \s: empty space
        \s*: any number of empty spaces (0, 1 or more)
        ?: optional (0 or 1)
        -?: the character '-' is optional
        [0-9]: any single digit between 0 and 9
        [0-9]+: 1 or more digits, ie a number
        \s*,\s*: any number of spaces, then a ',', followed by any number of spaces
        (\s*,\s*-?[0-9]+)*:  the match (comma ',' followed by a number, with possibly spaces)
                             repeated 0, 1 or more times
        \s*$: string ends with any number of spaces (0, 1 or more)
     */

    return input.match(/^\s*-?[0-9]+(\s*,\s*-?[0-9]+)*\s*$/) !== null;
}


export function updatePage() {

    const inputField = document.getElementById("inputId");
    const inputValue = inputField.value;

    const isBlank = inputValue.trim().length === 0;

    const no_array = "No input array. Type one.";

    let min = no_array;
    let max = no_array;
    let mean = no_array;
    let sum = no_array;

    if (! isBlank) {

        if(! validateInput(inputValue)){

            const invalid_array = "Error. The input array is invalid. Should just contain numbers separated by ',' commas."

            min = invalid_array;
            max = invalid_array;
            mean = invalid_array;
            sum = invalid_array;

        } else {

            const array = inputValue.split(',').map(Number);

            min = computeMin(array);
            max = computeMax(array);
            mean = computeMean(array);
            sum = computeSum(array);
        }
    }

    document.getElementById("minId").innerHTML = min;
    document.getElementById("maxId").innerHTML = max;
    document.getElementById("meanId").innerHTML = mean;
    document.getElementById("sumId").innerHTML = sum;

    if(inputField.oninput === null){
        inputField.oninput = updatePage;
    }
}

