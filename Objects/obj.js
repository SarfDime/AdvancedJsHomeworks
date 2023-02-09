{   //////// EXER 1 ////////

    function Academy() {
        this.AcademyName = "";
        this.Students = [];
        this.Subjects = [];
        this.Start;
        this.End;
        this.NumberOfClasses = (Subjects.length + 1) * 10;
        this.PrintStudents = function () {
            this.Students.forEach(e => {
                console.log(`${e.FirstName} ${e.LastName}`);
            });
        };
        this.PrintSubjects = function () {
            this.Subjects.forEach(e => {
                console.log(e.Title);
            });
        };
    }

    function Subject() {
        this.Title = "";
        this.NumberOfClasses = 10;
        this.isElective = true;
        this.Academy = null;
        this.Students = [];
        this.OverrideClasses = function (num) {
            if (num > 3) {
                this.NumberOfClasses = num;
            } else {
                console.log("The number of classes can't be smaller than 3.");
            }
        };
    }

    function Student() {
        this.FirstName = "";
        this.LastName = "";
        this.Age = 0;
        this.CompletedSubjects = [];
        this.Academy = null;
        this.CurrentSubject = null;
        this.StartAcademy = function (academy) {
            this.Academy = academy;
        };
        this.StartSubject = function (subject) {
            if (this.Academy === null) {
                console.log("The student doesn't have an academy.");
                return;
            }
            if (!this.Academy.Subjects.includes(subject)) {
                console.log("The subject doesn't exist in the academy.");
                return;
            }
            this.CurrentSubject = subject;
        };
    }
}

{   //////// EXER 2 /////////

    function Academy(academyName, students, subjects, start, end) {
        this.AcademyName = academyName;
        this.Students = students;
        this.Subjects = subjects;
        this.Start = start;
        this.End = end;
        this.NumberOfClasses = (subjects.length + 1) * 10;
        this.PrintStudents = function () {
            this.Students.forEach(e => {
                console.log(`${e.FirstName} ${e.LastName}`);
            });
        };
        this.PrintSubjects = function () {
            this.Subjects.forEach(e => {
                console.log(e.Title);
            });
        };
    }

    function Subject(title, numberOfClasses, academy, isElective) {
        this.Title = title;
        this.NumberOfClasses = numberOfClasses;
        this.isElective = isElective;
        this.Academy = academy;
        this.Students = [];
        this.OverrideClasses = function (num) {
            if (num > 3) {
                this.NumberOfClasses = num;
            } else {
                console.log("The number of classes can't be smaller than 3.");
            }
        };
    }

    function Student(firstName, lastName, age) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Age = age;
        this.CompletedSubjects = [];
        this.Academy = null;
        this.CurrentSubject = null;
        this.StartAcademy = function (academy) {
            this.Academy = academy;
            academy.Students.push(this);
        };
        this.StartSubject = function (subject) {
            if (this.Academy === null) {
                console.log("The student doesn't have an academy.");
                return;
            }
            if (!this.Academy.Subjects.includes(subject)) {
                console.log("The subject doesn't exist in the academy.");
                return;
            }
            if (this.CurrentSubject !== null) {
                this.CompletedSubjects.push(this.CurrentSubject);
            }
            this.CurrentSubject = subject;
            subject.Students.push(this);
        };
    }

    let newAcademy = new Academy("Full-Stack", [], [], new Date("2022-10-15"), new Date("2023-10-15"));
    let newSubject = new Subject("JavaScript", 10, newAcademy, true);
    newAcademy.Subjects.push(newSubject);

    let newStudent = new Student("John", "Doe", 18, [], null, null);

    newStudent.StartAcademy(newAcademy);
    newStudent.StartSubject(newSubject);

    console.log(newAcademy)
}