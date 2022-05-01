import {Routes, Route, Link} from 'react-router-dom';
import {Typography, Layout, Space} from 'antd';

// Components
import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, News} from './components';

// Styles
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />}  />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:cryptoId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>


        <footer>
      <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
        CryptoWiki <br />
        All rights reserved
      </Typography.Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/news">News</Link>
      </Space>
      </footer>
      </main>
      
    
      </div>
  )
}

export default App;
