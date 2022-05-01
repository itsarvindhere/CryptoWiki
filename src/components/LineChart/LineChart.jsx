// React-Chartjs Imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import {Line} from 'react-chartjs-2';

  // AntD Imports
  import {Col, Row, Typography} from 'antd';


const LineChart = ({coinHistory, currentPrice, coinName}) => {


    const coinPrice = [];
    const coinTimeStamp = [];

    coinHistory?.data?.history.forEach(data => {
        coinPrice.push(data.price);
        coinTimeStamp.push(new Date(data.timestamp).toLocaleDateString());
    })

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#f9ba48',
                borderColor: '#f9ba48'
            }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
        );


  return (
      <>
    <Row className='chart-header'>
        <Typography.Title level={2} className="chart-title">
            {coinName} Price Chart
        </Typography.Title>

        <Col className='price-container'>
            <Typography.Title level={5} className="price-change">{coinHistory?.data?.change}%</Typography.Title>
            <Typography.Title level={5} className="current-price">Current {coinName} Price:  ${currentPrice}</Typography.Title>
        </Col>
    </Row>
            <Line data={data} options={options} />
    </>
  )
}

export default LineChart