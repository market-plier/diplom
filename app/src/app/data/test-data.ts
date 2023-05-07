export const people = [
  'Геннадій ОБОРСЬКИЙ',
  'Юрій СВІНАРЬОВ',
  'Вячеслав ШОБІК',
  'Василь КОЛЕСНІК',
  'Арутюн АГАДЖАНЯН',
  'Тетяна ПОБЕРЕЖНИК',
  'Світлана АНТОЩУК',
  'Михайло ЛОБАЧЕВ',
  'Світлана КОЛОТ',
  'Андрій БОЙКО',
  'Володимир БРЕМ',
  'Олександр БУТЕНКО',
  'Сергій ГУТИРЯ',
  'Алла ДЕНИСОВА',
  'Антон МАЗУРЕНКО',
  'Володимир СЕМЕНЮК',
  'Володимир ТОНКОНОГИЙ',
  'Олександр ТРОЯНСЬКИЙ',
  'Ігор ПРОКОПОВИЧ',
  'Світлана ФІЛИППОВА',
  'Анатолій ТКАЧЬОВ',
  'Олег ЧУЛКІН',
  'Марія ВОЙТОВЕЦЬКА',
  'Ігор В`ЮННИК',
  'Ганна ІСАКОВА',
  'Ілія  ЗВЕНИГОРОДСЬКИЙ',
  'Ольга ТРАПЕЗНИКОВА',
];

export const peopleData = people.map((person, index) => {
  return { id: index, fullName: person };
});
