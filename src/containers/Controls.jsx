import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectMusic } from 'actions';

class Controls extends React.Component {
  state = {
    play: true,
    shuffle: false,
    progressvalue: 0,
    disableprev: 'disabled',
    disablenext: '',
    disableshuffle: '',
    shuffleicon: 'grey',
    loopicon: 'grey',
    currenttime: '',
    duration: '',
    loop: false
  }

  componentWillMount() {
    if (this.props.length < 2) {
      this.setState({ disableprev: 'disabled', disablenext: 'disabled', disableshuffle: 'disabled' });
    }
  }

  disablebutton = (value) => {
    if (value === this.props.newlist.tail) {
      this.setState({ disablenext: 'disabled', disableprev: '' });
    } else if (value === this.props.newlist.head) {
      this.setState({ disableprev: 'disabled', disablenext: '' });
    } else {
      this.setState({ disableprev: '', disablenext: '' });
    }
  }

  nextnode = () => {
    if (!this.state.shuffle) {
      this.setState({ progressvalue: 0, play: true });
      this.props.selectMusic(this.props.data.next);
      this.disablebutton(this.props.data.next);
    } else {
      this.shuffleSong();
    }
  }

  shuffleSong = () => {
    const num = Math.floor(Math.random() * this.props.length) + 1;
    const newdata = this.props.newlist.getNodeAt(num);
    if (this.props.data === newdata) {
      this.shuffleSong();
    } else {
      this.setState({ progressvalue: 0, play: true });
      this.props.selectMusic(newdata);
      this.disablebutton(newdata);
    }
  }

  previousnode = () => {
    if (!this.state.shuffle) {
      this.setState({ progressvalue: 0, play: true });
      this.props.selectMusic(this.props.data.previous);
      this.disablebutton(this.props.data.previous);
    } else {
      this.shuffleSong();
    }
  }

  playpause = () => {
    const mymusic = document.getElementById('mymusic');
    if (this.state.play) {
      mymusic.pause();
      this.setState({ play: false });
    } else {
      mymusic.play();
      this.setState({ play: true });
    }
  }

  shuffle = () => {
    if (this.state.shuffle) {
      this.setState({ shuffle: false, shuffleicon: 'grey' });
    } else {
      this.setState({ shuffle: true, shuffleicon: 'lightskyblue' });
      if (!this.state.play) {
        this.shuffleSong();
      }
    }
  }

  updatetime = () => {
    const mymusic = document.getElementById('mymusic');
    const currentTime = mymusic.currentTime;
    const duration = mymusic.duration;
    const durminutes = Math.floor(duration / 60);
    const durseconds = Math.floor(duration - (durminutes * 60));
    const currminutes = Math.floor(currentTime / 60);
    const currseconds = Math.floor(currentTime - (currminutes * 60));
    this.setState({ progressvalue: ((currentTime * 100) / duration), currenttime: `${currminutes}:${currseconds}`, duration: `${durminutes}:${durseconds}` });
  }

  musicend = () => {
    if (this.props.data.next) {
      this.nextnode();
    }
  }

  updatemusic = () => {
    const music = document.getElementById('mymusic');
    const seekBar = document.getElementById('seek-bar');
    const time = music.duration * (seekBar.value / 100);
    music.currentTime = time;
  }

  isloop = () => {
    if (this.state.loop) {
      this.setState({ loop: false, loopicon: 'grey' });
    } else {
      this.setState({ loop: true, loopicon: 'lightskyblue' });
    }
  }
  render() {
    return (
      <div className="controldiv">
        <audio autoPlay loop={this.state.loop ? 'loop' : ''} id="mymusic" src={this.props.data.data.audio_url} onTimeUpdate={this.updatetime} onEnded={this.musicend} />
        <div className="seekbar">
          <input type="range" id="seek-bar" min="0" max="100" step="1" value={this.state.progressvalue ? this.state.progressvalue : 0} onChange={this.updatemusic} />
        </div>
        <div className="durationdiv">
          <div className="currenttimediv">{this.state.currenttime}</div>
          <div className="durationinnerdiv">{this.state.duration === 'NaN:NaN' ? '0:0' : this.state.duration}</div>
        </div>
        <div className="othercontrols">
          <button onClick={this.previousnode} disabled={this.state.disableprev}><i className="fa fa-step-backward" /></button>
          <button onClick={this.playpause} className="play-pause-button"><i className={this.state.play ? 'fa fa-pause' : 'fa fa-play'} /></button>
          <button onClick={this.nextnode} disabled={this.state.disablenext}><i className="fa fa-step-forward" /></button>
        </div>
        <button onClick={this.shuffle} disabled={this.state.disableshuffle} className="shuffle-button"><i className="fa fa-random" style={{ color: this.state.shuffleicon }} /></button>
        <button onClick={this.isloop} className="loop-button"><i className="fa fa-retweet" style={{ color: this.state.loopicon }} /></button>
      </div>
    );
  }
}

Controls.propTypes = {
  data: PropTypes.object,
  selectMusic: PropTypes.func,
  length: PropTypes.number,
  newlist: PropTypes.object
};

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
  return {
    data: state.data,
    length: state.length,
    newlist: state.newlist
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectMusic, }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Controls);
