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
    axios.defaults.headers = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    };

    //const playlist = await axios.get(`/api/configuration?path=${encodeURIComponent(this.path)}`);
    const playlist = await axios.get(`/playlist.m3u`);

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

  public async search(query: string, take: number = 25): Promise<PlaylistItem[]> {
    if (!this.playlistItems || this.playlistItems.length === 0) {
      this.playlistItems = await this.load();
    }

    return this.playlistItems.filter((item) => item.tvgName.toLocaleLowerCase().includes(query.toLocaleLowerCase())).splice(0, take);
  }

  public async searchGroup(query: string, take: number = 25): Promise<string[]> {
    if (!this.playlistItems || this.playlistItems.length === 0) {
      this.playlistItems = await this.load();
    }

    const result: string[] = [];

    this.playlistItems.forEach((item) => {
      if (item.groupTitle.toLocaleLowerCase().includes(query.toLocaleLowerCase()) && !result.includes(item.groupTitle)) {
        result.push(item.groupTitle);
      }
    });

    return result.splice(0, take);
  }
}

const $playlistRepository = new PlaylistRepository();
export { $playlistRepository };
