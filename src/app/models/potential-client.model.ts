export class PotentialClient {
  constructor(
    public id: number,
    public name: string,
    public type: number,
    public countryName: string,
    public countryCode: string,
    public companyName: string,
    public lastChangeDate: Date,
    public creationDate: Date,
    public isDemo: boolean) {
  }
}

