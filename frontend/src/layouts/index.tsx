import { memo } from "react";
import { useAppSelector } from "@/modules/stores";
import { selectGlobal } from "@/modules/global";
import AppLayout from "@/layouts/components/applayout";
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "@/pages/dashboard";
import TeacherPage from "@/pages/teacher/components/manage";
import NewQuestionPage from "@/pages/question-new";

const App = () => {
  const globalState = useAppSelector(selectGlobal);
  const AppContainer = AppLayout[globalState.layout];

  return (
    <div className="w-full max-w mx-auto">
      <AppContainer />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/teacher/users" element={<TeacherPage />} />
        <Route path="/question/new" element={<NewQuestionPage />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
};

export default memo(App);
