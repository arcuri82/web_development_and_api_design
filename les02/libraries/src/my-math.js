import _ from 'lodash';


export function computeMin(array){
    return _.min(array);
}

export function computeMax(array) {
    return _.max(array);
}

export function computeMean(array){
    return _.mean(array);
}

export function computeSum(array) {
    return _.sum(array);
}