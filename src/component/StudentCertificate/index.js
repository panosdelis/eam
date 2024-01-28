
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { collection, addDoc, getDocs, where, getDocsFromServer } from 'firebase/firestore';
import styled from 'styled-components';
import Topbar from '../ExportedComponents/topbar';


const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ApplicationContainer = styled.div`
  max-width: 400px;
  margin: 150px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FormButton = styled.button`
  background-color: #0075cb;
  color: #000000;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DownloadButton = styled.button`
  background-color: #0075cb;
  color: #000000;
  padding: 2px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const HistoryContainer = styled.div`
  margin: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 20vh;
  overflow-y: auto;
`;

const CertificateApplication = ({ db }) => {
  const certificateOptions = ['Aναλυτική Bαθμολογία', 'Στρατολογία', 'ΔΟΥ'];
  const [submissionHistory, setSubmissionHistory] = useState([]);

  useEffect(() => {

    const fetchSubmissionHistory = async () => {
      try {



        const certificateApplications = collection(db, 'certificateApplications');
        const querySnapshot = await getDocs(certificateApplications);


        const historyData = querySnapshot.docs
          .filter(doc => doc.data().user === localStorage.getItem('email'))
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(historyData);
        setSubmissionHistory(historyData);
      } catch (error) {
        console.error('Error fetching submission history:', error.message);
      }
    };

    fetchSubmissionHistory();
  }, [db]);

  const downloadFile = () => {

    const dummyPdfPath = '/dummy.pdf';


    const link = document.createElement('a');
    link.href = process.env.PUBLIC_URL + dummyPdfPath;
    link.download = 'dummy.pdf';


    link.click();
  };



  const formik = useFormik({
    initialValues: {
      selectedCertificate: '',
      additionalInformation: '',
    },
    onSubmit: async (values) => {
      const applicationData = {
        certificate: values.selectedCertificate,
        additionalInformation: values.additionalInformation,
        user: localStorage.getItem('email'),
        subDate: new Date(),

      };

      await addDoc(collection(db, 'certificateApplications'), applicationData);


      setSubmissionHistory((prevHistory) => [...prevHistory, applicationData]);

      alert('Application submitted successfully!');
      window.location.reload()
    },
  });

  return (
    <div className="">
      <Topbar></Topbar>
      <FlexContainer>
        <ApplicationContainer>
          <h2>Αίτηση Πιστοποιητικού</h2>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <FormLabel htmlFor="selectedCertificate">Επιλέξτε Πιστοποιητικό:</FormLabel>
              <FormSelect
                id="selectedCertificate"
                name="selectedCertificate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.selectedCertificate}
              >
                {/*<option value="" label="Επιλέξτε Πιστοποιητικό" />*/}
                {certificateOptions.map((certificate, index) => (
                  <option key={index} value={certificate} label={certificate} />
                ))}
              </FormSelect>
            </div>
            <div>
              <FormLabel htmlFor="additionalInformation">Σχόλια:</FormLabel>
              <FormTextarea
                id="additionalInformation"
                name="additionalInformation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.additionalInformation}
              />
            </div>
            <div>
              <FormButton type="submit">Υποβολή</FormButton>
            </div>
          </form>
        </ApplicationContainer>

        {/* Display Submission History */}
        <HistoryContainer>
          <h3>Ιστορικό Υποβολών</h3>
          {submissionHistory.length > 0 ? (
            <ul>
              {submissionHistory.map((submission) => (
                <li key={submission.id}>
                  <strong>Πιστοποιητικό:</strong> {submission.certificate}
                  <strong> Σχόλια:</strong> {submission.additionalInformation}
                  <strong> Ημερομηνία:</strong> {new Date(submission.subDate.seconds * 1000).toLocaleString()}
                  <DownloadButton onClick={downloadFile}>Downlaod</DownloadButton>
                </li>
              ))}
            </ul>
          ) : (
            <p>Δεν υπάρχουν υποβολές.</p>
          )}
        </HistoryContainer>
      </FlexContainer>
    </div>
  );
};

export default CertificateApplication;
