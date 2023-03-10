{   ///////// HOMEWORK 1 /////////

    class Academy {
        constructor(academyName, students, subjects, start, end) {
            this.AcademyName = academyName;
            this.Students = students;
            this.Subjects = subjects;
            this.Start = start;
            this.End = end;
            this.NumberOfClasses = (subjects.length + 1) * 10;
        }
        printStudents() {
            this.Students.forEach(e => {
                console.log(`${e.FirstName} ${e.LastName}`);
            });
        };
        printSubjects() {
            this.Subjects.forEach(e => {
                console.log(e.Title);
            });
        };
    }

    class Subject {
        constructor(title, numberOfClasses, academy, isElective) {
            this.Title = title;
            this.NumberOfClasses = numberOfClasses;
            this.isElective = isElective;
            this.Academy = academy;
            this.Students = [];
        }
        overrideClasses(num) {
            if (num > 3) {
                this.NumberOfClasses = num;
            } else {
                console.log("The number of classes can't be smaller than 3.");
            }
        };
    }

    class Student {
        constructor(firstName, lastName, age) {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Age = age;
            this.CompletedSubjects = [];
            this.Academy = null;
            this.CurrentSubject = newSubject;
        }
        startAcademy(academy) {
            this.Academy = academy;
            academy.Students.push(this);
        };
        startSubject(obj) {
            if (this.Academy === null) {
                console.log("The student doesn't have an academy.");
                return;
            }
            if (!this.Academy.Subjects.includes(obj)) {
                console.log("The subject doesn't exist in the academy.");
                return;
            }
            if (this.CurrentSubject !== null) {
                this.CompletedSubjects.push(this.CurrentSubject);
            }
            this.CurrentSubject = obj;
            obj.Students.push(this);
        };
    }

    let newAcademy = new Academy("Full-Stack", [], [], new Date("2022-10-15"), new Date("2023-10-15"));
    let newSubject = new Subject("JavaScript", 10, newAcademy, true);

    newAcademy.Subjects.push(newSubject);

    let newStudent = new Student("Dime", "Dimeski", 20);

    newStudent.startAcademy(newAcademy);
    newStudent.startSubject(newSubject);
    newSubject.overrideClasses(2)
    newAcademy.printStudents()
    newAcademy.printSubjects()

    console.log(newAcademy)
}

{   ////////// HOMEWORK 2 ///////////

    let academies = ["CODING", "NETWORKING", "DESIGN"]

    class Person {
        static people = []
        constructor(fn, ln, age) {
            this.firstName = fn;
            this.lastName = ln;
            this.age = age;
            this.people = []
            Person.people.push(this);
        }
        getFullName() {
            return `${this.firstName} ${this.lastName}`
        }
    }

    class Student extends Person {
        static id = 0;
        constructor(fn, ln, age) {
            super(fn, ln, age)
            this.academyName = "SEDC"
            Student.id++
            this.id = Student.id
        }
        study() {
            return `${this.firstName} is studying in ${this.academyName}, their Student ID is #${this.id}`
        }
        getAcademy() {
            return `${this.getFullName()} from ${this.academyName}`
        }
    }

    const studentOne = new Student("Dime", "Dimeski", 20)
    console.log(studentOne.getFullName())
    console.log(studentOne.getAcademy())
    console.log(studentOne.study())

    const studentTwo = new Student("Emid", "Iksemid", 21)
    console.log(studentTwo.getFullName())
    console.log(studentTwo.getAcademy())
    console.log(studentTwo.study())

    class Design extends Student {
        constructor(fn, ln, age, som) {
            super(fn, ln, age)
            this.academyName = academies[2]
            this.isStudentOfTheMonth = som
        }
        attendAdobeExam() {
            return `${this.firstName} is doing an adobe exam!`
        }
    }

    const designStudent = new Design("Jimi", "Hendrix", 34, true)
    console.log(designStudent.getFullName())
    console.log(designStudent.getAcademy())
    console.log(designStudent.study())
    console.log(designStudent.attendAdobeExam())

    class Code extends Student {
        constructor(fn, ln, age) {
            super(fn, ln, age)
            this.academyName = academies[0]
            this.hasIndividualProject = null
            this.hasGroupProject = null
        }
        doProject(type) {
            if (type !== "group") {
                this.hasIndividualProject = true
                this.hasGroupProject = false
                return `${this.getFullName()} is doing an Individual project.`
            }
            this.hasGroupProject = true
            this.hasIndividualProject = false
            return `${this.getFullName()} is a part of a Group project.`
        }
    }

    const codeStudent = new Code("Mos", "Def", 46)
    console.log(codeStudent.getFullName())
    console.log(codeStudent.getAcademy())
    console.log(codeStudent.study())
    console.log(codeStudent.doProject("ind"))

    class Network extends Student {
        constructor(fn, ln, age, aPart) {
            super(fn, ln, age)
            this.academyName = academies[1]
            this.academyPart = aPart
        }
        attendCiscoExam() {
            return `The student ${this.firstName} is doing a cisco exam.`
        }
    }

    const networkStudent = new Network("Nas", "Raekwon", 18, 3)
    console.log(networkStudent.getFullName())
    console.log(networkStudent.getAcademy())
    console.log(networkStudent.study())
    console.log(networkStudent.attendCiscoExam())

    console.log(Person.people)
}

{  ///////// HOMEWORK 3 //////////

    const foodChain = ["carnivore", "herbivore", "omnivore"]

    let human = {
        name: "Mowgli",
        age: 6
    }

    class Animal {
        constructor(name, type, age, size) {
            this.name = name;
            this.type = type;
            this.age = age;
            this.size = size;
            this.isEaten = false;
        }

        eat(obj) {
            if (obj instanceof Animal) {
                if (this.type === "herbivore") {
                    return `${this.name} is a herbivore and does not eat other animals.`
                }
                if (this.size > obj.size * 2) {
                    obj.isEaten = true;
                    return `${this.name} ate ${obj.name}.`
                }
                return `${this.name} tried to eat ${obj.name} but he was too large.`
            }
            return `${this.name} is eating ${obj.name}.`
        }
    }

    const panther = new Animal("Bagheera", foodChain[0], 5, 3,)
    const tiger = new Animal("Shere Khan", foodChain[0], 7, 5)
    const snake = new Animal("Kaa", foodChain[0], 6, 2)
    const bear = new Animal("Baloo", foodChain[2], 7, 7)

    console.log(bear.eat(snake))
    console.log(tiger.eat(panther))
    console.log(tiger.eat(human))
}