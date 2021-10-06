import { createStore, StoreOptions } from 'vuex';
import { StoreState, $storeState } from './StoreState';
import { $playlistModule } from './playlist/PlaylistModule';

const storeOptions: StoreOptions<StoreState> = {
    state: $storeState,
    modules: {
        playlist: $playlistModule
    }
}

const $store = createStore(storeOptions);

export { $store }