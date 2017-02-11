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