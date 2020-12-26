import $translateFilter from './translateFilter';

const $filters = {
    install(Vue: any, options: any) {
        Vue.filter('translate', (text: string) => {
            return $translateFilter(text);
        });
    }
};
export { $filters };
