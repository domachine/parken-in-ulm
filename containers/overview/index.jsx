import React, { Component, PropTypes } from 'react';
import { Panel, TextInput } from 'muicss/react';
import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

export default class Overview extends Component {
  constructor() {
    super();

    this.onChangeSearchString = this.onChangeSearchString.bind(this);

    // Selector to filter parkinglots using search-string
    this.visibleParkinglots = createSelector(
      (state, props) => props.parkinglots,
      state => state.searchString,
      (parkinglots, searchString) =>
        sortBy(
          parkinglots
            .filter(lot =>
              lot.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            ),
          'available'
        )
        .reverse()
    );

    this.state = {
      searchString: '',
    };
  }

  onChangeSearchString(e) {
    this.setState({ searchString: e.target.value });
  }

  render() {
    return (
      <div>
        <Panel>
          <TextInput
            hint="Suchen ..."
            onChange={this.onChangeSearchString}
            value={this.state.searchString}
          />
        </Panel>
        {this.visibleParkinglots(this.state, this.props).map(parkinglot =>
          <Panel key={parkinglot.id}>
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
      </div>
    );
  }
}

Overview.propTypes = {
  parkinglots: PropTypes.array,
};
