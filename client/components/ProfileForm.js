import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['first_name', 'last_name', 'gender',
  'gender_preference', 'age_min', 'age_max', 'favoriteColor',
  'employed', 'description', 'image_url', 'birthday', 'status'];
import css from './ProfileForm.scss';
import { Button } from 'react-bootstrap';

class ProfileForm extends Component {

  render() {
    const formStyle = {

      clear: 'all'

    };

    const {
      fields: { first_name, last_name, gender, gender_preference, age_min,
        age_max, description, image_url, birthday, status },
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <div>

      <form className={css.form} style={formStyle} onSubmit={handleSubmit}>
        <div>
          <h3>Please set your birthday, age preference, and gender preference.</h3>
          <h4>Note: You won't be matched unless you provide a birthday.</h4>
          <label>Profile Picture</label>
          <div>
          <img src={image_url.value} />
          <br></br>
          <a href="/pictures">Change Profile Picture</a>
          </div>
        </div>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...first_name} />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Last Name" {...last_name} />
          </div>
        </div>
        <div>
          <label>Gender</label>
          <div>
            <label for="maleRadio">
              <input type="radio" {...gender} value="male" checked={gender.value === 'male'} id='maleRadio'/>
            <span>Male</span>
            </label>
            <label for="femaleRadio">
              <input type="radio" {...gender} value="female" checked={gender.value === 'female'} id='femaleRadio'/>
            Female
            </label>
          </div>
        </div>
        <div>
          <label>Birthday</label>
          <input type="date" name="birthday" max="1997-01-01" {...birthday} />
        </div>
        <div>
          <label>Gender Preference</label>
          <div>
            <label>
              <input
                type="radio" {...gender_preference}
                value="male"
                checked={gender_preference.value === 'male'}
              />
              Male
            </label>
            <label>
              <input
                type="radio" {...gender_preference}
                value="female"
                checked={gender_preference.value === 'female'}
              /> Female
            </label>
            <label>
              <input type="radio" {...gender_preference} value="none" checked={gender_preference.value === 'none' || gender_preference.value === null}/> None
            </label>
          </div>
        </div>
        <div>
          <label>Age Preference</label>
          <div>
            <input type="number" min="18"  {...age_min} placeholder="Min Age" />
            <label>to</label>
            <input type="number" max="100" {...age_max} placeholder="Max Age" />
          </div>
        </div>
        <div>
          <label>
            <input
              type="checkbox" {...status}
              checked={status.value}
              defaultChecked
            /> Want to be Matched?
          </label>
        </div>
        <div>
          <label>Description</label>
          <div>
            <textarea
              {...description}
              maxLength="100"
              value={description.value || ''} // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
            />
          </div>
        </div>
        <div>
          <Button bsStyle="success" type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Save Profile
          </Button>
          <Button bsStyle="danger" danger type="button" disabled={submitting} onClick={resetForm}>
            Cancel Edit
          </Button>
        </div>
      </form>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'profile',
  fields
},
state => ({ // mapStateToProps
  initialValues: state.user.userInfo, // will pull state into form's initialValues
}),
{}      // mapDispatchToProps (will bind action creator to dispatch)
)(ProfileForm);
