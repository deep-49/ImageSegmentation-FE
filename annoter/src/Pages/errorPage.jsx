import { NavLink, useRouteError } from "react-router-dom"
import React from "react";
export default function ErrorPage(){
    const error=useRouteError();
    console.log("Error")
    return(
        <div>
            <h1>opps you have an error</h1>
        {error && <p>{error.data}</p>}
        <NavLink to="/" ><button>Go Back</button></NavLink>

        </div>
    )
}