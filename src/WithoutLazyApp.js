import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login"
import AuthRoute from "./components/AuthRoute";
import { useGlobalContext } from "./context/globalContext";
import { ToastProvider } from "react-toast-notifications";

import TutorDashboard from './pages/TutorDashboard/TutorDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';


import Dashboard from './pages/Dashboard/Dashboard';
import ViewStudent from './pages/ViewStudent/ViewStudent';
import ViewTutor from './pages/ViewTutor/ViewTutor';
import AllCourses from './pages/ViewCourse/AllCourses';
import AllCoursesInDAshboard from './pages/AllCourses/AllCourses';

import MyCourse from './pages/MyCourse/MyCourse';
import CompleteCourse from './pages/CompleteCourse/CompleteCourse';
import AdminProfile from './pages/AdminProfile/AdminProfile';
import StudentProfile from './pages/StudentProfile/StudentProfile'
import TutorProfile from './pages/TutorProfile/TutorProfile'
import PaymentPage from './pages/PaymentPage/PaymentPage'
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import AboutUs from "./pages/AboutUs/AboutUs";
import NewsPage from "./pages/NewsPage/NewsPage";
import SupportPage from "./pages/SupportPage/SupportPage";


import Header from "./pages/Header/Header";
import NotFound from "./components/NotFound/NotFound";
import CourseSchedule from "./pages/Schedule/CourseSchedule";
import Review from "./pages/Review/Review";
import AllAssignments from "./pages/Assignments/AllAssignments";
import StudentSignUp from "./components/StudentSignUp/StudentSignUp";
import TutorSignUp from "./components/TutorSignUp/TutorSignUp";
import StudentAssignment from "./pages/StudentAssignments/StudentAssignment";
import AssignmentDetails from "./pages/AssignmentDetails/AssignmentDetails";
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import CreatePassword from './pages/CreatePassword/CreatePassword'
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import TutorCourses from "./pages/TutorCourses/TutorCourses";
import TutorCompleteCourse from "./pages/TutorCompleteCourse/TutorCompleteCourse";
import ScrollToTop from "./components/ScrollToTop";
import AllStudentPayments from "./pages/AllStudentPayments/AllStudentPayments";
import AllAdminPayments from "./pages/AllPaymentsForAdmin/AdminPayments";
import ContactUs from './pages/ContactUs/ContactUs'
import Support from "./pages/Support/Support";



const App = () => {

  const token = JSON.parse(localStorage.getItem("accessToken"));
  //const token = localStorage.getItem('accessToken');
  const { isLoggedIn, isSidebarOpen } = useGlobalContext()
  const [ishide, sethide] = useState(false)
  return (
    <ToastProvider autoDismiss={true} placement="bottom-right">
      <BrowserRouter>
        {/* {(token || isLoggedIn) && <Header />} */}
        {/* <Header /> */}
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={StudentSignUp} />
          <Route exact path="/signuptutor" component={TutorSignUp} />
          <Route exact path="/allcourses" component={AllCoursesInDAshboard} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/newpassword/:token" component={CreatePassword} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/paymentpage" component={PaymentPage} />
          <Route exact path="/newsdetail" component={NewsDetail} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/news" component={NewsPage} />
          <Route exact path="/support" component={SupportPage} />
          
          <AuthRoute exact path="/tutordashboard" component={TutorDashboard} />
          <AuthRoute exact path="/studentdashboard" component={StudentDashboard} />
          <AuthRoute exact path="/admindashboard" component={AdminDashboard} />

          <AuthRoute exact path="/viewstudent" component={ViewStudent} />
          <AuthRoute exact path="/viewtutor" component={ViewTutor} />
          <AuthRoute exact path="/viewcourse" component={AllCourses} />
        
          <AuthRoute exact path="/allassignments" component={AllAssignments} />
          <AuthRoute exact path="/mycourses" component={MyCourse} />
          <AuthRoute exact path="/tutorcourses" component={TutorCourses} />
          <AuthRoute exact path="/schedule" component={CourseSchedule} />
          <AuthRoute exact path="/review" component={Review} />
          <AuthRoute exact path="/studentassignments" component={StudentAssignment} />
          <AuthRoute exact path="/assignmentdetails" component={AssignmentDetails} />
          

          <AuthRoute exact path="/completecourse" component={CompleteCourse} />
          <AuthRoute exact path="/tutorcoursedetail" component={TutorCompleteCourse} />

          <AuthRoute exact path="/adminprofile" component={AdminProfile} />
          <AuthRoute exact path="/studentprofile" component={StudentProfile} />
          <AuthRoute exact path="/tutorprofile" component={TutorProfile} />

          <AuthRoute exact path="/studentpayments" component={AllStudentPayments} />
          <AuthRoute exact path="/adminpayments" component={AllAdminPayments} />

          <Route path='*' exact={true} component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ToastProvider>


  );
}

export default App;
