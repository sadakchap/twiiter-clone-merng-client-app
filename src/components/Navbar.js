import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const curPath = window.location.pathname;
  const path = curPath === "/" ? "home" : curPath.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const { user, logout } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size="massive">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        {user ? (
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={logout}
          />
        ) : (
          <>
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
