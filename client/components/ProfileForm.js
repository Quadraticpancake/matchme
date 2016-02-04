import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import * as MatchmakerActions from '../actions/matchmaker';
export const fields = ['first_name', 'last_name', 'gender', 'gender_preference', 'age_min', 'age_max', 'favoriteColor', 'employed', 'description', 'image_url', 'birthday', 'status'];

class ProfileForm extends Component {

  render() {

    const formStyle = {

      clear: 'all'

    }

    const {
      fields: {first_name, last_name, gender, gender_preference, age_min, age_max, favoriteColor, employed, description, image_url, birthday, status},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (
      <div>

      <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture</label>
          <div>
          <img src={image_url.value} />
          <br></br>
          <button type="button" onClick={() => {console.log('clicked')}}>Change Profile Picture</button>
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
            <label>
              <input type="radio" {...gender} value="male" checked={gender.value === 'male'}/> Male
            </label>
            <label>
              <input type="radio" {...gender} value="female" checked={gender.value === 'female'}/> Female
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
              <input type="radio" {...gender_preference} value="male" checked={gender_preference.value === 'male'}/> Male
            </label>
            <label>
              <input type="radio" {...gender_preference} value="female" checked={gender_preference.value === 'female'}/> Female
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
            to
            <input type="number" max="100" {...age_max} placeholder="Max Age" />
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <select

              {...favoriteColor}
              value={favoriteColor.value || ''}  // required syntax for reset form to work
                                                 // undefined will not change value to first empty option
                                                 // when resetting
              >
              <option></option>
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </select>
          </div>
        </div>
        <div>
          <label>
            <input type="checkbox" {...status} checked={status.value}/> Want to be Matched?
          </label>
        </div>
        <div>
          <label>Description</label>
          <div>
            <textarea
              {...description}
              value={description.value || ''} // required for reset form to work (only on textarea's)
                                        // see: https://github.com/facebook/react/issues/2533
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
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
