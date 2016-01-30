import React, { Component, PropTypes } from 'react';
import { Appbar, Container, Panel } from 'muicss/react';
import request from 'superagent';

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
};
