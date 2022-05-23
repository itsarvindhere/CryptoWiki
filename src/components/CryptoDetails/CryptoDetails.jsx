// REACT
import { useState } from 'react';

// HTML React Parser
import HTMLReactParser from 'html-react-parser';

// Millify
import millify from 'millify';

// React Router Imports
import {useParams} from 'react-router-dom';

// ANT Design Imports
import {Col, Row, Typography, Select, Divider} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

// Crypto Details API
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../../services/cryptoApi';

// LineChart Components
import LineChart from '../LineChart/LineChart';


// Loader Component
import {Loader} from '../../components';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const [timePeriod, setTimePeriod] = useState('7d');

  const {cryptoId} = useParams();

  // API CALLS
  const {data, isFetching} = useGetCryptoDetailsQuery(cryptoId);
  const {data: cryptoHistory} = useGetCryptoHistoryQuery({cryptoId, timePeriod});

  const cryptoDetails = data?.data?.coin;


  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  if(isFetching) return <Loader />


  // Stats of the crypto currency
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `${cryptoDetails['24hVolume'] && !isNaN(cryptoDetails['24hVolume']) ? '$ '+ millify(cryptoDetails['24hVolume']) : '-'}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'ATH(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  // Other Stats
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `${cryptoDetails?.supply?.total  ? '$' + millify(cryptoDetails?.supply?.total) : '-' }`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol})
        </Title>
      </Col>

      <Select
        defaultValue="7d"
        className='select-timeperiod'
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
          {time.map((date) => 
          <Option
            key={date}
          >
            {date}
          </Option>
          )}
      </Select>
      {/* LINE CHART */}
      <div style={{width: '99%'}}>
      <LineChart
        coinHistory={cryptoHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      </div>

      {/* SINGLE CRYPTO STATS */}
      <Col className='stats-container'>
            <Col className='coin-value-statistics'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
                    <p>
                      An Overview showing the stats of {cryptoDetails.name}
                    </p>
                </Col>
                {stats.map(({icon,title,value},index) => (
                  <Col className='coin-stats' key={index}>
                      <Col className='coin-stats-name'>
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                      </Col>
                      <Text className='stats'>{value}</Text>
                  </Col>
                ))}
            </Col>
                  
      {/* ALL CRYPTO STATS */}

      <Col className='stats-container'>
            <Col className='other-stats-info'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className="coin-details-heading">Other Statistics</Title>
                    <p>
                      An Overview showing the stats of all Cryptocurrencies
                    </p>
                </Col>
                {genericStats.map(({icon,title,value},index) => (
                  <Col className='coin-stats' key={index}>
                      <Col className='coin-stats-name'>
                        <Text>{icon}</Text>
                        <Text>{title}</Text>
                      </Col>
                      <Text className='stats'>{value}</Text>
                  </Col>
                ))}
            </Col>
      </Col>
      </Col>

        <Col className='coin-desc-link'>
          <Row className='coin-desc'>
                  <Title level={3} className="coin-details-heading">
                      What is {cryptoDetails.name}?
                      <Divider />
                      {HTMLReactParser(cryptoDetails.description)}
                  </Title>
          </Row>
          <Col className='coin-links'>
            <Title level={3} className="coin-details-heading">
                  Links
            </Title>
            <Divider />

            {cryptoDetails.links.map(link => (
              <Row className='coin-link' key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
              </Row>
            ))}
          </Col>
        </Col>
    </Col>
  )
}

export default CryptoDetails;