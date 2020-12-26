interface ILanguageRepository {
  get(key: string): string;
}

class LanguageRepository implements ILanguageRepository {
  private translations: { [key: string]: string } = {
    save: 'Spara konfiguration',
    copy: 'Kopiera länk',
    compression: 'Komprimering',
    validation: 'Validering',
    epg: 'EPG',
    groups: 'Grupper',
    streams: "Strömmar",
    targetFolder: "Målmapp",
    sourcePlaylist: "Spellista",
    cachePath: 'Sökväg för cachefiler',
    activateCache: 'Aktivera cache',
    cacheLifespan: 'Tid för cache',
    import: 'Importera konfiguration',
    export: 'Exportera konfiguration',
    triggerCouchpotato: 'Kör Couchpotato',
    setCouchpotatoPath: 'Ange sökväg till Couchpotato',
    couchpotatoPath: 'Sökväg till Couchpotato webhook',
    couchpotatoIsRunning: 'Couchpotato körs redan',
    id: 'Id',
    friendlyName: 'Visningsnamn',
    group: 'Grupp',
    timeshift: 'Timeshift',
    epgId: 'EPG-Id'
  };

  get(key: string): string {
    if (this.translations[key]) {
      return this.translations[key];
    }

    return `No translation found for "${key}"`;
  }
}

const $languageRepository = new LanguageRepository();
export { $languageRepository };
