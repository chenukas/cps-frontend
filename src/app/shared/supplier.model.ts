export class Supplier {
  private supId: string;
  private supName: string;
  private supLocation: string;
  private supEmail: string;
  private supTel: string;

  constructor(value) {
    this.supId = value.supId;
    this.supName = value.supName;
    this.supLocation = value.supLocation;
    this.supEmail = value.supEmail;
    this.supTel = value.supTel;
  }

  public get getSupId(): string {
    return this.supId;
  }

  public set setSupId(supId: string) {
    this.supId = supId;
  }

  public get getSupName(): string {
    return this.supName;
  }

  public set setSupName(supName: string) {
    this.supName = supName;
  }

  public get getSupLocation(): string {
    return this.supLocation;
  }

  public set setSupLocation(supLocation: string) {
    this.supLocation = supLocation;
  }

  public get getSupEmail(): string {
    return this.supEmail;
  }

  public set setSupEmail(supEmail: string) {
    this.supEmail = supEmail;
  }

  public get getSupTel(): string {
    return this.supTel;
  }

  public set setSupTel(supTel: string) {
    this.supTel = supTel;
  }
}
