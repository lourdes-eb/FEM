import React from "react";
import {render} from "react-dom";
import Results from "./Results";
import {Router, Link} from "@reach/router";
import Details from "./Details";
import SearchParams from "./SearchParams";
//npm run dev

class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Link to={'/'}>
                        Adopt Me!
                    </Link>
                </header>

                <Router>
                    <Results path="/"/>
                    <Details path="/details/:id" />
                    <SearchParams path="/search-params" />
                </Router>
            </div>
        )
    }
}

render(React.createElement(App), document.getElementById("root"));
