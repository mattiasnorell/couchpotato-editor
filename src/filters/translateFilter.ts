import { $languageRepository } from '../services/repositories/languageRepository';

const TranslateFilter = (key: string) => {
    return $languageRepository.get(key);
}

const $translateFilter = TranslateFilter;
export default $translateFilter;