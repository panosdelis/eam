
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Topbar from './topbar';

const firebaseConfig = {
  apiKey: "AIzaSyA7gERAbafNYLIsLwsh52BBvDvkdlVdJzU",
  authDomain: "eamtest-31519.firebaseapp.com",
  projectId: "eamtest-31519",
  storageBucket: "eamtest-31519.appspot.com",
  messagingSenderId: "34767020876",
  appId: "1:34767020876:web:b6e8b718b40bdd35ed25e9"
};

const gridStyle = `
  .grade-form-container {
    margin: 20px auto;
    maxWidth: '800px';
    width: 80%;
  }

  .grade-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .grade-table th, .grade-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .grade-table th {
    background-color: #f2f2f2;
  }

  .button-container {
    margin-top: 20px;
    text-align: center;
  }
`;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const GradeDisplay = () => {
  const [enrollments, setEnrollments] = useState([]);
  const email = localStorage.getItem('email');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showOnlyHighGrades, setShowOnlyHighGrades] = useState(false);
  const [showOnlyLowGrades, setShowOnlyLowGrades] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const enrollmentsSnapshot = await getDocs(collection(db, 'enrollments'));
      const enrollmentsWithGrades = enrollments.filter((enrollment) => enrollment.grade !== -1);


      const enrollmentsData = enrollmentsSnapshot.docs.map((enrollmentDoc) => {
        return {
          id: enrollmentDoc.id, /* somehow it was missing id so we add it */
          ...enrollmentDoc.data(),
        };
      });

      console.log('Fetched Enrollments Data:', enrollmentsData);
      setEnrollments(enrollmentsData);
    };

    fetchData();
  }, []);

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const isMatchingYear = selectedYear === '' || enrollment.enrollment_year.toString() === selectedYear;
    const isMatchingSemester = selectedSemester === '' || enrollment.enrollment_semester.toString() === selectedSemester;
    const isHighGrade = showOnlyHighGrades ? enrollment.grade >= 5 : true;
    const isLowGrade = showOnlyLowGrades ? (enrollment.grade < 5 && enrollment.grade != -1) : true;
    const isNotGradeMinusOne = enrollment.grade !== -1;

    return enrollment.student_id === email && isMatchingYear && isMatchingSemester && isHighGrade && isLowGrade && isNotGradeMinusOne;
  });

  return (
    <div>
      <Topbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      }}>
        <style>{gridStyle}</style>
        <div className="grade-form-container">
          <h1>Προβολη Βαθμολογιών</h1>
          <div>
            <label>Επιλογή Έτους:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Όλα</option>
              {[...new Set(enrollments.map((enrollment) => enrollment.enrollment_year))]
                .sort()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Επιλογή Εξαμήνου:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Όλα</option>
              {[...new Set(enrollments.map((enrollment) => enrollment.enrollment_semester))]
                .sort()
                .map((semester) => (
                  <option key={semester} value={semester}>
                    {semester == 1 ? 'Χειμερινό' : semester == 0 ? 'Εαρινό' : ''}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Αποτέλεσμα:</label>
            <select
              value={showOnlyHighGrades ? 'success' : showOnlyLowGrades ? 'failed' : 'all'}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === 'success') {
                  setShowOnlyHighGrades(true);
                  setShowOnlyLowGrades(false);
                } else if (selectedValue === 'failed') {
                  setShowOnlyHighGrades(false);
                  setShowOnlyLowGrades(true);
                } else {
                  setShowOnlyHighGrades(false);
                  setShowOnlyLowGrades(false);
                }
              }}
            >
              <option value="all">Όλα</option>
              <option value="success">Επιτυχίες</option>
              <option value="failed">Αποτυχίες</option>
            </select>
          </div>
          <form>
            <table className="grade-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Semester</th>
                  <th>Year</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollmentsWithGrades) => (
                  <tr key={enrollmentsWithGrades.id}>
                    <td>{enrollmentsWithGrades.course_id}</td>
                    <td>{enrollmentsWithGrades.course_name}</td>
                    <td>{enrollmentsWithGrades.enrollment_semester == 1 ? 'Χειμερινό' : 'Εαρινό'}</td>
                    <td>{enrollmentsWithGrades.enrollment_year}</td>
                    {enrollmentsWithGrades.isTempGrade !== 1 ? <td>{enrollmentsWithGrades.grade}</td> : <td></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GradeDisplay;