import { injectable } from 'inversify-props';

export interface IArrayHelper {
    indexOf<T>(source: T, element: any): number;
    moveToIndex(source: any[], index: number, targetIndex: number): void;
    removeAtIndex<T>(source: T[], index: number): any;
}

@injectable()
export class ArrayHelper implements IArrayHelper {
    public indexOf<T>(source: T, element: any): number {
        return Array.prototype.indexOf.call(source, element);
    }

    public moveToIndex<T>(source: T[], index: number, targetIndex: number): void {
        source.splice(targetIndex, 0, source.splice(index, 1)[0]);
    }

    public removeAtIndex<T>(source: T[], index: number): any {
        source.splice(index, 1);
    }
}
