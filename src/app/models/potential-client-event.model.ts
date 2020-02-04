export class PotClientEvent {
  constructor(
    public eventAction: number,
    public eventsResult: number,
    public manager: number,
    public comment: string,
    public date: Date,
    public notificationDate: Date) {
  }
}
