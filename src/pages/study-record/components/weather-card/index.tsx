/*
 * @Author: czx
 * @Date: 2022-05-23 14:30:33
 * @LastEditTime: 2022-05-23 17:37:25
 * @LastEditors: czx
 * @Description:
 */
import { Card, Col, Row, Modal, AutoComplete, Typography } from 'antd';
import Style from '@/static/css/common.less';
import { getWeather, getCity } from '@/api/weather';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import './index.css';

const SearchCity = (props: { getWeatherInfo: (a1: any) => void }) => {
  const { getWeatherInfo } = props;
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState({ id: '101210114', label: '滨江' });
  useEffect(() => {
    getWeather(city.id).then((res) => {
      if (res.data.code === '200')
        getWeatherInfo({ ...res.data.now, city: city.label });
      setVisible(false);
    });
  }, []);
  const searchCity = _.debounce((location: string) => {
    getCity(location).then((res) => {
      if (res.data.code === '200') {
        const result = res.data?.location?.map?.((item: any) => ({
          label: item.name,
          value: item.name,
          id: item.id,
        }));
        setOptions(result);
      }
    });
  }, 1000);
  const handleSelect = (value: string, options) => {
    setCity(options);
  };
  const handleWeather = () => {
    getWeather(city.id).then((res) => {
      if (res.data.code === '200')
        getWeatherInfo({ ...res.data.now, city: city.label });
      setVisible(false);
    });
  };
  return (
    <Row>
      <Col span={24} style={{ position: 'relative' }}>
        今日天气
        <span
          style={{
            fontSize: '12px',
            fontWeight: 'normal',
            position: 'absolute',
            bottom: '-15px',
            right: '0px',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          切换
        </span>
        <Modal
          title="城市切换"
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={handleWeather}
          cancelText="取消"
          okText="选择"
        >
          <AutoComplete
            placeholder="输入城市名"
            onChange={searchCity}
            options={options}
            onSelect={handleSelect}
            style={{ width: 200 }}
          ></AutoComplete>
        </Modal>
      </Col>
    </Row>
  );
};

const WeatherCard = () => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const getWeatherInfo = (info: any) => {
    setWeatherInfo(info);
  };
  return (
    <Card
      title={<SearchCity getWeatherInfo={getWeatherInfo} />}
      style={{ width: '100%', textAlign: 'center' }}
      className={Style.boxShadow}
    >
      <Row gutter={[16, 0]} style={{ fontSize: '24px' }}>
        <Col span={4}>
          <i className={`qi-${weatherInfo.icon}`}></i>
        </Col>
        <Col
          span={8}
          style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}
        >
          <Typography.Text ellipsis={true}>{weatherInfo?.city}</Typography.Text>
        </Col>
        <Col
          span={12}
          style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}
        >{`${weatherInfo?.text} ${weatherInfo?.feelsLike}℃`}</Col>
      </Row>
    </Card>
  );
};

export default WeatherCard;
