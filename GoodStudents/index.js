
const getStudents = async () => {
    try {
        const r = await fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json");
        if (!r.ok) {
            console.log("No Success");
            return;
        }
        const d = await r.json();
        console.log("Great Success");
        getGrades(d);
    } catch (error) {
        console.error(error);
    }
}

getStudents()

const getGrades = array => {
    let above3 = array.filter(e => e.averageGrade > 3).map(e => `${e.firstName} ${e.lastName}`);
    console.log(above3)
    let avg5 = array.filter(e => e.averageGrade === 5).map(e => `${e.firstName} ${e.lastName}`);
    console.log(avg5)
    let skopjani = array.filter(e => e.age > 18 && e.city === "Skopje")
    console.log(skopjani)
    let femaleOver18 = array.filter(e => e.gender === "Female" && e.age > 24).map(e => e.averageGrade)
    console.log(femaleOver18)
    let maleBstudents = array.filter(e => e.firstName.charAt(0) === 'B' && e.averageGrade > 2)
    console.log(maleBstudents)
}