/*
 * @Author: czx
 * @Date: 2022-05-23 14:21:09
 * @LastEditTime: 2022-05-23 14:22:47
 * @LastEditors: czx
 * @Description:
 */
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
