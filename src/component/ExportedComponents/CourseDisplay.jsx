

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Topbar from './topbar';

const CourseDisplay = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
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
  }, []);

  return (
    <div>
      <Topbar />
      <div style={{ textAlign: 'center' }}>
        {courses.map((semesterData) => (
          <div key={semesterData.semester} >
            <h2>{`Semester ${semesterData.semester}`}</h2>
            <ul>
              {semesterData.courses.map((course) => (
                <div key={course.code}>{`${course.subject} - ${course.code}, ECTS: ${course.ECTS}`}</div>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDisplay;