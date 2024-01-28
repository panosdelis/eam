
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


const EnrollmentDisplay = () => {
  const [enrollments, setEnrollments] = useState([]);
  const email = localStorage.getItem('email');

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

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
    };

    fetchData();
  }, []);

  const handleFinalization = async () => {
    try {
      console.log('Enrollments before finalization:', enrollments);
      const db = getFirestore();

      if (!enrollments || enrollments.length === 0) {
        console.error('Enrollments array is empty or undefined.');
        return;
      }

      for (const enrollment of enrollments) {
        console.log('enrollment in loop:', enrollment);
        console.log('enrollment.id in loop:', enrollment.id);

        if (enrollment.student_id === email) {

          await updateDoc(doc(db, 'enrollments', enrollment.id), {
            isTempEnrollment: 0,
          });
        }
      }

      alert('Οριστικοποιήθηκε');
      window.location.reload()

      console.log('Enrollments after finalization:', enrollments);
    } catch (error) {
      console.error('Error during finalization:', error);
    }
  };

  const handleCancel = async () => {
    try {
      if (!selectedEnrollment) {

        alert('Please select an enrollment to cancel.');
        return;
      }
      const db = getFirestore();
      await deleteDoc(doc(db, 'enrollments', selectedEnrollment.id));
      console.log('Notification permission granted. Showing success notification.');
      new Notification('Enrollment canceled successfully');
      alert('Η εγγραφή ακυρώθηκε');
      window.location.reload()

      console.log('Enrollments after cancellation:', enrollments);
    } catch (error) {
      console.error('Error during cancellation:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    }}>
      <style>{gridStyle}</style>
      <div className="grade-form-container">
        <h1>Προβολη Τρέχουσας Δήλωσης</h1>
        <form>
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
              {enrollments.map((enrollment) =>
              (enrollment.student_id === email && enrollment.enrollment_year == new Date().getFullYear() ? (
                <tr key={enrollment.id}>
                  <td>{enrollment.course_id}</td>
                  <td>{enrollment.course_name}</td>
                  <td>{enrollment.enrollment_semester == 1 ? 'Χειμερινό' : 'Εαρινό'}</td>
                  <td>{enrollment.enrollment_year}</td>
                </tr>
              ) : null))}
            </tbody>
          </table>
        </form>
      </div>
      {/*&& enrollment.enrollment_year == 2024*/}
      <div style={{ display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', justifyContent: 'center', marginTop: '20px' }}>
        {enrollments.some(enrollment => enrollment.student_id === email && enrollment.isTempEnrollment == 1) && (
          <>
            <button onClick={() => { handleFinalization(); }} style={{ padding: '10px', fontSize: '1rem', fontWeight: 'bold', marginRight: '30px' }}>Οριστικοποίηση</button>
            {/* Native dropdown for cancellation */}
            <select
              value={selectedEnrollment ? selectedEnrollment.id : ''}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selected = enrollments.find(enrollment => enrollment.id === selectedId);
                setSelectedEnrollment(selected);
              }}
            >
              <option value="" disabled>Επέλεξε μάθημα να διαγραφεί απ' τη δήλωση.</option>
              {enrollments
                .filter(enrollment => enrollment.student_id === email && enrollment.isTempEnrollment == 1)
                .map(enrollment => (
                  <option key={enrollment.id} value={enrollment.id}>
                    {enrollment.course_name}
                  </option>
                ))}
            </select>
            <button onClick={() => { handleCancel(); }} style={{ padding: '10px', fontSize: '1rem', fontWeight: 'bold', marginRight: '30px' }}>Διαγραφή</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollmentDisplay;