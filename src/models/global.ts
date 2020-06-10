import { Reducer, Effect, Subscription } from 'umi';

const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

interface GlobalModelState {

}

interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetch: Effect;
    query: Effect;
  };
  reducers: {
    save: Reducer<GlobalModelState>;
  };
  subscription: {
    start: Subscription;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {},

  effects: {
    *fetch(action, { call, fork }) {
      yield call(delay, 3000);
      console.log(123, fork, action);
    },
    *query(action, { take }) {
      const a = yield take('fetch');
      console.log(a);
    }
  },

  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },

  subscription: {
    start(a, b) {
      console.log(a, b)
    }
  }
};

export default GlobalModel;
