import { ObservableMap } from 'mobx';

import { Thread, State } from './thread';

import { Knot } from '../tools';

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

export const articleStore: ObservableMap<Thread<Article>> = new ObservableMap<Thread<Article>>();

export const actions = {
  fetch(groupId: number):void {
    for (let i = 0; i< 10; i++) {
      const id = i + groupId * 100;
      const a = new Thread<Article>(new Article(id, groupId));
      a.state = State.loading;
      articleStore.set((i + groupId * 100).toString(), a);
      setTimeout(() => {
        const val = articleStore.get(id.toString());
        val.state = State.done;
        val.value = new Article(id, groupId);
      }, 5000 * Math.random());
  }
  }
}


export const calcStat = (art: Article, acc: {total: number, change: number}) => {
  return {total: acc.total + art.val, change: acc.change + art.prev};
}