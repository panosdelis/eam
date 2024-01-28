import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { firebaseConfig } from './config/firebase';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import Register from './component/Register';
import Login from './component/Login';
import Courses from './component/Courses';
import TeachersMenu from './component/ExportedComponents/TeachersMenu'
import User from './component/ExportedComponents/User'
import StudentsMenu from './component/ExportedComponents/StudentsMenu'
import SecretaryMenu from './component/ExportedComponents/SecretaryMenu'
import SubjectDeclaration from './component/ExportedComponents/SubjectsDeclaration'
import CoursesPage from './component/ExportedComponents/CourseDisplay'
import GradeDisplay from './component/ExportedComponents/GradeDisplay'
import EnrollmentsHistory from './component/ExportedComponents/EnrollmentsHistory'
import StudentsInfo from './component/ExportedComponents/StudentsInfo'
import TeachersInfo from './component/ExportedComponents/TeachersInfo'
import GradeForm from './component/TeacherGrading/Index'
import withAuthorization from './component/withAuthorization/withAuthorization'
import CertificateApplication from './component/StudentCertificate'


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}

const Unauthorized = () => {
  return (
    <div>
      <h2>Unauthorized Access</h2>
      <p>You need to log in to access this page.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

const AuthorizedTeachersMenu = withAuthorization(TeachersMenu, 'teacher', 'role');
const AuthorizedStudentsMenu = withAuthorization(StudentsMenu, 'student', 'role');
const AuthorizedSubjectDeclaration = withAuthorization(SubjectDeclaration, 'student', 'role');

const AuthorizedGradeDisplay = withAuthorization(GradeDisplay, 'student', 'role');
const AuthorizedEnrollmentsHistory = withAuthorization(EnrollmentsHistory, 'student', 'role');
const AuthorizedGradeForm = withAuthorization(GradeForm, 'teacher', 'role');
const AuthorizedCertificateApplication = withAuthorization(CertificateApplication, 'student', 'role');
const AuthorizedStudentsInfo = withAuthorization(StudentsInfo, 'student', 'role');
const AuthorizedTeachersInfo = withAuthorization(TeachersInfo, 'teacher', 'role');



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login db={db} />} />
          <Route path="register" element={<Register db={db} />} />
          <Route path="courses" element={<Courses db={db} />} />
          <Route path="teachersmenu" element={<AuthorizedTeachersMenu db={db} />} />
          <Route path="studentsmenu" element={<AuthorizedStudentsMenu db={db} />} />
          <Route path="user" element={<User db={db} />} />
          <Route path="secretarymenu" element={<SecretaryMenu db={db} />} />
          <Route path="coursesPage" element={<CoursesPage db={db} />} />
          <Route path="SubjectDeclaration" element={<AuthorizedSubjectDeclaration db={db} />} />
          <Route path="GradeForm" element={<AuthorizedGradeForm db={db} />} />
          <Route path="GradeDisplay" element={<AuthorizedGradeDisplay db={db} />} />
          <Route path="EnrollmentsHistory" element={<AuthorizedEnrollmentsHistory db={db} />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="studentCertificate" element={<AuthorizedCertificateApplication db={db} />} />
          <Route path="StudentsInfo" element={<AuthorizedStudentsInfo db={db} />} />
          <Route path="TeachersInfo" element={<AuthorizedTeachersInfo db={db} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;