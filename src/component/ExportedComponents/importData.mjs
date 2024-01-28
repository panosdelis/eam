import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';

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

const jsonData = JSON.parse(fs.readFileSync('courses.json', 'utf8'));

jsonData.semesters.forEach(async (semester) => {

  const semesterDocRef = doc(db, 'semesters', semester.semester.toString());


  await setDoc(semesterDocRef, {});


  semester.courses.forEach(async (course) => {

    const courseDocRef = doc(semesterDocRef, 'courses', course.code);


    await setDoc(courseDocRef, {
      code: course.code,
      ECTS: course.ECTS,
      subject: course.subject,
    });
  });
});

console.log('Data loaded successfully!');