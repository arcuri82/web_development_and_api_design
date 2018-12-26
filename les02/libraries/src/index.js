import _ from 'lodash';
import {computeMin, computeMax, computeMean, computeSum} from "./my-math.js";


function initValues() {

    const array = [8,1,5,1,1,2,3];

    const min = computeMin(array);
    const max = computeMax(array);
    const mean = computeMean(array);
    const sum = computeSum(array);

    const arrayString = "[" + _.join(array, ", ") + "]";

    document.getElementById("arrayStringId").innerHTML = arrayString;
    document.getElementById("minId").innerHTML = min;
    document.getElementById("maxId").innerHTML = max;
    document.getElementById("meanId").innerHTML = mean;
    document.getElementById("sumId").innerHTML = sum;
};


initValues();
