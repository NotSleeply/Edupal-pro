import { memo } from "react";
import { useAppSelector } from "@/modules/stores";
import { selectGlobal } from "@/modules/global";
import AppLayout from "@/layouts/components/applayout";
<<<<<<< HEAD
import { Toaster } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "@/pages/dashboard";
import TeacherPage from "@/pages/teacher/components/manage";
import NewQuestionPage from "@/pages/question-new";

const App = () => {
  const globalState = useAppSelector(selectGlobal);
=======
import { Toaster } from "@/components/ui/sonner"
export default memo(() => {
  const globalState = useAppSelector(selectGlobal);

  // 这里的 AppLayout 是一个对象，包含了不同布局的组件
>>>>>>> origin/dev-liu
  const AppContainer = AppLayout[globalState.layout];

  return (
    <div className="w-full max-w mx-auto">
      <AppContainer />
<<<<<<< HEAD
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
=======
      <Toaster position="top-center" />
    </div>
  );
});
>>>>>>> origin/dev-liu
