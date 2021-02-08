export interface IMarkdownHelper {
  parse(input: string): string;
}

export class MarkdownHelper implements IMarkdownHelper {
  public parse(input: any): string {
    const parsedContent: string = input
      .replace(/\/n$/gim, '</br>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^```([^]*)```/gm, '<pre>$1</pre>')
      .replace(/^!\[(.*?)\]\((.*?)(\".*?\")\)/gim, '<img src="$2" alt="$1"/>')
      .replace(/^\[(.*?)\]\((.*?)\)/gim, '<a href="$1">$2</a>')
      .replace(/^\|([^]*)\|/gm, (e: string) => {
        return this.parseTable(e);
      });

    return parsedContent;
  }

  private parseTable(input: string): string {
    const lines = input.split('\n');

    let parsedTable: string = '<table>';

    if (lines.length === 0) {
      return '';
    }

    const hasHeader = lines.length > 1 && lines[1].includes(':---');

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      parsedTable += '<tr>';

      if (line.startsWith('|')) {
        line = line.slice(1, line.length);
      }

      if (line.endsWith('|')) {
        line = line.slice(0, line.length - 1);
      }

      const cols = line.split(' | ');

      for (let ii = 0; ii < cols.length; ii++) {
        parsedTable += i === 0 && hasHeader ? '<th>' : '<td>';
        parsedTable += cols[ii];
        parsedTable += i === 0 && hasHeader ? '</th>' : '</td>';
      }

      parsedTable += '</tr>';

      if (i === 0 && hasHeader) {
        i++;
      }
    }

    parsedTable += '</table>';

    return parsedTable;
  }
}

const $markdownHelper: MarkdownHelper = new MarkdownHelper();
export { $markdownHelper };