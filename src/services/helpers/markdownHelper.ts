import { injectable } from "inversify-props";

export interface IMarkdownHelper {
  parse(input: string): string;
}

@injectable()
export class MarkdownHelper implements IMarkdownHelper {
  public parse(input: any): string {
    const parsedContent: string = input
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
      .replace(/```([a-z]*)([^]*?)```/gm, '<pre>$2</pre>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^!\[(.*?)\]\((.*?)(\".*?\")\)/gim, '<img src="$2" alt="$1"/>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/^\|([^]*)\|/gm, (e: string) => {
        return this.parseTable(e);
      })
      .replace(/\/n$/gim, '</br>');

    return parsedContent;
  }

  private parseTable(input: string): string {
    const lines = input.split('\n');

    let parsedTable: HTMLTableElement = document.createElement('table');

    if (lines.length === 0) {
      return '';
    }

    for (let i = 0; i < lines.length; i++) {
      const hasHeader = lines.length > i + 1 && lines[i + 1].includes(':---');
      let line = lines[i].trim();
      const tableRow = document.createElement('tr');
      parsedTable.appendChild(tableRow);

      if (line.startsWith('|')) {
        line = line.slice(1, line.length);
      }

      if (line.endsWith('|')) {
        line = line.slice(0, line.length - 1);
      }

      const cols = line.split(' | ');

      for (let ii = 0; ii < cols.length; ii++) {
        const col: HTMLTableHeaderCellElement | HTMLTableDataCellElement = hasHeader
          ? document.createElement('th')
          : document.createElement('td');
        col.innerText = cols[ii];
        tableRow.appendChild(col);
      }

      if (hasHeader) {
        i++;
      }
    }

    return parsedTable.outerHTML;
  }
}
