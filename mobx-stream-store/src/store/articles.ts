import {} from 'mobx';

export class Article {
  id: number;
  groupId: number;
  title: string;
  val: number;
  prev: number;
  constructor(id: number, groupId: number) {
    this.id = id;
    this.groupId = groupId;
    this.title = `article in ${groupId} with id ${id}`;

    this.val = Math.random();
    this.prev = Math.random();
  }
}

export const articleStore: Map<number, Article> = new Map();

export const actions = {
  fetch(groupId: number):void {
    for (let i = 0; i< 10; i++)
    articleStore.set(i + groupId * 100, new Article(i + groupId * 100, groupId));
  }
}

export const calcStat = (arts: Article[]) => {
  let total = 0;
  let change = 0;
  for (const art of arts) {
    total += art.val;
    change += art.prev - art.val; 
  }
  return {total, change};
}