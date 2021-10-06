import { ActionTree, Action, ActionContext } from "vuex";
import { StoreState } from "../StoreState";
import { PlaylistState } from "./PlaylistState";
import { container, cid } from "inversify-props";
import { IPlaylistRepository } from "_services/repositories/playlistRepository";
import { PlaylistMutationsDefinitions } from "./PlaylistMutations";

type PlaylistContext = ActionContext<PlaylistState, StoreState>;

enum PlaylistActionsDefinitions {
    SET_PLAYLIST_ITEMS = 'playlist/fetchPlaylistItems'
}

class PlaylistActions implements ActionTree<PlaylistState, StoreState> {
    [key: string]: Action<PlaylistState, StoreState>;

    public fetchPlaylistItems = async ({ commit, state }: PlaylistContext) => {
        if (state.playlistItems.length > 0) {
            return;
        }

        const module = container.get<IPlaylistRepository>(cid.IPlaylistRepository);
        const playlist = module.getAll();
        commit(PlaylistMutationsDefinitions.SET_PLAYLIST_ITEMS, playlist);
    }
}

export { PlaylistActions, PlaylistActionsDefinitions }