import { ObservableMap } from 'mobx';
export const getAll = (source: Map<any, any>): any[] => {
  return [...source.values()];
}

export const getByProp = (prop: string, source: Map<any, any>, filter: number[]): any[] => {
  const result: any[] = [];
  for (const [ind, b] of source) {
    if (filter.includes(b[prop])) {
      result.push(b);
    }
  }

  return result;
}

export const getByPropExt = (prop: string, source: ObservableMap<any>, filter: number[]): Knot => {
  const result = new Knot();
  for (const [ind, b] of source) {

    if (filter.includes(b.value[prop])) {
      result.values.push(b);
      result.state = result.state | b.state;
    }
  }

  return result;
}

export class Knot {
  state: number;
  values: any[] = [];
  event: string;

  reduce(cb, acc): Knot {
    const result = new Knot;
    result.state = this.state;
    result.event = this.event;

    let val = acc;
    for (const a of this.values) {
      val = cb(a.value, val);
    }

    result.values = [val];

    return result;
  }
}