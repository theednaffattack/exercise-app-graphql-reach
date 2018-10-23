import React from "react";
// import { render } from "react-dom";
// import Logo from "./Logo";
// import { Router, Link } from "@reach/router";

import styled from 'styled-components'

const StyledH1 = styled.h1`
  color: hotpink;
`;

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>

        <StyledH1>This is CSS-in-JS </ StyledH1>
  </div>
);

export default Dashboard;