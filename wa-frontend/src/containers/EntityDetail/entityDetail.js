import React from 'react';
import { Row, Col, Form, Button, Alert } from 'antd';

import style from '../../components/CreateEntity/style.less';
import { LayoutContext } from '../../components/CreateEntity/layoutContext';
import Avatar from './avatar';
import Summary from '../../components/CreateEntity/summary';
import Notes from '../../components/CreateEntity/notes';
import Details from '../../components/CreateEntity/detail';
import { EntityService } from '../../services';
import BaseInformation from './baseInformation';
import RelatedEntities from './relatedEntities';
import DigitalResourceCard from './digitalResourceCard';
import PublishResourceCard from './publishResourceCard';
import ArchivalResourceCard from './archivalResourceCard';
import BrowserHistory from '../../history';

class EntityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    let { pathname } = window.location;
    let ids = /entities\/([0-9]+)/g.exec(pathname);
    if (ids) {
      let id = ids[1];
      console.log(id);
      EntityService.entityDetail(id)
        .then(({ data }) => {
          this.setState({ data });
        })
        .catch(err => {
          BrowserHistory.push('/entities');
          // console.log(err);
        });
    }
    // let pathnameArr = pathname.split('/');
    // let id = pathnameArr[pathnameArr.length - 1];
  }

  render() {
    let { formItemLayout, tailFormItemLayout } = this.context;
    let {
      name,
      subname,
      occupations,
      startDate,
      birthPlace,
      birthState,
      birthCountry,
      endDate,
      deathPlace,
      deathState,
      deathCountry,
      alternativeNames,
      relatedEntities,
      digitalResources,
      publishedResources,
      archivalResources,
      type
    } = this.state.data;
    console.log(alternativeNames);
    return (
      <Form {...formItemLayout}>
        <Row gutter={16} className={style['first-row']}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ textAlign: "center" }}
            className='left-col'
          >
            <Avatar imageUrl={this.state.data.photo} />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <BaseInformation
              {...{
                name,
                subname,
                occupations,
                startDate,
                birthPlace,
                birthState,
                birthCountry,
                endDate,
                deathPlace,
                deathState,
                deathCountry,
                alternativeNames,
                relatedEntities,
                type
              }}
            />
          </Col>
        </Row>
        <Row gutter={16} className={style['second-row']}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ textAlign: "center" }}
            className='left-col'
          >
            <Row>
              <Summary text={this.state.data.summary} />
            </Row>
            <Row>
              <Details text={this.state.data.detail} />
            </Row>
            <Row>
              <Notes text={this.state.data.notes} />
            </Row>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <RelatedEntities relatedEntities={relatedEntities} />
          </Col>
        </Row>
        <Row gutter={16} className={style['third-row']}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ textAlign: "center" }}
            className='left-col'
          >
            <DigitalResourceCard digitalResources={digitalResources} />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='mid-col'
          >
            <PublishResourceCard publishedResources={publishedResources} />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <ArchivalResourceCard archivalResources={archivalResources} />
          </Col>
        </Row>
        {/* <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Create Entity
          </Button>
        </Form.Item> */}
      </Form>
    );
  }
}
EntityDetail.contextType = LayoutContext;

export default EntityDetail;
