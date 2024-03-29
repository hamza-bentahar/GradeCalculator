const BASE_LETTER_GRADES = [
  {
    letter: 'A+',
    min: 97,
    max: null,
    gpa: 4.0
  },
  {
    letter: 'A',
    min: 93,
    max: 97,
    gpa: 4.0
  },
  {
    letter: 'A-',
    min: 90,
    max: 93,
    gpa: 3.7
  },
  {
    letter: 'B+',
    min: 87,
    max: 90,
    gpa: 3.3
  },
  {
    letter: 'B',
    min: 83,
    max: 87,
    gpa: 3.0
  },
  {
    letter: 'B-',
    min: 80,
    max: 83,
    gpa: 2.7
  },
  {
    letter: 'C+',
    min: 77,
    max: 80,
    gpa: 2.3
  },
  {
    letter: 'C',
    min: 73,
    max: 77,
    gpa: 2.0
  },
  {
    letter: 'C-',
    min: 70,
    max: 73,
    gpa: 1.7
  }, {
    letter: 'D+',
    min: 67,
    max: 70,
    gpa: 1.3
  },
  {
    letter: 'D',
    min: 60,
    max: 67,
    gpa: 1.0
  },
  {
    letter: 'F',
    min: null,
    max: 60,
    gpa: 0.0
  }
]
const BASE_ASSIGNMENTS_NUMBER = 5
const DEFAULT_ASSIGNMENT_VALUE = {
  name: '',
  grade: '',
  weight: ''
}

export {BASE_LETTER_GRADES, BASE_ASSIGNMENTS_NUMBER, DEFAULT_ASSIGNMENT_VALUE}
