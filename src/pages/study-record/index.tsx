/*
 * @Author: czx
 * @Date: 2022-05-22 10:45:03
 * @LastEditTime: 2022-05-22 16:16:26
 * @LastEditors: czx
 * @Description:
 */
import React, { memo, useState, useEffect } from 'react';
import { Card, Row, Col, Divider, List, message, Button } from 'antd';
import Style from './index.less';
import './index.css';
import c from 'classnames';
import dayjs from 'dayjs';
import durationFormat from '@/utils/durationFormat';
import VirtualList from 'rc-virtual-list';

const Record = memo(() => {
  const [state, setState] = useState({
    startText: '开始计时',
    endText: '结束计时',
    start: false,
    startTime: '00:00:00',
    startTimeStamp: 0,
    totalStudyMinutes: 0,
    timer: '',
  });
  const handleStart = () => {
    const startTimeStamp = dayjs().unix();
    setState({ ...state, start: true });
    const t1 = setInterval(() => {
      setState({
        ...state,
        start: true,
        startTimeStamp: startTimeStamp,
        startTime: durationFormat(dayjs().unix() - startTimeStamp),
        timer: t1,
      });
    }, 1000);
  };

  const handleEnd = () => {
    clearInterval(state.timer);
    const currentStudyTotalTime = Math.floor(
      (dayjs().unix() - state.startTimeStamp) / 60,
    );
    setState({
      ...state,
      start: false,
      startTime: '00:00:00',
      totalStudyMinutes: currentStudyTotalTime,
    });
  };
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  const appendData = () => {
    setData([...data, 11]);
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === 400) {
      appendData();
    }
  };
  return (
    <div className={Style.container}>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ height: '160px' }}>
          <Row gutter={[16, 16]}>
            <Col
              span={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                title="今日学习"
                style={{ width: '100%', textAlign: 'center' }}
                className={Style.boxShadow}
              >
                <span className={Style.time}>{state.totalStudyMinutes}</span>
                <span>分钟</span>
              </Card>
            </Col>
            <Col
              span={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                title="今日学习"
                style={{ width: '100%', textAlign: 'center' }}
                className={Style.boxShadow}
              >
                <span className={Style.time}>{state.totalStudyMinutes}</span>
                <span>分钟</span>
              </Card>
            </Col>
            <Col
              span={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                title="今日学习"
                style={{ width: '100%', textAlign: 'center' }}
                className={Style.boxShadow}
              >
                <span className={Style.time}>{state.totalStudyMinutes}</span>
                <span>分钟</span>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ height: '40px' }}>
          <Divider></Divider>
        </Col>
        <Col span={24}>
          <Row>
            <Col
              span={8}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <section>
                {!state.start ? (
                  <button
                    onClick={handleStart}
                    className={c(Style.startBtn, {
                      [Style.boxShadow]: !state.start,
                    })}
                  >
                    {state.startText}
                  </button>
                ) : (
                  <button
                    onClick={handleEnd}
                    className={c(Style.startBtn, {
                      [Style.endBtnBackground]: state.start,
                    })}
                  >
                    {state.endText}
                  </button>
                )}
                <div className={c(Style.studyTime, Style.boxShadow)}>
                  {state.startTime}
                </div>
              </section>
            </Col>
            <Col span={16}>
              <List
                size="large"
                header={
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <span style={{ flex: '1' }}>任务列表</span>
                    <Button type="primary" style={{ width: '100px' }}>
                      新建任务
                    </Button>
                  </div>
                }
                footer={<div>不要紧,慢慢来,总是快的</div>}
                bordered
              >
                <VirtualList
                  data={data}
                  height={400}
                  itemHeight={47}
                  itemKey="email"
                  onScroll={onScroll}
                >
                  {(item) => (
                    <List.Item>
                      <div>{item}</div>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
});

export default Record;
