// ANT Design Imports
import {Select, Typography, Row, Col, Card, Divider} from 'antd';
// Moment.js
import moment from 'moment';

// React
import { useState } from 'react';
// CryptoAPI Imports
import {useGetCryptoDataQuery} from '../../services/cryptoApi';

// News API Hook
import {useGetCryptoNewsQuery} from '../../services/cryptoNewsApi';

// Loader Component
import {Loader} from '../../components';

const {Text, Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({category: newsCategory, count: simplified ? 6 : 12});
  const {data} = useGetCryptoDataQuery(100);

  if(isFetching) return <Loader />

  return (
    <Row gutter={[24 , 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder="Select a Crypto"
            optionFilterProp='children'
            onChange={(val) => setNewsCategory(val)}
            filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
              <Option value="Cryptocurrency">All</Option>
              {data?.data?.coins.map(coin => (
                <Option key={coin.uuid} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
          </Select>
        </Col>
      )}
        {cryptoNews?.value.map((news,i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target="_blank" rel='noreferrer'>
                  <Title level={4}>
                     {news.name}
                  </Title>
                  <div className='provider-container'>
                    <Text className='source'>
                     {news.provider[0]?.name}
                    </Text>
                </div>
                <Divider />
                <p>
                  {news.description > 100 ? news.description.substring(0, 100) + '...' : news.description}
                </p>
                <Divider />
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
  )
}

export default News;