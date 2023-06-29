import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService<DataType> {
  private context: Array<DataType>;
  //private context: string[] = [];

  constructor() {
    this.context = [];
  }

  get(): DataType[] {
    return this.context;
  }
  create(name: DataType): DataType {
    this.context.push(name);
    return name;
  }
  edit(oldName: DataType, name: DataType): DataType {
    this.context = this.context.map((item) => {
      if (item === oldName) {
        item = name;
      }
      return item;
    });
    return name;
  }
  delete(name: DataType): boolean {
    this.context = this.context.filter((item) => {
      return item != name;
    });
    return true;
  }
}
