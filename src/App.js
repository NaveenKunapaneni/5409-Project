import React from 'react';
import FormSubmission from './Pages/form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/mainpage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/form" exact element={<FormSubmission />} />
          {/* <Route path="/newcard" exact element={<RecipeReviewCard />} /> */}
          <Route path="/" exact element={<MainPage />} />
          </Routes>
          {/* <FooterComponent /> */}
    </BrowserRouter>
  );
}

export default App;
