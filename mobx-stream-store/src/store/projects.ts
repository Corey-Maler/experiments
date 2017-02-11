import {} from 'mobx';

export class Project {
  id: number;
  title: string;
  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

export const projectSore: Map<number, any> = new Map();

export const actions = {
  fetch():void {
    for (let i = 0; i< 10; i++)
    projectSore.set(i, new Project(i, `project ${i}`));
  }
}