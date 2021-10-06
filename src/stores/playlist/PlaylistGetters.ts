import { GetterTree, Getter } from "vuex";
import { PlaylistState } from "./PlaylistState";
import { StoreState } from "../StoreState";

enum PlaylistGettersDefinitions {
    GET_PLAYLIST_ITEMS = 'playlist/getPlaylistItems'
}

class PlaylistGetters implements GetterTree<PlaylistState, StoreState> {
    [key: string]: Getter<PlaylistState, StoreState>;

    public getPlaylistItems = (state: PlaylistState) => state.playlistItems;
}

export { PlaylistGetters, PlaylistGettersDefinitions }