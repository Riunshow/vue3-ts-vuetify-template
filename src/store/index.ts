import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import UserModule, { state as UserState } from './modules/user'

export type RootState = {
  user: UserState;
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user']
})

const store = createStore({
  modules: {
    user: UserModule
  },
  plugins: [vuexLocal.plugin]
})

export default store
