export interface IDateHelper {
  addDays(input: Date, days: number): Date;
}

export class DateHelper implements IDateHelper {
  public addDays(input: Date, days: number): Date {
    const date = new Date(input);
    date.setDate(date.getDate() + days);

    return date;
  }
}

const $dateHelper: DateHelper = new DateHelper();
export { $dateHelper };
