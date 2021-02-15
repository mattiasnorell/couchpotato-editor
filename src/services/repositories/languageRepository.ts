interface ILanguageRepository {
  get(key: string): string;
}

class LanguageRepository implements ILanguageRepository {
  private translations: { [key: string]: string } = {
    cancel: 'Avbryt',
    loading: 'Laddar',
    delete: 'Ta bort',
    areYouSure: 'Är du säker?',
    ok: 'Ok',
    save: 'Spara konfiguration',
    copy: 'Kopiera länk',
    compression: 'Komprimering',
    validation: 'Validering',
    epg: 'EPG',
    name: 'Namn',
    close: 'Stäng',
    actions: 'Åtgärder',
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
    for: 'för',
    setPath: 'Ange sökväg',
    setCouchpotatoPath: 'Ange sökväg till Couchpotato',
    couchpotatoWebsocketPath: 'Sökväg till Websocket',
    couchpotatoApiPath: 'Sökväg till API',
    couchpotatoIsRunning: 'Couchpotato körs redan',
    id: 'Id',
    friendlyName: 'Visningsnamn',
    group: 'Grupp',
    timeshift: 'Timeshift',
    epgId: 'EPG-Id',
    menuStart: 'Start',
    menuEditor: 'Editor',
    menuSettings: 'Inställningar',
    menuDashboard: 'Dashboard',
    updateCouchpotato: 'Uppdatera Couchpotato',
    couchpotatoAccessToken: 'Access token för API/Websocket',
    setAccessToken: 'Ange access token',
    searchGroupPlaceholder: 'Sök grupp',
    githubAccessToken: 'GitHub, token',
    githubAccount: 'GitHub, användarnamn',
    setGithubAccount: 'Ange GitHub-användarnamn',
    couchpotatoRunning: 'Couchpotato körs',
    restart: 'Starta om',
    searchStream: 'Sök ström',
    restartBackend: 'Starta om API/WebSockets',
    chooseGroup: 'Välj grupp',
    value: 'Värde',
    rename: 'Byt namn',
    targetFilename: 'Namn på målfil',
    runCronJob: 'Kör Cron',
    restartCron: 'Starta om Cron',
    localResourcesNoConnection: 'Kan ej nå lokala resurser',
    installPlugin: 'Installera plugin',
    install: 'Installera',
    localResourcesHasConnection: 'Allt ser ok ut!',
    goToLocalResourceSettings: 'Gå in under inställningar och fixa',
    login: 'Logga in',
    logout: 'Logga ut',
    update: 'Uppdatera',
    updateBackend: 'Uppdatera backend',
    cronIsRunning: 'Cron körs',
    cronIsNotRunning: 'Cron körs inte',
    widgetLastRunNoProblem: 'Inga problem vid senaste körningen!',
    widgetLastRunProblem: 'Kunde inte hämta senaste körningen',
    widgetLastRunMissingEpg: 'Saknar EPG',
    widgetLastRunValidationErrors: 'Valideringsproblem',
    widgetLastRunMissingChanels: 'Saknade kanaler',
    version: 'Version',
    uninstall: 'Avinstallera',
    settings: 'Inställningar',
    pluginActivate: 'Aktivera',
    pluginInactivate: 'Inaktivera',
    active: 'Aktiv',
    format: 'Formatera',
    information: 'Info',
    plugin: 'Plugin'

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
