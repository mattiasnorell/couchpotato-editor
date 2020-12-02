export interface IArrayHelper {
    indexOf(source: any[], element: any): number;
    moveToIndex(source: any[], index: number, targetIndex: number): void;
}

export class ArrayHelper implements IArrayHelper {
    public indexOf(source: any, element: any): number {
        return Array.prototype.indexOf.call(source, element);
    }

    public moveToIndex(source: any[], index: number, targetIndex: number): void {
        source.splice(targetIndex, 0, source.splice(index, 1)[0]);
    }
}

const $arrayHelper: ArrayHelper = new ArrayHelper();
export { $arrayHelper };
