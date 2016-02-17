import { createStore } from 'redux';
import reducer from './reducers';

export default function makeStore() {
  return createStore(reducer);
}
