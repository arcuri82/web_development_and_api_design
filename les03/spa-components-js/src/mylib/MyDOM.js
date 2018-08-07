
/*
    For simplicity, will just deal with the rendering of a single
    root component (with its children).
    But this could be a collection
 */
let _component;
let _htmlHook;


export const render = function(component, htmlHook){

    _component = component;
    _htmlHook = htmlHook;

    update();
};

export const update = function(){

    const html = _component.render();

    _htmlHook.innerHTML = html;
};


export const callMethodOnComponent = function (id, method_name) {

    const target = findComponent(_component, id);
    if(! target){
        throw "Could not find component with id: " + id;
    }

    target[method_name]();
};


window.MyDOM_callMethodOnComponent = callMethodOnComponent;


const findComponent = function(current, id){

    if(current.id === id){
        return current;
    }

    if(! current.children){
        return null;
    }

    for(let i=0; i<current.children.length; i++){
        const k = findComponent(current.children[i], id);
        if(k !== null){
            return k;
        }
    }

    return null;
};



