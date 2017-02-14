import { observable, computed } from 'mobx';

export enum State {
  pending,
  loading,
  done
}

export class Thread<T> {
  @observable public state: State;

  public updateReason: string;

  @observable private _value: T;

  constructor(obj?: T) {
    this.state = State.pending;
    this._value = obj;
  }

  private _oldValue: T;

  @computed public get value(): T {
    return this._value;
  }

  @computed public get oldValue(): T {
    return this._oldValue;
  }

  public set value(obj: T) {
    this._oldValue = this._value;
    this._value = obj;
  }
}