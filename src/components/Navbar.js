import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
    const curPath = window.location.pathname;
    const path = curPath === '/' ? 'home' : curPath.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu pointing secondary size="massive">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
            />
            <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={handleItemClick}
                as={Link}
                to="/logout"
            />
          </Menu.Menu>
        </Menu>
    )
}

export default Navbar;