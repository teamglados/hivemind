import React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Sites", to: "/sites" },
  { label: "Quests", to: "/quests" },
  { label: "Users", to: "/users" },
];

const NavMenu = () => {
  return (
    <NavList>
      {navItems.map(({ label, to }) => (
        <NavItem key={to}>
          <Link to={to}>{label}</Link>
        </NavItem>
      ))}
    </NavList>
  );
};

const NavList = styled(Stack).attrs({ as: "ul", axis: "y", spacing: "medium" })`
  padding: ${(p) => p.theme.spacing.medium}px;
`;

const NavItem = styled.li`
  padding: ${(p) => p.theme.spacing.normal}px;
`;

export default NavMenu;
