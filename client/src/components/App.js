import React, { Component } from "react";
import { Box, Flex, Heading, Position, Provider } from "rebass";
import posed, { PoseGroup } from "react-pose";
import { Router, Link, Location } from "@reach/router";
import { injectGlobal, styled } from "styled-components";
// import { ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-boost';

// const client = new ApolloClient();

import theme from "../styles/theme";
import "../styles/App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Exercises from "./Exercises";
import AddExercise from "./AddExercise";
import AddUser from "./AddUser";

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0;
    height: 100vh; }
  #root {
    height: 100vh;
  }
`;

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent ? "red" : "blue"
        }
      };
    }}
  />
);

class App extends Component {
  render() {
    return (
        <Provider theme={theme} height="100%">
          <Flex bg="violet" m={0} height="100%">
            <Box flex={1} color="text" bg="violet">
              <Box flex={1} px={4} color="text" bg="gray">
                <Heading>Exercise Tracker</Heading>
                <NavLink to="/">Home</NavLink>{" "}
                <NavLink to="dashboard">Dashboard</NavLink>{" "}
                <NavLink to="api/exercises">Exercises</NavLink>{" "}
                <NavLink to="api/exercises/newUser">User</NavLink>{" "}
                <NavLink to="api/exercises/add">Add Exercise</NavLink>
              </Box>
              {/* </nav> */}
              <PosedRouter>
                <Home path="/" />
                <Dashboard path="dashboard" />
                <Exercises path="api/exercises" />
                <AddExercise path="api/exercises/add" />
                <AddUser path="api/exercises/newUser" />
              </PosedRouter>
            </Box>
          </Flex>
        </Provider>
    );
  }
}

export default App;
