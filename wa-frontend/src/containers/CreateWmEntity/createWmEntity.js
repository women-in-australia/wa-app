import React from 'react';
import { Row, Col, Form, Button, Alert } from 'antd';
import PropTypes from 'prop-types';

import style from '../../components/CreateEntity/style.less';

import BaseInformation from './baseInformation';
import Avatar from '../../components/CreateEntity/avatar';
import Details from '../../components/CreateEntity/detail';
import Summary from '../../components/CreateEntity/summary';
import DigitalResourceCard from '../../components/CreateEntity/digitalResourceCard';
import PublishResourceCard from '../../components/CreateEntity/publishResourceCard';
import ArchivalResourceCard from '../../components/CreateEntity/archivalResourceCard';
import { LayoutContext } from '../../components/CreateEntity/layoutContext';
import RelatedEntities from '../../components/CreateEntity/relatedEntities';
import { isEmpty } from '../../utils/is-empty';
import { EntityService } from '../../services';
import Notes from '../../components/CreateEntity/notes';
import BrowserHistory from '../../history';

class CreateWmEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: '',
      detail: '',
      notes: '',
      form: {},
      avatar: '',
      errMsg: '',
      summaryAlert: false,
      agreed: false
      //occupation alert
    };
  }

  changeSummary = summary => {
    this.setState({ summaryAlert: isEmpty(summary) });
    this.setState({ summary });
  };

  changeDetail = detail => {
    this.setState({ detail });
  };

  changeNotes = notes => {
    this.setState({ notes });
  };

  changeAvatar = avatar => {
    this.setState({ avatar });
  };

  changeAgreed = e => {
    this.setState(({ agreed }) => ({
      agreed: !agreed
    }));
  };

  handleSubmit = (isDraft, e) => {
    e.preventDefault();
    console.log(this.state.summary);
    console.log(this.state.detail);
    console.log(this.state.avatar);
    console.log(this.state.notes);
    const { summary, detail, avatar, notes } = this.state;
    // if (isEmpty(summary) || isEmpty(detail) || isEmpty(avatar)) {
    //   document.body.scrollTop = document.documentElement.scrollTop = 0;

    //   this.setState({ errMsg: 'you have some blank not finished' });
    //   return;
    // }
    if (!this.state.agreed) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.setState({ errMsg: 'you should agree the statement' });
      return;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err || (isEmpty(summary) && !isDraft)) {
        console.log('value: ', values);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.setState({ errMsg: 'you have some blank not finished' });
        this.setState({ summaryAlert: isEmpty(summary) });
      } else {
        console.log('Received values of form: ', values);
        let {
          alternativeNames: alternativeNamesArr,
          alternativeNamesKey,
          born,
          dead,
          womanInfo,
          womanInfoKey,
          organisationInfo,
          organisationInfoKey,
          digitalResourceKey,
          digitalResource,
          archivalResourceKey,
          archivalResource,
          publishResource,
          publishResourceKey,
          occupationInfoKey,
          occupationInfo,
          file
        } = values;
        let type = 1;
        // let { oid, oname } = this.state.occupation;
        let firstName = values['Given Name'];
        let lastName = values['Family Name'];
        let name = `${lastName}, ${firstName}`;
        let subname = values['Titles/Honours'];
        let photo = avatar;

        // let alternativeName = alternativeNames[alternativeNamesKey[0]].name;
        let {
          country: birthCountry,
          place: birthPlace,
          state: birthState,
          date: startDate
        } = born;

        let {
          country: deathCountry,
          place: deathPlace,
          state: deathState,
          date: endDate
        } = dead;

        let relatedPeople = [];
        let relatedOrganizations = [];
        let digitalResources = [];
        let publishedResources = [];
        let alternativeNames = [];
        let archivalResources = [];
        let occupations = [];

        for (let k of occupationInfoKey) {
          console.log(k);
          console.log(occupationInfo[k]);
          if (isEmpty(occupationInfo[k].id)) {
            console.log(occupationInfo[k].id);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.setState({
              errMsg: 'occupation is not filled correctly'
            });
          }
        }

        // for (let k of digitalResourceKey) {
        //   if (file[k].fileList[0].status !== 'done') {
        //     document.body.scrollTop = document.documentElement.scrollTop = 0;
        //     this.setState({
        //       errMsg: 'you have some file not uploaded successfully'
        //     });
        //   }
        // }

        for (let k of occupationInfoKey) {
          let { id: oid, name: oname } = occupationInfo[k];

          occupations.push({ oid, oname });
        }

        for (let k of womanInfoKey) {
          let {
            name: relatedEname,
            relation: relationship,
            id: relatedEid
          } = womanInfo[k];
          // let statusRe = 0;
          if (!relatedEid) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.setState({
              errMsg: 'name of Related Women is not filled correctly'
            });
          }
          let women = {
            relatedEname,
            relationship: parseInt(relationship),
            // statusRe,
            relatedEid
          };
          relatedPeople.push(women);
        }

        for (let k of organisationInfoKey) {
          let {
            name: relatedEname,
            relation: relationship,
            id: relatedEid
          } = organisationInfo[k];
          // let statusRe = 0;
          if (!relatedEid) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.setState({
              errMsg: 'name of Related Organisation is not filled correctly'
            });
          }
          let organisation = {
            relatedEname,
            relationship: parseInt(relationship),
            // statusRe,
            relatedEid
          };
          relatedOrganizations.push(organisation);
        }

        for (let k of digitalResourceKey) {
          let {
            repository: drRepository,
            date: drDate,
            title: drTitle,
            note: drNote
          } = digitalResource[k];

          let drUrl = file[k];
          console.log('successful5');
          let digitalResourceOj = {
            drTitle,
            drDate,
            drRepository,
            drUrl,
            drNote
          };
          digitalResources.push(digitalResourceOj);
        }

        for (let k of publishResourceKey) {
          let {
            title: prTitle,
            publisher: prPublisher,
            url: prUrl,
            date: prDate,
            note: prNote
          } = publishResource[k];
          let publishedResource = {
            prTitle,
            prPublisher,
            prUrl,
            prDate,
            prNote
          };
          publishedResources.push(publishedResource);
        }

        for (let k of archivalResourceKey) {
          let {
            repository: arRepository,
            title: arTitle,
            date: arDate,
            abstract: arAbstract,
            url: arUrl,
            note: arNote
          } = archivalResource[k];
          let archivalResourceObj = {
            arRepository,
            arTitle,
            arDate,
            arAbstract,
            arUrl,
            arNote
          };

          archivalResources.push(archivalResourceObj);
        }

        for (let k of alternativeNamesKey) {
          let { name: aname, type: atype } = alternativeNamesArr[k];
          let alternativeName = { aname, atype };
          alternativeNames.push(alternativeName);
        }

        console.log('111111111');
        if (!photo) {
          photo = undefined;
        }
        const entity = {
          type,
          name,
          subname,

          startDate,
          endDate,
          birthCountry,
          birthPlace,
          birthState,
          deathState,
          deathPlace,
          deathCountry,
          alternativeNames,
          summary,
          detail,
          notes,
          photo,
          isDraft,
          relatedPeople,
          relatedOrganizations,
          digitalResources,
          publishedResources,
          archivalResources,
          occupations
        };
        console.log('222222222');
        console.log(entity);
        EntityService.create(JSON.stringify(entity))
          .then(data => {
            BrowserHistory.push('/entities');
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  render() {
    let { formItemLayout, tailFormItemLayout } = this.context;
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue
    } = this.props.form;
    return (
      <Form {...formItemLayout}>
        {this.state.errMsg ? (
          <Alert message={this.state.errMsg} type='warning' />
        ) : (
          ''
        )}

        <Row gutter={16} className={style['first-row']}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ textAlign: "center" }}
            className='left-col'
          >
            <Avatar changeAvatar={this.changeAvatar} />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <BaseInformation
              getFieldDecorator={getFieldDecorator}
              getFieldValue={getFieldValue}
              setFieldsValue={setFieldsValue}
              type={1}
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
              <Summary
                text={this.state.summary}
                changeText={this.changeSummary}
                alert={this.state.summaryAlert}
                required
              />
            </Row>
            <Row>
              <Details
                text={this.state.detail}
                changeText={this.changeDetail}
              />
            </Row>
            <Row>
              <Notes text={this.state.notes} changeText={this.changeNotes} />
            </Row>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <RelatedEntities
              getFieldDecorator={getFieldDecorator}
              getFieldValue={getFieldValue}
              setFieldsValue={setFieldsValue}
            />
          </Col>
        </Row>
        <Row gutter={16} className={style['third-row']}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ textAlign: "center" }}
            className='left-col'
          >
            <DigitalResourceCard
              getFieldDecorator={getFieldDecorator}
              getFieldValue={getFieldValue}
              setFieldsValue={setFieldsValue}
            />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='mid-col'
          >
            <PublishResourceCard
              getFieldDecorator={getFieldDecorator}
              getFieldValue={getFieldValue}
              setFieldsValue={setFieldsValue}
            />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 8, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <ArchivalResourceCard
              getFieldDecorator={getFieldDecorator}
              getFieldValue={getFieldValue}
              setFieldsValue={setFieldsValue}
            />
          </Col>
        </Row>
        <Form.Item {...tailFormItemLayout}>
          <input
            type='checkbox'
            checked={this.state.agreed}
            onChange={this.changeAgreed}
          />
          <label> I declares I have the permission of the resources</label>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type='primary'
            htmlType='button'
            onClick={e => {
              this.handleSubmit(false, e);
            }}
          >
            Create Entity
          </Button>
          <Button
            type='dashed'
            htmlType='button'
            onClick={e => {
              this.handleSubmit(true, e);
            }}
            style={{ marginLeft: '20px' }}
          >
            Create Draft
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
CreateWmEntity.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};
CreateWmEntity.contextType = LayoutContext;
const WrappedCreateWmEntity = Form.create({ name: 'createWmEntity' })(
  CreateWmEntity
);

export default WrappedCreateWmEntity;
