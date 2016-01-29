import React, { Component } from 'react';
import { Appbar, Container, Panel } from 'muicss/react';
import request from 'superagent';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      parkinglots: [],
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
          {this.state.parkinglots.map(parkinglot =>
            <Panel>
              <div className="mui--text-title">
                {parkinglot.name}
              </div>
              <br />
              <div className="mui--text-caption">
                geöffnet
              </div>
              <div className="mui--text-body1">
                <span className="mui--text-body2">
                  {parkinglot.open}
                </span>
              </div>
              <br />
              <div className="mui--text-caption">
                freie Plätze
              </div>
              <div>
                <span className="mui--text-body2">
                  {parkinglot.available || 0}
                </span>
                <span className="mui--text-caption mui--text-dark-hint"> / {parkinglot.total}</span>
              </div>
            </Panel>
          )}
        </Container>
      </div>
    );
  }
}
