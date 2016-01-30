import React, { Component, PropTypes } from 'react';
import { Panel } from 'muicss/react';
import { createSelector } from 'reselect';

export default class Stats extends Component {
  constructor() {
    super();

    this.total = createSelector(
      (state, props) => props.parkinglots,
      parkinglots =>
        parkinglots.reduce(
          (total, parkinglot) => total + parkinglot.total,
          0
        )
    );

    this.available = createSelector(
      (state, props) => props.parkinglots,
      parkinglots =>
        parkinglots.reduce(
          (available, parkinglot) => available + parkinglot.available,
          0
        )
    );

    this.percentage = createSelector(
      this.total,
      this.available,
      (total, available) => (total - available) / total * 100
    );

    this.status = createSelector(
      this.percentage,
      percentage => {
        if (percentage <= 50) return 'green';
        if (percentage <= 75) return 'yellow';
        return 'red';
      }
    );
  }

  render() {
    return (
      <Panel>
        <div className="progress-bar">
          <div
            className={
              `progress-bar__progress
               progress-bar__progress--${this.status(this.state, this.props)}`
            }
            style={{ width: `${this.percentage(this.state, this.props)}%` }}
          />
        </div>
      </Panel>
    );
  }
}

Stats.propTypes = {
  parkinglots: PropTypes.array,
};
