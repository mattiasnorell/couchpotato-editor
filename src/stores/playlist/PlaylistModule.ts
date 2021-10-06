import { Module } from 'vuex';
import { StoreState } from '../StoreState';
import { PlaylistState } from './PlaylistState';
import { PlaylistGetters } from './PlaylistGetters';
import { PlaylistMutations } from './PlaylistMutations';
import { PlaylistActions } from './PlaylistActions';

const $playlistModule: Module<PlaylistState, StoreState> = {
    namespaced: true,
    state: new PlaylistState(),
    getters: new PlaylistGetters(),
    mutations: new PlaylistMutations(),
    actions: new PlaylistActions()
}

export { $playlistModule }