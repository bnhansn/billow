import Input from '../Input';
import { Field, reduxForm } from 'redux-form';
import React, { PropTypes, Component } from 'react';

class AccountSettingsForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <form onSubmit={handleSubmit(::this.handleSubmit)}>
        <div className="card">
          <div className="card-block">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
                <h5>Settings</h5>
              </div>
              <div className="col-sm-8 col-xs-12">
                <Field
                  type="text"
                  name="name"
                  label="Name"
                  component={Input}
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-xs-right">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'accountSettings',
  validate,
})(AccountSettingsForm);
