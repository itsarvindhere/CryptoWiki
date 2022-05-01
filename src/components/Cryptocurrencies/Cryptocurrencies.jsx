// React Imports
import { useState, useEffect } from 'react';

// Millify
import millify from 'millify';

// React Router Dom Imports
import {Link} from 'react-router-dom';

// Ant Design Imports
import {Card, Row, Col, Input} from 'antd';

// CryptoAPI Imports
import {useGetCryptoDataQuery} from '../../services/cryptoApi';

  // Loader Component
  import {Loader} from '../../components';

const Cryptocurrencies = ({simplified}) => {

  const count = simplified ? 10 : 100;

  const {data : cryptosList, isFetching} = useGetCryptoDataQuery(count);
  
  const [cryptos,setCryptos] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');


  // useEffect to handle search
  useEffect(() => {
    if(searchTerm.length > 0) {
      const filteredList = cryptosList?.data?.coins.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setCryptos(filteredList);

    } else{
      setCryptos(cryptosList?.data?.coins);
    }
  },[cryptosList,searchTerm])



  
  if(isFetching) return <Loader />

  return (
    <>
    {!simplified && <div className="search-crypto">
      <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
    }
   {!isFetching && cryptos?.length === 0 && 'No Cryptocurrency found with this name!'}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} key={crypto.uuid} className="crypto-card">
              <Link key={crypto.uuid} to={`/crypto/${crypto.uuid}`} >

              <Card 
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img className='crypto-img' src={crypto.iconUrl} alt={crypto.name}/>}
                hoverable
              >
                <p>Price: ${millify(crypto.price)}</p>
                <p>Market Cap: ${millify(crypto.marketCap)}</p>
                <p>24H Volume: ${millify(crypto['24hVolume'])}</p>
                <p>24H Change: {millify(crypto.change)}%</p>
              </Card>
              </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies;