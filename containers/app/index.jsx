import React, { Component, PropTypes } from 'react';
import { Appbar, Container, Panel } from 'muicss/react';
import request from 'superagent';
import { Link } from 'react-router';

import Overview from 'containers/overview';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: true,
      parkinglots: [],
      searchString: '',
    };
  }

  componentDidMount() {
    this.fetchParkinglots();
  }

  fetchParkinglots() {
    const setState = this.setState.bind(this);

    request.get('/api/parkinglots')
      .end(load);

    function load(err, res) {
      if (err) return alert(err.message); // eslint-disable-line
      setState({ parkinglots: res.body, isFetching: false });
    }
  }

  render() {
    const active = this.props.routes[1].component === Overview
      ? 'overview'
      : 'stats';

    return (
      <div>
        <Appbar />
        <Container>
          {this.state.isFetching
            ? (
              <Panel>
                <div className="mui--text-center mui--text-button">Lade ...</div>
              </Panel>
            ) : null}
          <div className="mui--text-center">
            <ul className="mui-tabs__bar">
              <li className={active === 'overview' ? 'mui--is-active' : ''}>
                <Link to="/">Übersicht</Link>
              </li>
              <li className={active === 'stats' ? 'mui--is-active' : ''}>
                <Link to="/stats">Auslastung</Link>
              </li>
            </ul>
          </div>
          <br />
          {React.cloneElement(this.props.children, {
            parkinglots: this.state.parkinglots,
          })}
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};
