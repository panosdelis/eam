
import React, { useEffect, useState } from 'react';
import Topbar from './topbar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import EnrollmentDisplay from './enrollmentsView';


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


const getUserData = async (email) => {
  try {
    const userDocRef = doc(db, 'users', email);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data();
    } else {
      console.error('User not found with the given email.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};


const CourseDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [selectedSemester, setSelectedSemester] = useState(1);

  const [enrollments, setEnrollments] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const enrollmentsSnapshot = await getDocs(collection(db, 'enrollments'));


      const enrollmentsData = enrollmentsSnapshot.docs.map((enrollmentDoc) => {
        return {
          id: enrollmentDoc.id,/*somehow it was missing id so we add it*/
          ...enrollmentDoc.data(),
        };
      });

      console.log('Fetched Enrollments Data:', enrollmentsData);
      setEnrollments(enrollmentsData);

      const semesterSnapshot = await getDocs(collection(db, 'semesters'));

      const promises = [];

      semesterSnapshot.forEach((semesterDoc) => {
        const semesterNumber = semesterDoc.id;
        const coursesPromise = getDocs(collection(semesterDoc.ref, 'courses'))
          .then((coursesSnapshot) => coursesSnapshot.docs.map((courseDoc) => courseDoc.data()));

        promises.push(coursesPromise.then((semesterCourses) => ({ semester: semesterNumber, courses: semesterCourses })));
      });

      const coursesData = await Promise.all(promises);
      setCourses(coursesData);
    };

    fetchData();
  }, [selectedSemester]);



  const handleCheckboxChange = (courseCode) => {
    setCheckedBoxes((prevCheckedBoxes) => ({
      ...prevCheckedBoxes,
      [courseCode]: !prevCheckedBoxes[courseCode],
    }));
  };

  const handleSubmit = async () => {
    try {
      const db = getFirestore();
      const email = localStorage.getItem('email');
      if (!email) {
        email = "unknown";
      }

    const userEnrollmentsSnapshot = await getDocs(collection(db, 'enrollments'));
    const userEnrollments = userEnrollmentsSnapshot.docs
      .filter(enrollmentDoc => enrollmentDoc.data().student_id === email && enrollmentDoc.data().isTempEnrollment === 1);

    const totalEnrollments = userEnrollments.length + Object.values(checkedBoxes).filter(value => value).length;

    const userDataFromFirestore = await getUserData(email);
    console.log('patatakia',userDataFromFirestore);

    if (totalEnrollments > 12 && userDataFromFirestore.semester <= 8 ) {
      alert('You cannot enroll in more than 12 courses.');
      return; // Exit
    }

    if (totalEnrollments > 16) {
      alert('You cannot enroll in more than 16 courses.');
      return; // Exit
    }

      for (const courseCode in checkedBoxes) {
        let i;
        if (checkedBoxes[courseCode]) {
          for (i = 1; i <= 8; i++) {

            const courseDocRef = doc(db, 'semesters', i.toString(), 'courses', courseCode);
            const courseDoc = await getDoc(courseDocRef);

            if (courseDoc.exists()) {
              const courseData = courseDoc.data();
              const { subject } = courseData;

              let semesterType = i % 2;

              await addDoc(collection(db, 'enrollments'), {
                student_id: email,
                course_id: courseCode,
                course_name: subject,
                enrollment_semester: `${semesterType.toString()}`, /* Winter semester==1, summer==0*/
                enrollment_year: new Date().getFullYear(),
                isTempEnrollment: 1, /* if oristikopoihmeno == 0 if 1 its temp */
                grade: -1, /* if grade == -1 not graded */
                isTempGrade: 1, /* if oristikopoihmeno == 0 if 1 its temp */
              });
            } else {

            }
          }
        }
      }


      setCheckedBoxes({});
      setSubmissionStatus('success');
      alert('Επιτυχής Δήλωση');
      window.location.reload()
    } catch (error) {
      console.error('Error submitting courses:', error);
      setSubmissionStatus('error');
    }
  };

  const handleCancel = () => {

    setCheckedBoxes({});
    console.log('Cancel clicked!');
  };

  const filteredEnrollments = enrollments.filter(enrollment => enrollment.student_id === email && enrollment.enrollment_year===new Date().getFullYear());


  return (
    <div>
      <Topbar />
      <EnrollmentDisplay />
      {(filteredEnrollments.length == 0 || enrollments.some(enrollment => enrollment.student_id === email && enrollment.isTempEnrollment == 1)) && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 >Δήλωση Μαθημάτων</h1>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            overflowY: 'auto',
            maxHeight: '600px',
            maxWidth: '1000px',
            border: '3px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
          }}>
            {courses.map((semesterData) => (
              <div key={semesterData.semester} style={{ margin: '10px' }}>
                <h2>{`Semester ${semesterData.semester}`}</h2>
                <ul>
                  {semesterData.courses.map((course) => (
                    <div key={course.code} style={{ width: '100%' }}>
                      <input
                        type="checkbox"
                        id={`checkbox_${course.code}`}
                        checked={checkedBoxes[course.code] || false}
                        onChange={() => handleCheckboxChange(course.code)}
                      />
                      <strong>{course.subject}</strong>
                      <span>{`${course.code}, ECTS: ${course.ECTS}`}</span>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={handleSubmit} style={{ padding: '10px', fontSize: '1rem', fontWeight: 'bold', marginRight: '30px' }}>Submit</button>
            <button onClick={handleCancel} style={{ padding: '10px', fontSize: '1rem', fontWeight: 'bold', marginRight: '30px' }} >Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDisplay;