/*
    When we "import" the default object exported by a library, we can give it any name
    we want, eg., "_" in this case.
    Such name is then use as a variable in the rest of this module
 */
import _ from 'lodash';

/*
    A library/module could export several different objects/functions.
    In such case, a common approach is to "import" an object definition
    where each element we want to use from that module is declared.
    This creates variables associated to those names, which then can be
    used directly.
 */
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
