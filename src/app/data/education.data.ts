import type { Education } from '../models/education.model';

export const EDUCATIONS: Education[] = [
  {
    id: 'essex',
    degree: 'B.Sc.',
    field: 'Management Economics',
    institution: 'University of Essex',
    location: 'Colchester, UK',
    period: '2007 – 2010',
    grade: 'First Class Honours',
  },
  {
    id: 'unwe',
    degree: 'B.Sc.',
    field: 'International Relations',
    institution: 'UNWE',
    location: 'Sofia, Bulgaria',
    period: '2010 – 2012',
  },
  {
    id: 'haw',
    degree: 'B.Sc.',
    field: 'Information Engineering',
    institution: 'HAW Hamburg',
    location: 'Hamburg, Germany',
    period: '2013 – 2019',
  },
];
