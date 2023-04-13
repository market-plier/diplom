import { Agenda } from './agenda';

export class TextBuilder<T> {
  protected data: T;
  constructor(data: T) {
    this.data = data;
  }

  protected getText(): string {
    return '';
  }
}

export class AgendaBuilder extends TextBuilder<Agenda> {
  protected override getText(): string {
    return this.data.part1;
  }
}
