export interface IStaff {
  subdivision: string;
  position: string;
  positionGenitive: string;
  fullName: string;
  fullNameGenitive: string;
}

export class Staff implements IStaff {
  subdivision = '';
  position = '';
  positionGenitive = '';
  fullName = '';
  fullNameGenitive = '';
}
