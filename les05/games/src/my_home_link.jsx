import React from "react";
import {Link} from "react-router-dom";

export const MyHomeLink = () =>{

    return(
        <div>
            Link back to <Link to={"/"}>Home</Link>.
        </div>
    );
};