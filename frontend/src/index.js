import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import SongList from "./components/SongList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SongCreate from "./components/SongCreate";
import "./styles/style.css";
import SongDetail from "./components/SongDetail";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  dataIdFromObject: (o) => o.id,
});

ReactDOM.render(
  <div className="container">
    <Router>
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/songs/create" component={SongCreate} />
          <Route exact path="/songs/:id" component={SongDetail} />
          <Route path="/" component={SongList} />
        </Switch>
      </ApolloProvider>
    </Router>
  </div>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
