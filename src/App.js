import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { UserInfo, CreateUser } from './components/User';
import { EducationInfo, EducationInfoPage } from './components/Education';
import { Header } from "./components/Header";
import { AddEducation } from "./components/AddEducation";
import { EditEducation } from './components/EditEducation';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
});

function App() {
  return (
    <Router>
    <ApolloProvider client={client}>
      <Header/>
      <main>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/education/:educationId">
          <EducationInfoPage/>
        </Route>
        <Route path="/addeducation">
          <AddEducation/>
        </Route>
        <Route path="/editeducation/:educationId">
          <EditEducation/>
        </Route>
        <Route path="/">
          <EducationInfo/>
        </Route>
      </Switch>
      </main>
      </ApolloProvider>
  </Router>
  );
}

export default App;
