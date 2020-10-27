import React from 'react';
import {
    Link
  } from "react-router-dom";

export function Header() {

return <header id="main-header">    
        <nav>
            <Link to="/">Home</Link>
            <p>Django Graphene React</p>
            <ul>
                <li><Link to="/addeducation">Add education</Link></li>
            </ul>
        </nav>
    </header>
}