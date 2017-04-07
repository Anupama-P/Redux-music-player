import Songlist from './Mydata';
import DoublyList from './doublylist';

const newlist = new DoublyList();

Songlist.map((data, i) => {
  newlist.add(data, i);
});

const data = newlist.head;

const initialstate = {
  data,
  newlist,
  length: Songlist.length
};

const musicReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'MUSIC_SELECTED':
      return {
        ...state,
        data: action.currentnode
      };
    default:
      return state;
  }
};

export default musicReducer;
