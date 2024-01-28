
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc ,updateDoc , deleteDoc} from 'firebase/firestore';
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


const EnrollmentsHistory = () => {
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

  const filteredEnrollments = selectedYear !== '' ? enrollments.filter((enrollment) => {
    const isMatchingYear = enrollment.enrollment_year.toString() === selectedYear;
    const isMatchingSemester = selectedSemester === '' || enrollment.enrollment_semester.toString() === selectedSemester;
    const isHighGrade = showOnlyHighGrades ? enrollment.grade >= 5 : true;
    const isLowGrade = showOnlyLowGrades ? (enrollment.grade < 5 && enrollment.grade !== -1) : true;
    const isNotGradeMinusOne = enrollment.grade !== -1;
  
    return enrollment.student_id === email && isMatchingYear && isMatchingSemester && isHighGrade && isLowGrade && isNotGradeMinusOne;
  }) : [];

  return (
    <div>
    <Topbar/>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    }}>
      <style>{gridStyle}</style>
      <div className="grade-form-container">
        <h1>Προβολη Ιστορικού Δηλώσεων</h1>
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
        <form>
        {selectedYear !== '' && filteredEnrollments.length > 0 ? (
  
  <table className="grade-table">
    <thead>
      <tr>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Semester</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      {filteredEnrollments.map((enrollment) => (
        <tr key={enrollment.id}>
          <td>{enrollment.course_id}</td>
          <td>{enrollment.course_name}</td>
          <td>{enrollment.enrollment_semester == 1 ? 'Χειμερινό' : 'Εαρινό'}</td>
          <td>{enrollment.enrollment_year}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  
  <p>Επιλέξτε Έτος και Εξάμηνο Δήλωσης</p>
)}
        </form>
      </div>
    </div>
    </div>
  );
};

export default EnrollmentsHistory;