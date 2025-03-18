import Layout from './components/Layout/Layout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import QuestionnairesListPage from './pages/QuestionnairesListPage/QuestionnairesListPage.jsx';
import FillQuestionnaire from './pages/FillQuestionnaire/FillQuestionnaire.jsx';
import CreateQuestionnaire from './pages/CreateQuestionnaire/CreateQuestionnaire.jsx';
import EditQuestionnaire from './pages/EditQuestionnaire/EditQuestionnaire.jsx';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/questionnaire' element={<QuestionnairesListPage />} />
          <Route path='/questionnaire/:id' element={<FillQuestionnaire />} />

          <Route
            path='/questionnaires/create'
            element={<CreateQuestionnaire />}
          />
          <Route
            path='/questionnaires/:id/edit'
            element={<EditQuestionnaire />}
          />
        </Routes>
        <Toaster />
      </Layout>
    </>
  );
}

export default App;
