import React from "react";
import { Button } from "@/components/ui/button";
import { Users, FileText, Calendar } from "lucide-react";

type TabType = "students" | "homeworks" | "exams";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => (
  <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
    <Button
      variant={activeTab === "students" ? "default" : "ghost"}
      size="sm"
      onClick={() => onTabChange("students")}
    >
      <Users className="h-4 w-4 mr-2" />
      学生管理
    </Button>
    <Button
      variant={activeTab === "homeworks" ? "default" : "ghost"}
      size="sm"
      onClick={() => onTabChange("homeworks")}
    >
      <FileText className="h-4 w-4 mr-2" />
      作业管理
    </Button>
    <Button
      variant={activeTab === "exams" ? "default" : "ghost"}
      size="sm"
      onClick={() => onTabChange("exams")}
    >
      <Calendar className="h-4 w-4 mr-2" />
      考试管理
    </Button>
  </div>
);

export default TabNavigation;