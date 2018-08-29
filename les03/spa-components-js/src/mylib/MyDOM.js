
/*
    For simplicity, will just deal with the rendering of a single
    root component (with its children).
    But this could be a collection
 */
let _component;
let _htmlHook;

/*
    this method is used to "bind" a component to a specific HTML tag
    in the home page.
    The component will be rendered as a child of this tag.
 */
export const render = function(component, htmlHook){

    _component = component;
    _htmlHook = htmlHook;

    update();
};

/*
    This is called internally by our library every time there is a state change
    in any of components.
    It will force the rerendering of the components.
    However, it is very, very inefficient: for any change, the generation of HTML
    is done for ALL the components in the tree, even for the ones that are not
    changed.
    Furthermore, once we get the HTML for the component, we change all of it on the browser,
    and not only the parts that are different.
    What could have been done is to use a "Virtual DOM": keep track of the HTML of the components and,
    when we generate new HTML due to a state change, calculate a "diff" between the existing HTML
    in the browser the and new one, and so then update (ie changes in the actual DOM) only the differences
 */
export const update = function(){

    const html = _component.render();

    _htmlHook.innerHTML = html;
};


/*
    This is a bit tricky. On the HTML generated for a component, we can
    have JS code in the event handlers.
    But such methods should be called on a class instance of that component,
    otherwise it would not be able to use its state.
    In the global scope, we store the root component we display.
    So, we need to refer to specific components on the tree.
    We give each generated component a unique id, and then have a global
    function that takes as input the id and the name of a method in such
    component we want to call.
    Such method will find the right component in the tree, and then call
    such function.
 */
export const callMethodOnComponent = function (id, method_name) {

    const target = findComponent(_component, id);
    if(! target){
        throw "Could not find component with id: " + id;
    }

    /*
        This notation might seem confusing at first.
        "target" is an object.
        On an object, we can access its fields using the [] operator
        specifying the name of the field we want,
        eg obj["aname"] will return the value of the field called "aname"
        in the object called "obj".
        As in our case the value is a function, we can then call
        such function with ().
     */
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



