import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Title = (props) => {
  if (!props.data) {
    return (<div>Select a user...</div>);
  }
  return (
    <div>
      <h3>{props.data.data.title}</h3>
    </div>
  );
};

Title.propTypes = {
  data: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps)(Title);
