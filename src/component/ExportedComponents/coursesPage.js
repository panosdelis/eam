
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyA7gERAbafNYLIsLwsh52BBvDvkdlVdJzU",
  authDomain: "eamtest-31519.firebaseapp.com",
  projectId: "eamtest-31519",
  storageBucket: "eamtest-31519.appspot.com",
  messagingSenderId: "34767020876",
  appId: "1:34767020876:web:b6e8b718b40bdd35ed25e9"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function createCourseElement(courseData) {
  const courseDiv = document.createElement('div');
  courseDiv.className = 'course';

  const strongElement = document.createElement('strong');
  strongElement.textContent = courseData.subject;

  const codeElement = document.createElement('span');
  codeElement.textContent = `${courseData.code}, ECTS: ${courseData.ECTS}`;

  courseDiv.appendChild(strongElement);
  courseDiv.appendChild(document.createTextNode(' - '));
  courseDiv.appendChild(codeElement);

  return courseDiv;
}

function createSemesterElement(semesterNumber, courses) {
  const semesterDiv = document.createElement('div');
  semesterDiv.className = 'semester';

  const h2Element = document.createElement('h2');
  h2Element.textContent = `Semester ${semesterNumber}`;
  semesterDiv.appendChild(h2Element);

  courses.forEach(courseData => {
    const courseElement = createCourseElement(courseData);
    semesterDiv.appendChild(courseElement);
  });

  return semesterDiv;
}

async function displayCourses() {
  try {
    const coursesContainer = document.getElementById('courses-container');


    const semesterSnapshot = await getDocs(collection(db, 'semesters'));
    semesterSnapshot.forEach(async (semesterDoc) => {
      const semesterNumber = semesterDoc.id;


      const coursesSnapshot = await getDocs(collection(semesterDoc.ref, 'courses'));
      const coursesData = coursesSnapshot.docs.map(courseDoc => courseDoc.data());


      const semesterElement = createSemesterElement(semesterNumber, coursesData);
      coursesContainer.appendChild(semesterElement);
    });
  } catch (error) {
    console.error('Error fetching and displaying courses:', error);
  }
}

export default displayCourses;