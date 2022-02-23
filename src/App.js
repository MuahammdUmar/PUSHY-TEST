import React, { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login"
import AuthRoute from "./components/AuthRoute";
import { useGlobalContext } from "./context/globalContext";
import { ToastProvider } from "react-toast-notifications";

import Dashboard from './pages/Dashboard/Dashboard';
import AllCoursesInDAshboard from './pages/AllCourses/AllCourses';
import PaymentPage from './pages/PaymentPage/PaymentPage'
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import AboutUs from "./pages/AboutUs/AboutUs";
import NewsPage from "./pages/NewsPage/NewsPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import NotFound from "./components/NotFound/NotFound";


import StudentLeaves from "./pages/StudentLeaves/StudentLeaves";
import StudentSignUp from "./components/StudentSignUp/StudentSignUp";
import TutorSignUp from "./components/TutorSignUp/TutorSignUp";
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import CreatePassword from './pages/CreatePassword/CreatePassword'
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import FAQ from './pages/FAQ/FAQ'

import ScrollToTop from "./components/ScrollToTop";
import ContactUs from './pages/ContactUs/ContactUs'
import Support from "./pages/Support/Support";
import Pushy from 'pushy-sdk-web';


const LazyTutorDashboard = React.lazy(() => import('./pages/TutorDashboard/TutorDashboard'))
const LazyStudentDashboard = React.lazy(() => import('./pages/StudentDashboard/StudentDashboard'))
const LazyAdminDashboard = React.lazy(() => import('./pages/AdminDashboard/AdminDashboard'))
const LazyTutorProfile = React.lazy(() => import('./pages/TutorProfile/TutorProfile'))
const LazyStudentProfile = React.lazy(() => import('./pages/StudentProfile/StudentProfile'))
const LazyAdminProfile = React.lazy(() => import('./pages/AdminProfile/AdminProfile'))
const LazyViewStudent = React.lazy(() => import('./pages/ViewStudent/ViewStudent'))
const LazyViewTutor = React.lazy(() => import('./pages/ViewTutor/ViewTutor'))
const LazyAllCourses = React.lazy(() => import('./pages/ViewCourse/AllCourses'))
const LazyAllAssignments = React.lazy(() => import('./pages/Assignments/AllAssignments'))
const LazyMyCourse = React.lazy(() => import('./pages/MyCourse/MyCourse'))
const LazyTutorCourses = React.lazy(() => import('./pages/TutorCourses/TutorCourses'))
const LazyTutorCompleteCourse = React.lazy(() => import('./pages/TutorCompleteCourse/TutorCompleteCourse'))
const LazyCompleteCourse = React.lazy(() => import('./pages/CompleteCourse/CompleteCourse'))
const LazyAssignmentDetails = React.lazy(() => import('./pages/AssignmentDetails/AssignmentDetails'))
const LazyAllStudentPayments = React.lazy(() => import('./pages/AllStudentPayments/AllStudentPayments'))
const LazyAllAdminPayments = React.lazy(() => import('./pages/AllPaymentsForAdmin/AdminPayments'))
const LazyCourseSchedule = React.lazy(() => import('./pages/Schedule/CourseSchedule'))
const LazyReview = React.lazy(() => import('./pages/Review/Review'))
const LazyStudentAssignment = React.lazy(() => import('./pages/StudentAssignments/StudentAssignment'))


const App = () => {

  const token = JSON.parse(localStorage.getItem("accessToken"));
  //const token = localStorage.getItem('accessToken');
  const { isLoggedIn, isSidebarOpen } = useGlobalContext()
  const [ishide, sethide] = useState(false)

  // Register visitor's browser for push notifications
  Pushy.register({ appId: '6214f12aca130a4f54f56532' }).then(function (deviceToken) {
    // Print device token to console
    console.log('Pushy device token: ' + deviceToken);
    localStorage.setItem("devicetoken", JSON.stringify(deviceToken));


    // Send the token to your backend server via an HTTP GET request
    //fetch('https://your.api.hostname/register/device?token=' + deviceToken);

    // Succeeded, optionally do something to alert the user
  }).catch(function (err) {
    // Handle registration errors
    console.error('Error', err);
  });

  return (
    <ToastProvider autoDismiss={true} placement="top-right">
      <BrowserRouter>
        {/* {(token || isLoggedIn) && <Header />} */}
        {/* <Header /> */}
        <ScrollToTop />
        <React.Suspense fallback={null}>
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
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/studentleaves" component={StudentLeaves} />

            

            <Route exact path="/support" component={SupportPage} />

            <AuthRoute exact path="/tutordashboard" component={LazyTutorDashboard} />
            <AuthRoute exact path="/studentdashboard" component={LazyStudentDashboard} />
            <AuthRoute exact path="/admindashboard" component={LazyAdminDashboard} />

            {/* Profile Pages */}
            <AuthRoute exact path="/adminprofile" component={LazyAdminProfile} />
            <AuthRoute exact path="/studentprofile" component={LazyStudentProfile} />
            <AuthRoute exact path="/tutorprofile" component={LazyTutorProfile} />

            {/* Listing Pages */}
            <AuthRoute exact path="/viewstudent" component={LazyViewStudent} />
            <AuthRoute exact path="/viewtutor" component={LazyViewTutor} />
            <AuthRoute exact path="/viewcourse" component={LazyAllCourses} />
            <AuthRoute exact path="/allassignments" component={LazyAllAssignments} />

            {/* Tutor/Student Courses */}
            <AuthRoute exact path="/mycourses" component={LazyMyCourse} />
            <AuthRoute exact path="/tutorcourses" component={LazyTutorCourses} />

            {/* Detail Pages */}
            <AuthRoute exact path="/assignmentdetails" component={LazyAssignmentDetails} />
            <Route exact path="/completecourse" component={LazyCompleteCourse} />
            <AuthRoute exact path="/tutorcoursedetail" component={LazyTutorCompleteCourse} />

            <AuthRoute exact path="/schedule" component={LazyCourseSchedule} />
            <AuthRoute exact path="/review" component={LazyReview} />
            <AuthRoute exact path="/studentassignments" component={LazyStudentAssignment} />

            {/* Payments Pages  */}
            <AuthRoute exact path="/studentpayments" component={LazyAllStudentPayments} />
            <AuthRoute exact path="/adminpayments" component={LazyAllAdminPayments} />

            <Route path='*' exact={true} component={NotFound} />


          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </ToastProvider>


  );
}

export default App;
