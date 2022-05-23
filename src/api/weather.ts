/*
 * @Author: czx
 * @Date: 2022-05-23 14:20:27
 * @LastEditTime: 2022-05-23 16:08:06
 * @LastEditors: czx
 * @Description:
 */
import request from './config';

export const getCity = (location: string) => {
  return request({
    url: `https://geoapi.qweather.com/v2/city/lookup?key=0f1cff22824b4f89b56b5d5c0478d098&location=${location}`,
    method: 'GET',
  });
};

export const getWeather = (location: any) => {
  return request({
    url: `https://devapi.qweather.com/v7/weather/now?location=${location}&key=0f1cff22824b4f89b56b5d5c0478d098`,
    method: 'GET',
  });
};
