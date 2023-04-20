import { IEducationDegree } from '../api/contracts/edcuation-degree';

export const EducationDegreeData: IEducationDegree[] = [
  {
    educationDegree: 'БАК',
    educationDegreeFull: 'Бакалавр',
    educationDegreeTextGenititve: 'першого (бакалаврського) рівня вищої освіти',
    type: 'ОП',
    educationDegreeText: 'перший (бакалаврський) рівень вищої освіти',
  },
  {
    educationDegree: 'МАГ(1.4)',
    educationDegreeFull: 'Магістр',
    educationDegreeTextGenititve: 'другого (магістерського) рівня вищої освіти',
    type: 'ОП',
    educationDegreeText: 'другий (магістерський) рівень вищої освіти',
  },
  {
    educationDegree: 'МАГ(1.9)',
    educationDegreeFull: 'Магістр',
    educationDegreeTextGenititve: 'другого (магістерського) рівня вищої освіти',
    type: 'ОН',
    educationDegreeText: 'другий (магістерський) рівень вищої освіти',
  },
  {
    educationDegree: 'Phd',
    educationDegreeFull: 'доктор філософії',
    educationDegreeTextGenititve:
      'третього освітньо-наукового ступеня вищої освіти доктор філософії',
    type: 'ОН',
    educationDegreeText: 'третій освітньо-науковий ступінь вищої освіти',
  },
  {
    educationDegree: 'БАК&МАГ',
    educationDegreeFull: 'Бакалавр або Магістр',
    educationDegreeTextGenititve:
      'першого (бакалаврського) або другого (магістерського) рівнів вищої освіти',
    type: '',
    educationDegreeText:
      'перший (бакалаврський) або другий (магістерський) рівні вищої освіти',
  },
];
