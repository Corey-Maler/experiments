export class Group {
  id: number;
  title: string;
  projectId: number;

  constructor(id: number, projectId: number) {
    this.id = id;
    this.title = `group in projct ${projectId} with id "${id}"`;
    this.projectId = projectId;
  }
}

export const groupStore: Map<number, Group> = new Map();

export const actions = {
  fetch(projectId: number): void {
    for( let i = 1; i < 5; i++) {
      groupStore.set(i * projectId, new Group(i * projectId, projectId));
    }
  }
}