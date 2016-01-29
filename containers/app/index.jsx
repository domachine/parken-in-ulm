import React, { Component } from 'react';
import { Appbar, Container, Panel, TextInput } from 'muicss/react';
import request from 'superagent';
import { createSelector } from 'reselect';

export default class App extends Component {
  constructor() {
    super();

    this.onChangeSearchString = this.onChangeSearchString.bind(this);

    this.visibleParkinglots = createSelector(
      state => state.parkinglots,
      state => state.searchString,
      (parkinglots, searchString) =>
        parkinglots.filter(lot =>
          lot.name.toLowerCase().indexOf(searchString) !== -1
        )
    );
    this.state = {
      isFetching: true,
      parkinglots: [],
      searchString: '',
    };
  }

  componentDidMount() {
    this.fetchParkinglots();
  }

  onChangeSearchString(e) {
    this.setState({ searchString: e.target.value });
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
          <Panel>
            <TextInput
              hint="Suchen ..."
              onChange={this.onChangeSearchString}
              value={this.state.searchString}
            />
          </Panel>
          {this.visibleParkinglots(this.state).map(parkinglot =>
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
