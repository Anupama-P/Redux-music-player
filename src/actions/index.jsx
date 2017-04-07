export const selectMusic = (music) => {
  return {
    type: 'MUSIC_SELECTED',
    currentnode: music
  };
};
