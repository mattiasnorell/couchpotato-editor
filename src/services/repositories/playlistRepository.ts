import { PlaylistItem } from '../../models/PlaylistItem';
import { $playlistParser } from '../parsers/playlistParser';
import axios from 'axios';

class PlaylistRepository {
  private playlistItems: PlaylistItem[] = [];
  private path: string;

  public init(path: string): void {
    this.path = path;
  }

  public async load(): Promise<PlaylistItem[]> {
    const playlist = await axios.get(`/api/configuration?path=${encodeURIComponent(this.path)}`);

    if (playlist.status !== 200) {
      return [];
    }

    const items = $playlistParser.parse(playlist.data);
    return items;
  }

  public async getAll(): Promise<PlaylistItem[]> {
    if (!this.playlistItems || this.playlistItems.length === 0) {
      this.playlistItems = await this.load();
    }

    return this.playlistItems;
  }

  public async search(query: string, take: number = 10): Promise<PlaylistItem[]> {
    if (!this.playlistItems || this.playlistItems.length === 0) {
      this.playlistItems = await this.load();
    }

    return this.playlistItems.filter((item) => item.tvgName.toLocaleLowerCase().includes(query.toLocaleLowerCase())).splice(0, take);
  }
}

const $playlistRepository = new PlaylistRepository();
export { $playlistRepository };
