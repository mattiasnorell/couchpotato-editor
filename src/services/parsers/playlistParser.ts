import { PlaylistItem } from '_models/PlaylistItem';

export interface IPlaylistParser {
  parse(playlist: string): PlaylistItem[];
}

export class PlaylistParser {
  private playlistItems: PlaylistItem[] = [];

  public parse(playlist: string): PlaylistItem[] {
    const items: PlaylistItem[] = [];

    var lines = playlist.split('\n');
    for (var line = 0; line < lines.length; line++) {
      if (lines[line].startsWith('#EXTINF')) {
        const parsedLine = this.parseLine(lines[line]);
        items.push(parsedLine);
      }
    }

    return items;
  }

  private parseLine(input: string): PlaylistItem {
    const item = new PlaylistItem();
    item.groupTitle = this.GetValueForAttribute(input, 'group-title');
    item.tvgId = this.GetValueForAttribute(input, 'tvg-id');
    item.tvgLogo = this.GetValueForAttribute(input, 'tvg-logo');
    item.tvgName = this.GetValueForAttribute(input, 'tvg-name');

    return item;
  }

  private GetValueForAttribute(item: string, attributeName: string): string {
    const regex = new RegExp(attributeName + '="([A-Za-zåäöÅÄÖ.\\[\\]\\(\\)&\/0-9 _:\-]*)"');
    const match = regex.exec(item);

    if (!match) {
      return '';
    }

    return match[1];
  }
}