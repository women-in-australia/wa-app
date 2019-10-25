import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, Input } from 'antd';

import style from '../../components/CreateEntity/style.less';
import BaseInformation from '../CreateOgEntity/baseInformation';
import Avatar from '../../components/CreateEntity/avatar';
import Details from '../../components/CreateEntity/detail';
import Summary from '../../components/CreateEntity/summary';
import Notes from '../../components/CreateEntity/notes';
import { isEmpty } from '../../utils/is-empty';
import { EntityService, UserService } from '../../services';
import BrowserHistory from '../../history';
import DigitalResourceCard from '../../components/CreateEntity/digitalResourceCard';
import PublishResourceCard from '../../components/CreateEntity/publishResourceCard';
import ArchivalResourceCard from '../../components/CreateEntity/archivalResourceCard';
import RelatedEntities from '../../components/CreateEntity/relatedEntities';

import {
  LayoutContext,
  formItemLayout
} from '../../components/CreateEntity/layoutContext';

const { TextArea } = Input;

class CheckOg extends React.Component {
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
      statusSummary: false,
      statusDetail: false,
      statusNotes: false,
      statusStart: false,
      statusEnd: false,
      statusName: false,
      allChecked: false,
      data: {},
      feedback: '',
      role: 0
    };
  }
  componentDidMount() {
    UserService.getData().then(({ data }) => {
      if (data.role == 'ROLE_manager') {
        this.setState({ role: 1 });
      }
    });
    let { pathname } = window.location;
    let ids = /entities\/check\/organisation\/([0-9]+)/g.exec(pathname);
    if (ids) {
      let id = ids[1];
      console.log(id);
      EntityService.entityDetail(id)
        .then(({ data }) => {
          this.setState({ data });
          let { summary, detail, notes, photo: avatar, eid, type } = data;
          // if (!isDraft || type == 2) {
          //   BrowserHistory.push('/entities');
          // }
          console.log(avatar);
          this.setState({ detail, summary, notes, avatar });
          let { digitalResources } = data;
          let digitalResourceKey = digitalResources.map((ele, index) => {
            return index;
          });
          let digitalResource = digitalResources.map((ele, index) => {
            return {
              note: ele.drNote,
              title: ele.drTitle,
              date: ele.drDate,
              repository: ele.drRepository
            };
          });
          let file = digitalResources.map((ele, index) => {
            return ele.drUrl;
          });

          let { publishedResources } = data;
          let publishResourceKey = publishedResources.map((ele, index) => {
            return index;
          });
          let publishResource = publishedResources.map((ele, index) => {
            return {
              title: ele.prTitle,
              publisher: ele.prPublisher,
              url: ele.prUrl,
              date: ele.prDate,
              note: ele.prNote
            };
          });

          let { archivalResources } = data;
          let archivalResourceKey = archivalResources.map((ele, index) => {
            return index;
          });
          let archivalResource = archivalResources.map((ele, index) => {
            return {
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
                relation: ele.relationship,
                name: ele.relatedEname,
                id: ele.relatedEid
              });
              womanInfoKey.push(womanInfoKey.length);
            }
            //relatedOrgs
            else {
              organisationInfo.push({
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
          let start = {
            country: birthCountry,
            place: birthPlace,
            state: birthState,
            date: startDate
          };
          let end = {
            country: deathCountry,
            place: deathPlace,
            state: deathState,
            date: endDate
          };

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
            ['Binomial name']: subname,
            ['Organisation Name']: name,
            start,
            end
          });
        })
        .catch(err => {
          console.log(err);
          BrowserHistory.push('/entities');
          // console.log(err);
        });
    }
  }

  changeFeedback = e => {
    this.setState({ feedback: e.currentTarget.value });
  };

  changeMultiChecked(check) {
    let { getFieldValue, setFieldsValue } = this.props.form;

    let keys = getFieldValue(`digitalResourceKey`);
    for (let k of keys) {
      console.log(k);
      setFieldsValue({ [`digitalResource[${k}].checked`]: check });
    }

    keys = getFieldValue(`publishResourceKey`);
    for (let k of keys) {
      setFieldsValue({ [`publishResource[${k}].checked`]: check });
    }

    keys = getFieldValue(`archivalResourceKey`);
    for (let k of keys) {
      setFieldsValue({ [`archivalResource[${k}].checked`]: check });
    }

    keys = getFieldValue(`womanInfoKey`);
    console.log(getFieldValue(`womanInfo`));
    for (let k of keys) {
      console.log(k);
      setFieldsValue({ [`womanInfo[${k}].checked`]: check });
    }

    keys = getFieldValue(`organisationInfoKey`);
    for (let k of keys) {
      console.log(k);
      setFieldsValue({ [`organisationInfo[${k}].checked`]: check });
    }

    keys = getFieldValue(`alternativeNamesKey`);
    for (let k of keys) {
      setFieldsValue({ [`alternativeNames[${k}].checked`]: check });
    }
  }

  changeAllChecked = e => {
    this.setState(({ allChecked }) => {
      this.changeMultiChecked(!allChecked);
      return {
        allChecked: !allChecked,
        statusName: !allChecked,
        statusStart: !allChecked,
        statusEnd: !allChecked,
        statusSummary: !allChecked,
        statusDetail: !allChecked,
        statusNotes: !allChecked
      };
    });
  };

  changeStatusName = e => {
    this.setState(({ statusName }) => ({
      statusName: !statusName
    }));
  };

  changeStatusStart = e => {
    this.setState(({ statusStart }) => ({
      statusStart: !statusStart
    }));
  };

  changeStatusEnd = e => {
    this.setState(({ statusEnd }) => ({
      statusEnd: !statusEnd
    }));
  };

  changeStatusSummary = e => {
    this.setState(({ statusSummary }) => ({
      statusSummary: !statusSummary
    }));
  };

  changeStatusDetail = e => {
    this.setState(({ statusDetail }) => ({
      statusDetail: !statusDetail
    }));
  };

  changeStatusNotes = e => {
    this.setState(({ statusNotes }) => ({
      statusNotes: !statusNotes
    }));
  };

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

  //find Kth org in orgs of relatedEntities
  findPreOrg(k) {
    let { relatedEntities } = this.state.data;
    let index = 0;
    for (let i = 0; i < relatedEntities.length; i++) {
      if (relatedEntities[i].relatedEtype == 2) {
        if (index == k) {
          return relatedEntities[i];
        }
        index++;
      }
    }
  }

  //find Kth woman in orgs of relatedEntities
  findPreWoman(k) {
    let { relatedEntities } = this.state.data;
    let index = 0;
    for (let i = 0; i < relatedEntities.length; i++) {
      if (relatedEntities[i].relatedEtype == 1) {
        if (index == k) {
          return relatedEntities[i];
        }
        index++;
      }
    }
  }

  handleSubmit = (button, e) => {
    e.preventDefault();

    const { summary, detail, avatar, notes } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (err || isEmpty(summary)) {
        console.log('value: ', values);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.setState({ errMsg: 'you have some blank not finished' });
        this.setState({ summaryAlert: isEmpty(summary) });
      } else {
        console.log('Received values of form: ', values);
        let status = 1;
        let {
          alternativeNames: alternativeNamesArr,
          alternativeNamesKey,
          start,
          end,
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
          file
        } = values;

        let name = values['Organisation Name'];
        let subname = values['Binomial name'];
        let photo = avatar;

        let {
          statusName,
          statusSummary,
          statusDetail,
          statusNotes,
          statusStart,
          statusEnd
        } = this.state;
        let { data } = this.state;
        // subname,
        //     startDate,
        //     endDate,
        //     birthPlace,
        //     birthState,
        //     birthCountry,
        //     deathPlace,
        //     deathState,
        //     deathCountry
        let {
          country: birthCountry,
          place: birthPlace,
          state: birthState,
          date: startDate
        } = start;

        let {
          country: deathCountry,
          place: deathPlace,
          state: deathState,
          date: endDate
        } = end;

        if (statusName == false) {
          status = statusName = -1;
        } else {
          statusName = data.subname == subname ? 1 : 2;
        }
        if (statusSummary == false) {
          status = statusSummary = -1;
        } else {
          statusSummary = data.summary == summary ? 1 : 2;
        }
        if (statusDetail == false) {
          status = statusDetail = -1;
        } else {
          statusDetail = data.detail == detail ? 1 : 2;
        }
        if (statusNotes == false) {
          status = statusNotes = -1;
        } else {
          statusNotes = data.notes == notes ? 1 : 2;
        }
        if (statusStart == false) {
          status = statusStart = -1;
        } else {
          statusStart =
            data.startDate == startDate &&
            data.birthCountry == birthCountry &&
            data.birthPlace == birthPlace &&
            data.birthState == birthState
              ? 1
              : 2;
        }
        if (statusEnd == false) {
          status = statusEnd = -1;
        } else {
          statusEnd =
            data.endDate == endDate &&
            data.deathCountry == deathCountry &&
            data.deathPlace == deathPlace &&
            data.deathState == deathState
              ? 1
              : 2;
        }

        let relatedPeople = [];
        let relatedOrganizations = [];
        let digitalResources = [];
        let publishedResources = [];
        let alternativeNames = [];
        let archivalResources = [];

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
          let preWoman = this.findPreWoman(k);
          let statusRe;
          if (!womanInfo[k].checked) {
            status = statusRe = -1;
          } else {
            statusRe =
              preWoman.relatedEname == relatedEname &&
              relationship == preWoman.relationship
                ? 1
                : 2;
          }
          let roid = preWoman.roid;
          let women = {
            relatedEname,
            relationship: parseInt(relationship),
            // statusRe,
            relatedEid,
            statusRe,
            roid
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
          let preOrg = this.findPreOrg(k);
          let statusRe;
          if (!organisationInfo[k].checked) {
            status = statusRe = -1;
          } else {
            statusRe =
              preOrg.relatedEname == relatedEname &&
              relationship == preOrg.relationship
                ? 1
                : 2;
          }
          let roid = preOrg.roid;
          let organisation = {
            relatedEname,
            relationship: parseInt(relationship),
            statusRe,
            relatedEid,
            roid
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
          let drStatus;
          if (!digitalResource[k].checked) {
            status = drStatus = -1;
          } else {
            drStatus =
              data.digitalResources[k].drTitle == drTitle &&
              data.digitalResources[k].drDate == drDate &&
              data.digitalResources[k].drRepository == drRepository &&
              data.digitalResources[k].drUrl == drUrl &&
              data.digitalResources[k].drNote == drNote
                ? 1
                : 2;
          }
          let drid = data.digitalResources[k].drid;

          let digitalResourceOj = {
            drTitle,
            drDate,
            drRepository,
            drUrl,
            drNote,
            drStatus,
            drid
          };
          digitalResources.push(digitalResourceOj);
        }
        console.log('successful5');

        for (let k of publishResourceKey) {
          let {
            title: prTitle,
            publisher: prPublisher,
            url: prUrl,
            date: prDate,
            note: prNote
          } = publishResource[k];
          let prStatus;
          console.log(1);
          if (!publishResource[k].checked) {
            status = prStatus = -1;
          } else {
            console.log(data.publishedResources[k]);
            prStatus =
              data.publishedResources[k].prTitle == prTitle &&
              data.publishedResources[k].prPublisher == prPublisher &&
              data.publishedResources[k].prUrl == prUrl &&
              data.publishedResources[k].prDate == prDate &&
              data.publishedResources[k].prNote == prNote
                ? 1
                : 2;
          }
          console.log(2);
          let prid = data.publishedResources[k].prid;
          let publishedResource = {
            prTitle,
            prPublisher,
            prUrl,
            prDate,
            prNote,
            prStatus,
            prid
          };
          publishedResources.push(publishedResource);
        }
        console.log('successful6');

        for (let k of archivalResourceKey) {
          let {
            repository: arRepository,
            title: arTitle,
            date: arDate,
            abstract: arAbstract,
            url: arUrl,
            note: arNote
          } = archivalResource[k];
          let arStatus;
          if (!archivalResource[k].checked) {
            status = arStatus = -1;
          } else {
            arStatus =
              data.archivalResources[k].arTitle == arTitle &&
              data.archivalResources[k].arAbstract == arAbstract &&
              data.archivalResources[k].arUrl == arUrl &&
              data.archivalResources[k].arDate == arDate &&
              data.archivalResources[k].arNote == arNote &&
              data.archivalResources[k].arRepository == arRepository
                ? 1
                : 2;
          }
          let arid = data.archivalResources[k].arid;
          let archivalResourceObj = {
            arRepository,
            arTitle,
            arDate,
            arAbstract,
            arUrl,
            arNote,
            arStatus,
            arid
          };

          archivalResources.push(archivalResourceObj);
        }
        console.log('successful7');

        for (let k of alternativeNamesKey) {
          let { name: aname, type: atype } = alternativeNamesArr[k];
          let astatus;
          if (!alternativeNamesArr[k].checked) {
            status = astatus = -1;
          } else {
            astatus =
              data.alternativeNames[k].aname == aname &&
              data.alternativeNames[k].atype == atype
                ? 1
                : 2;
          }
          let anid = data.alternativeNames[k].anid;
          let alternativeName = { aname, atype, astatus, anid };
          alternativeNames.push(alternativeName);
        }
        console.log('successful8');
        if (button && status == -1) {
          // console.log('value: ', values);
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.setState({ errMsg: 'you should approve all the fields first' });
          return;
        }
        if (!button) {
          status = -1;
        }
        if (botton && status != -1 && this.state.role == 1) {
          status = 3;
        }
        if (!photo) {
          photo = undefined;
        }

        const entity = {
          eid: data.eid,
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
          statusSummary,
          statusNotes,
          statusDetail,
          statusStart,
          statusEnd,
          statusName,
          relatedPeople,
          relatedOrganizations,
          digitalResources,
          publishedResources,
          archivalResources,

          status,
          feedback: this.state.feedback
        };
        ole.log(entity);
        EntityService.review(JSON.stringify(entity))
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
              judge
            />
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
              judge
              changeStatusStart={this.changeStatusStart}
              changeStatusEnd={this.changeStatusEnd}
              changeStatusName={this.changeStatusName}
              statusStart={this.state.statusStart}
              statusEnd={this.state.statusEnd}
              statusName={this.state.statusName}
              type={2}
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
                judge
                changeStatus={this.changeStatusSummary}
                checked={this.state.statusSummary}
              />
            </Row>
            <Row>
              <Details
                text={this.state.detail}
                changeText={this.changeDetail}
                changeStatus={this.changeStatusDetail}
                checked={this.state.statusDetail}
                judge
              />
            </Row>
            <Row>
              <Notes
                text={this.state.notes}
                changeStatus={this.changeStatusNotes}
                checked={this.state.statusNotes}
                changeText={this.changeNotes}
                judge
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
              judge
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
              judge
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
              judge
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
              judge
            />
          </Col>
        </Row>
        <Row>
          <label> Feedback:</label>
          <TextArea
            value={this.state.feedback}
            onChange={this.changeFeedback}
            placeholder={'please input your feedback'}
            style={{ marginTop: '10px' }}
            autosize={{ minRows: 4, maxRows: 6 }}
          />
        </Row>
        <Form.Item {...tailFormItemLayout}>
          <input
            type='checkbox'
            checked={this.state.allChecked}
            onChange={this.changeAllChecked}
          />
          <label> Approve all fields</label>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type='primary'
            htmlType='button'
            onClick={e => {
              this.handleSubmit(true, e);
            }}
          >
            {this.state.role == 1 ? 'Publish' : 'Approve'}
          </Button>
          <Button
            type='danger'
            htmlType='button'
            onClick={e => {
              this.handleSubmit(false, e);
            }}
            style={{ marginLeft: '20px' }}
          >
            Reject
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
CheckOg.propTypes = {
  getFieldDecorator: PropTypes.func,
  getFieldValue: PropTypes.func,
  setFieldsValue: PropTypes.func
};
CheckOg.contextType = LayoutContext;
const WrappedCheckOg = Form.create({ name: 'checkOg' })(CheckOg);

export default WrappedCheckOg;
