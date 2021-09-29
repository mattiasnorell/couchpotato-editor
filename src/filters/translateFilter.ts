import { ILanguageRepository } from '_services/repositories/languageRepository';
import { container, cid } from 'inversify-props';

const TranslateFilter = (key: string) => {
    let languageRepository = container.get<ILanguageRepository>(cid.ILanguageRepository);
    return languageRepository.get(key);
}

const $translateFilter = TranslateFilter;
export default $translateFilter;