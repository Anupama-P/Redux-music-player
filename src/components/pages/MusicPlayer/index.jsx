import React from 'react';
import MusicImage from 'containers/MusicImage';
import Controls from 'containers/Controls';
import Title from 'containers';

const MusicPlayer = () => (
  <div>
    <Title />
    <MusicImage />
    <Controls />
  </div>
);

export default MusicPlayer;
