// React Imports
import { useState, useEffect } from 'react';

// React Router Imports
import {Link} from 'react-router-dom';

// ANT DESIGN COMPONENTS
import {Button, Menu, Typography, Avatar} from 'antd';

// ANT DESIGN ICONS
import {HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

// Logo
import icon from '../../images/logo.svg';

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);



    // Get Screen Size
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    },[])

    // Toggle Menu

    useEffect(() => {
            setActiveMenu(!(screenSize < 768));
    },[screenSize])


  return (
    <div className='nav-container'>
        <div className="logo-container">
            <Avatar shape='square' src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">CryptoWiki</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
            </Button>
        </div>
        {activeMenu && 
        <Menu theme='dark'>
                  <Menu.Item key={0} icon={<HomeOutlined />}>
                      <Link to="/">Home</Link>
                  </Menu.Item>

                  <Menu.Item key={1} icon={<FundOutlined />}>
                      <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                  </Menu.Item>

                  <Menu.Item key={3} icon={<BulbOutlined />}>
                      <Link to="/news">News</Link>
                  </Menu.Item>
             </Menu>
            }
    </div>
  )
}

export default Navbar