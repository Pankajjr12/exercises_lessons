const students = require("./data/students");

function filterStudents(students, search, grade, status) {
  search = search.toLowerCase().trim();

  const filteredStudents = students.filter((student) => {
    const nameMatch = student.name
      .toLowerCase()
      .includes((search || "").toLowerCase());

    const gradeMatch = grade === "All" || student.grade === grade;

    const statusMatch = status === "All" || student.status === status;

    return nameMatch && gradeMatch && statusMatch;
  });

  return filteredStudents
}

const result = filterStudents(
    students,
    "",
    "B",
    "Inactive"
);

// Display result
console.log("Filtered Students:");
console.log(result);
