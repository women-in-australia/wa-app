import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout } from 'antd';
import enUS from 'antd/es/locale/en_US';

import history from './history';
import store from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckWm from './containers/CheckWm';
import CheckOg from './containers/CheckOg';

import CreateWmEntity from './containers/CreateWmEntity';
import CreateOgEntity from './containers/CreateOgEntity';
import OgDraft from './containers/OgDraft';
import WmDraft from './containers/WmDraft';
import LogIn from './containers/LogIn';
import Register from './containers/Register';
import Entities from './containers/Entities';
import EntityDetail from './containers/EntityDetail/index.js';
import ApplicationList from './containers/ApplicationList';
import ApplicationPage from './containers/ApplicationPage';
import UserPage from './containers/UserPage';
import Users from './containers/Users';

import background from '../resources/background-content.jpg';

class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={enUS}>
          <Router history={history}>
            <Layout>
              <Header />

              <Layout.Content
                style={{
                  minHeight: 640,
                  // background: `white url(${background}) repeat-x`,
                  padding: '0 calc(50px + 10%) 25px calc(50px + 10%)'
                }}
              >
                <div
                  style={{
                    padding: 24,
                    background: 'white',
                    border: '3px solid rgba(0, 0, 0, 0.1)',
                    borderTop: 'none',
                    borderRadius: '0 0 7px 7px'
                  }}
                >
                  <Switch>
                    <Route path='/' exact component={LogIn} />
                    <Route path='/logIn' component={LogIn} />
                    <Route path='/session/create' component={LogIn} />
                    <Route path='/register' component={Register} />
                    <Route path='/users/create' component={Register} />
                    <Route
                      path='/applications/:uid'
                      component={ApplicationPage}
                    />
                    <Route path='/applications' component={ApplicationList} />
                    <Route
                      path={'/entities/create/(organization|organisation)'}
                      component={CreateOgEntity}
                    />
                    <Route
                      path='/entities/create/person'
                      component={CreateWmEntity}
                    />
                    <Route
                      path='/entities/draft/:id(organisation|organization)'
                      component={OgDraft}
                    />
                    <Route
                      path='/entities/draft/person/:id'
                      component={WmDraft}
                    />
                    <Route
                      path='/entities/check/:id(organisation|organization)'
                      component={CheckOg}
                    />
                    <Route
                      path='/entities/check/person/:id'
                      component={CheckWm}
                    />
                    <Route
                      path='/entities/reject/person/:id'
                      component={WmDraft}
                    />
                    <Route
                      path='/entities/reject/:id(organisation|organization)'
                      component={OgDraft}
                    />

                    <Route path='/entities/:id' component={EntityDetail} />
                    <Route path='/entities' component={Entities} />

                    <Route path='/users/:uid' component={UserPage} />
                    <Route path='/users' component={Users} />
                  </Switch>
                </div>
              </Layout.Content>

              {/* <Footer /> */}
            </Layout>
          </Router>
        </ConfigProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('application'));
