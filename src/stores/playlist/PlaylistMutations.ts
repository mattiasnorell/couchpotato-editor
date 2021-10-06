import { Mutation, MutationTree } from "vuex";
import { PlaylistItem } from "_models/PlaylistItem";
import { PlaylistState } from "./PlaylistState";

enum PlaylistMutationsDefinitions {
    SET_PLAYLIST_ITEMS = 'playlist/setPlaylistItems'
}

class PlaylistMutations implements MutationTree<PlaylistState> {
    [key: string]: Mutation<PlaylistState>;

    public getPlaylistItems = (state: PlaylistState, playlistItems: PlaylistItem[]) => (state.playlistItems = playlistItems);
}

export { PlaylistMutations, PlaylistMutationsDefinitions }