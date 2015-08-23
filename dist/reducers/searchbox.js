const initialState = [{
  filter: {
    name: '',
  }
}]

export default function searchBox(state = initialState, action = {}) {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return {
        filter: {
          name: action.filter.name,
        }
      }
    default:
      return state;
  }
}