import _ from 'lodash';

const initialState = [
  {id: 1, name: 'PHP'},
  {id: 2, name: 'JavaScript'},
  {id: 3, name: 'JavaScript2'},
  {id: 4, name: 'JavaScript3'},
  {id: 5, name: 'JavaScript4'},
  {id: 6, name: 'JavaPHPScript5'},
];

export default function categories(state = initialState, action = {}) {
  switch (action.type) {
    case 'UPDATE_FILTER':
      if(!action.filter.name) return initialState;

      return _.filter(initialState, (category) => {
        return _.includes(category.name.toLowerCase(), action.filter.name.toLowerCase());
      });
    default:
      return state;
  }
}