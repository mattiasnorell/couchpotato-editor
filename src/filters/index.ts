import $dateTimeFilter from './dateTimeFilter';
import $translateFilter from './translateFilter';

const $filters = {
    dateTime(input: Date) {
        return $dateTimeFilter(input);
    },

    translate(text: string) {
        return $translateFilter(text);
    }
};
export { $filters };
