import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import './index.css';
import Topbar from '../ExportedComponents/topbar';



const GradeForm = ({ db }) => {

  const gradeOptions = Array.from({ length: 21 }, (_, index) => (index / 2).toFixed(1));


  const [students, setStudents] = useState([]);


  const [courses, setCourses] = useState([]);


  const [selectedCourse, setSelectedCourse] = useState('');


  const [grades, setGrades] = useState([]);


  useEffect(() => {

























    const fetchCoursesAndStudents = async () => {
      try {

        const email = localStorage.getItem('email');

        if (email) {

          const usersCollection = collection(db, 'users');
          const userDocRef = doc(usersCollection, email);

          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();


            const userCourses = userData.courses || [];


            const matchingCourses = userCourses.slice(1);

            setCourses(matchingCourses);


            fetchStudents(email, matchingCourses);
          } else {
            console.error(`User document with email ${email} not found.`);
          }
        } else {
          console.error('Email not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchStudents = async (professorEmail, courses) => {
      if (selectedCourse) {

        const enrollmentsCollection = collection(db, 'enrollments');

        try {
          const enrollmentsSnapshot = await getDocs(enrollmentsCollection);
          const studentsData = enrollmentsSnapshot.docs
            .filter((doc) => doc.data().course_name === selectedCourse)
            .map((doc) => ({
              docId: doc.id,
              studentName: doc.data().student_id,
              grade: doc.data().grade || '',
              isTempGrade: doc.data().isTempGrade,
            }));
          setStudents(studentsData);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }
    };

    fetchCoursesAndStudents();
  }, [db, selectedCourse]);



  const handleGradeChange = (docId, newGrade) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (student.docId === docId) {
          return {
            ...student,
            grade: newGrade,
          };
        }
        return student;
      });
    });

    setGrades((prevGrades) => {
      const existingGradeIndex = prevGrades.findIndex((grade) => grade.docId === docId);

      if (existingGradeIndex !== -1) {

        const updatedGrades = [...prevGrades];
        updatedGrades[existingGradeIndex].grade = newGrade;
        return updatedGrades;
      } else {

        return [
          ...prevGrades,
          {
            docId: docId,
            grade: newGrade,
          },
        ];
      }
    });
  };


  const submitGrades = async () => {
    try {

      for (const gradeInfo of grades) {
        const { docId, grade } = gradeInfo;


        const enrollmentsDocRef = doc(collection(db, 'enrollments'), docId);
        await updateDoc(enrollmentsDocRef, { grade });

        console.log(`Grade submitted for document with ID ${docId}: ${grade}`);
      }


      setGrades([]);
      window.location.reload()
    } catch (error) {
      console.error('Error submitting grades:', error);
    }
  };


  const handleTempGradeUpdate = async () => {
    try {

      if (!selectedCourse) {
        console.error('No course selected.');
        return;
      }


      const enrollmentsCollection = collection(db, 'enrollments');
      const enrollmentsSnapshot = await getDocs(enrollmentsCollection);
      const enrollmentsToUpdate = enrollmentsSnapshot.docs
        .filter((doc) => doc.data().course_name === selectedCourse)
        .map((doc) => doc.ref);
      console.log(selectedCourse);

      const updatePromises = enrollmentsToUpdate.map(async (enrollmentRef) => {
        await updateDoc(enrollmentRef, { isTempGrade: 0 });
      });


      await Promise.all(updatePromises);

      console.log('isTempGrade updated successfully.');
      window.location.reload()
    } catch (error) {
      console.error('Error updating isTempGrade:', error);
    }
  };

  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div className="grade-form-container">
        <h2>Grade Entry Form</h2>
        <form>
          <table className="grade-table">
            <thead>
              <tr>
                <th>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedCourse && students.length > 0 ? (
                students.map((student) => {
                  const studentGrade = student.grade || '';
                  const isTempGradeZero = student.isTempGrade === 0;

                  return (
                    <tr key={student.docId}>
                      <td>{student.studentName}</td>
                      <td>
                        {isTempGradeZero ? (

                          <span>{studentGrade}</span>
                        ) : (

                          <select
                            value={studentGrade}
                            onChange={(e) => handleGradeChange(student.docId, e.target.value)}
                          >
                            <option value="">Select Grade</option>
                            {gradeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="2">
                    {selectedCourse
                      ? 'No students found for the selected course.'
                      : 'Please select a course to view students.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="button-container">
            <button type="button" className='button_style' onClick={submitGrades}>
              Submit Grades
            </button>

            {/* New button for updating isTempGrade */}
            <button type="button" className='button_style' onClick={handleTempGradeUpdate}>
              Finalize Grades
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GradeForm;