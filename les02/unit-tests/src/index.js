import {computeMax, computeMin, computeMean, computeSum} from "./my-math";


export function validateInput(input) {

    if (typeof(input) !== 'string') {
        return false;
    }

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

