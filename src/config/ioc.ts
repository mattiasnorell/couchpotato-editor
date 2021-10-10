import { container } from 'inversify-props';
import { LanguageRepository, ILanguageRepository } from '_services/repositories/languageRepository';
import { IArrayHelper, ArrayHelper } from "_services/helpers/arrayHelper";
import { IDateHelper, DateHelper } from "_services/helpers/dateHelper";
import { GuidHelper, IGuidHelper } from "_services/helpers/guidHelper";
import { IMarkdownHelper, MarkdownHelper } from "_services/helpers/markdownHelper";
import { IModalHelper, ModalHelper } from "_services/helpers/modalHelper";
import { IUrlHelper, UrlHelper } from "_services/helpers/urlHelper";
import { IPlaylistParser, PlaylistParser } from "_services/parsers/playlistParser";
import { ILogProvider, LogProvider } from "_services/providers/logProvider";
import { IGitHubProvider, GitHubProvider } from "_services/providers/githubProvider";
import { ICouchpotatoProvider, CouchpotatoProvider } from "_services/providers/couchpotatoProvider";
import { IConfigurationProvider, ConfigurationProvider } from "_services/providers/configurationProvider";
import { IAuthProvider, AuthProvider } from "_services/providers/authProvider";
import { ICouchpotatoConnector, CouchpotatoConnector } from "_services/connectors/couchpotatoConnector";
import { ICouchpotatoPluginConnector, CouchpotatoPluginConnector } from "_services/connectors/couchpotatoPluginConnector";
import { ICouchpotatoWebsocketConnector, CouchpotatoWebsocketConnector } from "_services/connectors/couchpotatoWebsocketConnector";
import { ICronConnector, CronConnector } from "_services/connectors/cronConnector";
import { IPlaylistRepository, PlaylistRepository } from '_services/repositories/playlistRepository';
import { DownloadHelper, IDownloadHelper } from '_services/helpers/downloadHelper';
import { ILocalStorageHelper, LocalStorageHelper } from '_services/helpers/localStorageHelper';

export default function buildContainer(): void {

    container.addSingleton<ILanguageRepository>(LanguageRepository);
    container.addSingleton<IDownloadHelper>(DownloadHelper);

    container.addTransient<IArrayHelper>(ArrayHelper);
    container.addTransient<IDateHelper>(DateHelper);
    container.addTransient<IGuidHelper>(GuidHelper);
    container.addTransient<IMarkdownHelper>(MarkdownHelper);
    container.addTransient<IModalHelper>(ModalHelper);
    container.addTransient<IUrlHelper>(UrlHelper);
    container.addTransient<ILocalStorageHelper>(LocalStorageHelper);
    container.addTransient<IPlaylistParser>(PlaylistParser);
    container.addTransient<ILogProvider>(LogProvider);
    container.addTransient<IGitHubProvider>(GitHubProvider);
    container.addTransient<ICouchpotatoProvider>(CouchpotatoProvider);
    container.addTransient<IConfigurationProvider>(ConfigurationProvider);
    container.addTransient<IAuthProvider>(AuthProvider);
    container.addTransient<ICouchpotatoConnector>(CouchpotatoConnector);
    container.addTransient<ICouchpotatoPluginConnector>(CouchpotatoPluginConnector);
    container.addTransient<ICouchpotatoWebsocketConnector>(CouchpotatoWebsocketConnector);
    container.addTransient<IPlaylistRepository>(PlaylistRepository);
    container.addTransient<ICronConnector>(CronConnector);
}