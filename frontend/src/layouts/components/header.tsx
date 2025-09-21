import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppSelector } from "@/modules/stores";
import { useAppDispatch } from "@/modules/stores";
import { logout } from "@/modules/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const isLoggedIn = useAppSelector((state) => Boolean(state.auth.token));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 判断是否为学生端
  const isStudentDashboard = location.pathname.startsWith('/student-dashboard');

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // 根据用户类型选择不同的头像
  const getAvatarImage = () => {
    if (isStudentDashboard) {
      return "https://picsum.photos/id/64/100/100"; // 学生头像
    }
    return "https://tongque.ocybers.com/img/logo.jpg"; // 教师头像
  };

  const getAvatarFallback = () => {
    if (isStudentDashboard) {
      return "S"; // Student
    }
    return "T"; // Teacher
  };

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link
            to={isLoggedIn ? (isStudentDashboard ? "/student-dashboard" : "/dashboard") : "/"}
            className="flex items-center gap-8"
          >
            <img src="/logo.png" alt="edupal logo" className="h-14" />
          </Link>

          {isLoggedIn ? (
            <>
              {/* 学生端不显示导航菜单，教师端显示 */}
              {!isStudentDashboard && (
                <nav className="ml-auto flex gap-4 sm:gap-6">
                  <Link
                    to="/dashboard"
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                  >
                    我的
                  </Link>
                  <Link
                    to="/question/bank"
                    className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                  >
                    题库
                  </Link>
                </nav>
              )}
              
              <div className={`${!isStudentDashboard ? 'ml-4' : 'ml-auto'} flex items-center gap-2 relative`}>
                <Avatar
                  className="h-8 w-8 rounded-full cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <AvatarImage src={getAvatarImage()} />
                  <AvatarFallback className="rounded-lg">{getAvatarFallback()}</AvatarFallback>
                </Avatar>
                {isMenuOpen && (
                  <div className="absolute top-10 right-0 bg-white border rounded shadow-lg p-2 z-50">
                    {isStudentDashboard && (
                      <div className="pb-2 mb-2 border-b text-xs text-gray-500">
                        学生端
                      </div>
                    )}
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      注销
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="ml-auto flex items-center gap-2">
              <Link to="/auth">
                <Button variant="outline" size="sm" className="font-semibold">
                  登录
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
