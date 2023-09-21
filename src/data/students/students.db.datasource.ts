export class StudentsDataSource {
  students = [
    { id: 1, name: "Mariazinha" },
    { id: 2, name: "Joãozinho" },
    { id: 3, name: "Pedrinho" },
  ];
  constructor() {}

  getStudents() {
    return this.students;
  }
}
