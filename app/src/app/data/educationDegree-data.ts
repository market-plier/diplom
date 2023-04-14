import { IEducationDegree } from '../api/contracts/edcuation-degree';

export const EducationDegreeData: IEducationDegree[] = [
  {
    educationDegree: 'БАК',
    educationDegreeFull: 'Бакалавр',
    educationDegreeText_r: 'першого (бакалаврського) рівня вищої освіти',
    type: 'ОП',
    educationDegreeText: 'перший (бакалаврський) рівень вищої освіти',
  },
  {
    educationDegree: 'МАГ(1.4)',
    educationDegreeFull: 'Магістр',
    educationDegreeText_r: 'другого (магістерського) рівня вищої освіти',
    type: 'ОП',
    educationDegreeText: 'другий (магістерський) рівень вищої освіти',
  },
  {
    educationDegree: 'МАГ(1.9)',
    educationDegreeFull: 'Магістр',
    educationDegreeText_r: 'другого (магістерського) рівня вищої освіти',
    type: 'ОН',
    educationDegreeText: 'другий (магістерський) рівень вищої освіти',
  },
  {
    educationDegree: 'Phd',
    educationDegreeFull: 'доктор філософії',
    educationDegreeText_r:
      'третього освітньо-наукового ступеня вищої освіти доктор філософії',
    type: 'ОН',
    educationDegreeText: 'третій освітньо-науковий ступінь вищої освіти',
  },
  {
    educationDegree: 'БАК&МАГ',
    educationDegreeFull: 'Бакалавр або Магістр',
    educationDegreeText_r:
      'першого (бакалаврського) або другого (магістерського) рівнів вищої освіти',
    type: '',
    educationDegreeText:
      'перший (бакалаврський) або другий (магістерський) рівні вищої освіти',
  },
];
