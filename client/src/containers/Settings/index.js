import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateSettings } from './actions';
import Topnav from '../../components/Topnav';
import SettingsForm from '../../components/SettingsForm';

class Settings extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    updateSettings: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
  };

  handleSubmit = (data) => this.props.updateSettings(this.props.user.id, data);

  render() {
    const { isSubmitting, initialValues } = this.props;

    return (
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <Topnav header="Settings" />
        </div>
        <div className="container">
          <SettingsForm
            enableReinitialize
            isSubmitting={isSubmitting}
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>

    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    initialValues: state.app.user,
    isSubmitting: state.settings.isSubmitting,
  }),
  { updateSettings }
)(Settings);
