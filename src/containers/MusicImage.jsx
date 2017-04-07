import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const MusicImage = (props) => {
  if (!props.data) {
    return (<div>Select a user...</div>);
  }
  return (
    <div>
      <img alt="musicimage" src={props.data.data.image} className="imagediv" />;
    </div>
  );
};

MusicImage.propTypes = {
  data: PropTypes.object,
};

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps)(MusicImage);
