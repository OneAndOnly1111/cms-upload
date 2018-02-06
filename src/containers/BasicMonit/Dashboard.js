import React from "react";
import { Row, Col, Card, Button } from "antd";
import styles from "./Dashboard.less";

export default class Wrapper extends React.Component {

  render() {

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Button>初始化</Button>
      </div>
    );

    return (
      <div className={styles.standardList}>
        <Card bordered={false} bodyStyle={{ padding: '18px 32px' }}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="我的待办" value="8个任务" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周任务平均处理时间" value="32分钟" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周完成任务数" value="24个任务" />
            </Col>
          </Row>
        </Card>
        <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
          </Card>
      </div>
    );
  }
}