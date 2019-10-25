import React from 'react';
import { Row, Col, Form, Button, Alert, Input } from 'antd';
import PropTypes from 'prop-types';

import style from '../../components/CreateEntity/style.less';

// import BaseInformation from './baseInformation';
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
import BaseInformation from '../../containers/CreateWmEntity/baseInformation';

const { TextArea } = Input;
class WmDraft extends React.Component {
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
      draftEid: '',
      agreed: false,
      rejected: false,
      statusName: 0,
      statusStart: 0,
      statusEnd: 0,
      statusSummary: 0,
      statusDetail: 0,
      statusNotes: 0,
      feedback: ''
    };
  }

  componentDidMount() {
    let { pathname } = window.location;
    let ids;
    if (/\/reject/.test(pathname)) {
      ids = /entities\/reject\/person\/([0-9]+)/g.exec(pathname);
    } else {
      ids = /entities\/draft\/person\/([0-9]+)/g.exec(pathname);
    }

    if (ids) {
      let id = ids[1];
      console.log(id);
      EntityService.entityDetail(id)
        .then(({ data }) => {
          let {
            summary,
            detail,
            notes,
            photo: avatar,
            eid,
            isDraft,
            type,
            status
          } = data;
          if ((!isDraft && status != -1) || type == 2) {
            //not a draft or not a person entity

            BrowserHistory.push('/entities');
          } else {
            console.log(avatar);
            this.setState({ detail, summary, notes, avatar, draftEid: eid });
            let { digitalResources } = data;
            let digitalResourceKey = digitalResources.map((ele, index) => {
              return index;
            });
            let digitalResource = digitalResources.map((ele, index) => {
              return {
                status: ele.drStatus,
                note: ele.drNote,
                title: ele.drTitle,
                date: ele.drDate,
                repository: ele.drRepository
              };
            });
            let file = digitalResources.map((ele, index) => {
              return ele.drUrl;
            });
            // console.log('------');
            // console.log(file);
            let { occupations } = data;
            let occupationInfoKey = [];
            let occupationInfo = [];
            occupations.forEach((ele, index) => {
              occupationInfo.push({
                status: ele.ostatus,
                id: ele.oid,
                name: ele.oname
              });
              occupationInfoKey.push(index);
            });

            let { publishedResources } = data;

            let publishResourceKey = publishedResources.map((ele, index) => {
              return index;
            });
            let publishResource = publishedResources.map((ele, index) => {
              return {
                status: ele.prStatus,
                title: ele.prTitle,
                publisher: ele.prPublisher,
                url: ele.prUrl,
                date: ele.prDate,
                note: ele.prNote
              };
            });
            console.log(publishResource);
            let { archivalResources } = data;
            let archivalResourceKey = archivalResources.map((ele, index) => {
              return index;
            });
            let archivalResource = archivalResources.map((ele, index) => {
              return {
                status: ele.arStatus,
                repository: ele.arRepository,
                title: ele.arTitle,
                date: ele.arDate,
                abstract: ele.arAbstract,
                url: ele.arAbstract,
                note: ele.arNote
              };
            });
            let { relatedEntities } = data;
            let womanInfo = [];
            let womanInfoKey = [];
            let organisationInfoKey = [];
            let organisationInfo = [];
            relatedEntities.forEach((ele, index) => {
              //relatedWomen
              if (ele.relatedEtype == 1) {
                womanInfo.push({
                  status: ele.statusRe,
                  relation: ele.relationship,
                  name: ele.relatedEname,
                  id: ele.relatedEid
                });
                womanInfoKey.push(womanInfoKey.length);
              }
              //relatedOrgs
              else {
                organisationInfo.push({
                  status: ele.statusRe,
                  relation: ele.relationship,
                  name: ele.relatedEname,
                  id: ele.relatedEid
                });
                organisationInfoKey.push(organisationInfoKey.length);
              }
            });
            let { alternativeNames: _alternativeNames } = data;
            let alternativeNamesKey = [];
            let alternativeNames = [];
            _alternativeNames.forEach((ele, index) => {
              alternativeNamesKey.push(index);
              alternativeNames.push({
                status: ele.astatus,
                name: ele.aname,
                type: ele.atype
              });
            });
            let {
              name,
              subname,
              startDate,
              endDate,
              birthPlace,
              birthState,
              birthCountry,
              deathPlace,
              deathState,
              deathCountry
            } = data;
            // console.log(subname);
            let born = {
              country: birthCountry,
              place: birthPlace,
              state: birthState,
              date: startDate
            };
            let dead = {
              country: deathCountry,
              place: deathPlace,
              state: deathState,
              date: endDate
            };

            let givenName = name.split(', ')[1];
            let familyName = name.split(', ')[0];
            console.log(occupationInfo);
            console.log(file);
            console.log(womanInfo);
            this.props.form.setFieldsValue({
              digitalResourceKey,
              digitalResource,
              publishResourceKey,
              publishResource,
              archivalResourceKey,
              archivalResource,
              womanInfo,
              womanInfoKey,
              organisationInfo,
              organisationInfoKey,
              alternativeNamesKey,
              alternativeNames,
              file,
              occupationInfoKey,
              occupationInfo,
              ['Titles/Honours']: subname,
              ['Given Name']: givenName,
              ['Family Name']: familyName,
              born,
              dead
              // ['Organisation Name']: name
            });
          }
          if (status == -1) {
            //rejected
            console.log(data);
            let {
              statusName,
              statusStart,
              statusSummary,
              statusDetail,
              statusNotes,
              statusEnd,
              feedback
            } = data.review;
            console.log(statusNotes);
            this.setState({
              statusDetail,
              statusEnd,
              statusName,
              statusNotes,
              statusStart,
              statusSummary,
              rejected: true,
              feedback
            });
          }
        })
        .catch(err => {
          console.log(err);
          BrowserHistory.push('/entities');
          // console.log(err);
        });
    }
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
    //create entity without accepting agreement
    if (!this.state.agreed && !isDraft) {
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
          file,
          occupationInfo,
          occupationInfoKey
        } = values;
        let type = 1;
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
        // for (let k of digitalResourceKey) {
        //   if (file[k].fileList[0].status !== 'done') {
        //     document.body.scrollTop = document.documentElement.scrollTop = 0;
        //     this.setState({
        //       errMsg: 'you have some file not uploaded successfully'
        //     });
        //   }
        // }
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
        let { draftEid } = this.state;
        if (!photo) {
          photo = undefined;
        }
        const entity = {
          draftEid,
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
          occupations,
          relatedPeople,
          relatedOrganizations,
          digitalResources,
          publishedResources,
          archivalResources
        };

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
          <Alert
            message={this.state.errMsg}
            type='warning'
            // closable
            // onClose={onClose}
          />
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
            <Avatar
              imageUrl={this.state.avatar}
              changeAvatar={this.changeAvatar}
            />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 0 }}
            // style={{ overflow: "scroll" }}
            className='right-col'
          >
            <BaseInformation
              statusStart={this.state.statusStart}
              statusEnd={this.state.statusEnd}
              statusName={this.state.statusName}
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
                status={this.state.statusSummary}
              />
            </Row>
            <Row>
              <Details
                text={this.state.detail}
                changeText={this.changeDetail}
                status={this.state.statusDetail}
              />
            </Row>
            <Row>
              <Notes
                text={this.state.notes}
                changeText={this.changeNotes}
                status={this.state.statusNotes}
              />
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
            // style={{ textAlign: "center" }}
            className='right-col'
          >
            <ArchivalResourceCard
              getFieldDecorator={getFieldDecorator}
              getFieldValue={getFieldValue}
              setFieldsValue={setFieldsValue}
            />
          </Col>
        </Row>
        {this.state.rejected ? (
          <Row>
            <label> Feedback:</label>
            <TextArea
              value={this.state.feedback}
              style={{ marginTop: '10px' }}
              autosize={{ minRows: 4, maxRows: 6 }}
            />
          </Row>
        ) : (
          ''
        )}
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
            {this.state.rejected ? 'Update Entity' : 'Create Entity'}
          </Button>
          <Button
            type='dashed'
            htmlType='button'
            onClick={e => {
              this.handleSubmit(true, e);
            }}
            style={{ marginLeft: '20px' }}
          >
            Save as Draft
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
WmDraft.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};
WmDraft.contextType = LayoutContext;
const WrappedWmDraft = Form.create({ name: 'wmDraft' })(WmDraft);

export default WrappedWmDraft;
