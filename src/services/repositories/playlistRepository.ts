import { PlaylistItem } from '_models/PlaylistItem';
import { IPlaylistParser } from '_services/parsers/playlistParser';
import axios from 'axios';
import { injectable, inject } from 'inversify-props';

export interface IPlaylistRepository {
  init(path: string): void
  load(): Promise<PlaylistItem[]>
  getAll(): Promise<PlaylistItem[]>
  search(query: string, take?: number): Promise<PlaylistItem[]>
  searchGroup(query: string, take?: number): Promise<string[]>
}

@injectable()
export class PlaylistRepository {
  @inject()
  private playlistParser: IPlaylistParser;

  private playlistItems: PlaylistItem[] = [];
  private path: string;
  private apiBasePath: string = 'http://couchpotato.automagiskdatabehandling.se/api';

  public init(path: string): void {
    this.path = path;
  }

  public async load(): Promise<PlaylistItem[]> {
    axios.defaults.headers = {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0'
    };
    
    const playlist = await axios.get(`${this.apiBasePath}/file/download?path=${encodeURIComponent(this.path)}`);

    if (playlist.status !== 200) {
      return [];
    }

    const items = this.playlistParser.parse(playlist.data);
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