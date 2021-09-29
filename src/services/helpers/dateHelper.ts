import { injectable } from "inversify-props";

export interface IDateHelper {
  addDays(input: Date, days: number): Date;
}

@injectable()
export class DateHelper implements IDateHelper {
  public addDays(input: Date, days: number): Date {
    const date = new Date(input);
    date.setDate(date.getDate() + days);

    return date;
  }
}

