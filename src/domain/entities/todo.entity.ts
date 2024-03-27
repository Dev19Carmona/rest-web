export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null,
    public createdAt?: Date,
    public uptatedAt?: Date
  ) {}
  get isCompleted() {
    return !!this.completedAt
  }
  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object
    if(!id)throw 'id required'
    if(!text)throw 'text required'
    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt)
      if(isNaN(newCompletedAt.getTime()))throw 'CompletedAt is not a valid Date'
    }
    return new TodoEntity(id, text, completedAt)
  }
}
