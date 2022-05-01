// Millify
import millify from 'millify';

// Ant Design Imports
import {Typography, Row, Col, Statistic, Divider, Button} from 'antd';

// React Router Dom Imports
import {Link} from 'react-router-dom';

// CryptoAPI Imports
import {useGetCryptoDataQuery} from '../../services/cryptoApi';

// COMPONENTS
import {Cryptocurrencies, News, Loader} from '../../components';

// Title
const {Title} = Typography;

const Homepage = () => {

  const {data, isFetching} = useGetCryptoDataQuery(10);
  const cryptoStats = data?.data?.stats;

  if(isFetching) return <Loader />

  return (
    <>
    <Title level={2} className="heading">
      Global Crypto Stats
    </Title>
    <Divider />
    <Row>
      <Col span={12}><Statistic title="Total Cryptocurrencies" value={millify(cryptoStats.totalCoins)}/></Col>
      <Col span={12}><Statistic title="Total Exchanges" value={millify(cryptoStats.totalExchanges)}/></Col>
      <Col span={12}><Statistic title="Total Market Cap" value={millify(cryptoStats.totalMarketCap)}/></Col>
      <Col span={12}><Statistic title="Total 24h Volume" value={millify(cryptoStats.total24hVolume)}/></Col>
      <Col span={12}><Statistic title="Total Markets" value={millify(cryptoStats.totalMarkets)}/></Col>
    </Row>

    <Divider />

    <div className='home-heading-container'>
        <Title level={2} className="home-title">Top 10 Cryptocurrencies right now</Title>
        <Button type='primary'><Link to="/cryptocurrencies">Show More</Link></Button>
    </div>
    <Divider />

    <Cryptocurrencies simplified/>

    <Divider />


    <div className='home-heading-container'>
        <Title level={2} className="home-title">What's happening in Crypto World</Title>
        <Button type='primary'><Link to="/news">Show More</Link></Button>
    </div>
    <Divider />

    <News simplified/>


    </>
  )
}

export default Homepage;