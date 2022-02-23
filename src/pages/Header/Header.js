import React from "react";
import { Link, useHistory, NavLink, useLocation } from "react-router-dom";
import picture from "../../assets/images/profile.png";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import filePickerService from "../../shared/file-stack/file-picker.service";
import navlogo from "../../assets/images/logo.png";
import "./Header.css";


const Header = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  //const locationData = useLocation()
  // console.log("ahmed",user)
  const history = useHistory();

  //Admin:  Home , My Dashboard , Courses , Students , Tutors, Review , ,Schedual,Payments
  //Student : Home, My Dashboard, Courses, Payments, PlayGround, Access Tutor
  //Tutor : Home , My Dashboard ,Courses, Payments
  let homeNavbar = [
    { name: "Home", link: "/" },
    { name: "Courses", link: "/allcourses" },
    { name: "About Us", link: "/aboutus" },
    { name: "News", link: "/News" },
    { name: "Support", link: "/contactus" },
  ];

  let studentNavbar = [
    { name: "Home", link: "/" },
    { name: "My Dashboard", link: "/studentdashboard" },
    { name: "Courses", link: "/mycourses" },
    { name: "Payments", link: "/studentpayments" },
    { name: "Play Ground", link: "/playground" },
    { name: "Access Tutor", link: "/accesstutor" },
    { name: "Assignments", link: "/studentassignments" },
  ];

  let adminNavbar = [
    { name: "Home", link: "/" },
    { name: "My Dashboard", link: "/admindashboard" },
    { name: "Courses", link: "/viewcourse" },
    { name: "Students", link: "/viewstudent" },
    { name: "Tutors", link: "/viewtutor" },
    { name: "Schedule", link: "/schedule" },
    { name: "Payments", link: "/adminpayments" },
    { name: "Review", link: "/review" },
    { name: "News", link: "/newsdetail" },
    { name: "Support", link: "/support" },
    { name: "Leaves Requests", link: "/studentleaves" },

    
  ]
    
  
  let tutorNavbar = [
    { name: "Home", link: "/" },
    { name: "My Dashboard", link: "/tutordashboard" },
    { name: "Courses", link: "/tutorcourses" },
    { name: "Payments", link: "/payment" },
    { name: "Assignments", link: "/allassignments" },
  ];

  let headerLinks =
    user && user.roles === 2
      ? adminNavbar
      : user && user.roles === 1
      ? studentNavbar
      : user && user.roles === 3
      ? tutorNavbar
      : homeNavbar;
  // console.log(props.userId)
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img className="logo" alt="logo" src={navlogo} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {headerLinks.map((item) => {
                return (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={item.link}
                      activeClassName="active"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <form className="d-flex flex-nowrap">
              {user && user.accessToken ? (
                <button
                  to="/login"
                  className="text-decoration-none btn btn-dark  text-nowrap mx-1"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-decoration-none btn btn-dark h-25 text-nowrap mx-1"
                >
                  Sign In
                </Link>
              )}
              <h4 className="h6 mt-13 card-tital mb-0 ms-2">
                {user && user.roles == 1
                  ? "Student:"
                  : user && user.roles == 2
                  ? "Admin:"
                  : user && user.roles == 3
                  ? "Tutor:"
                  : ""}

                <span className="ms-2">{user && user.Firstname}</span>
              </h4>

              {user && user.roles && (
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdownPic h-100 w-100 rounded-3 bg-light border-light"
                    id="dropdown-basic"
                  >
                    <Link
                      to={{
                        pathname: `${
                          user && user.roles === 1
                            ? "/studentprofile"
                            : user && user.roles === 2
                            ? "/adminprofile"
                            : user && user.roles === 3
                            ? "/tutorprofile"
                            : "/404"
                        }`,
                        //state: { finalUserId: (user && user.id) }
                        state: { prevPath: history.location.pathname },
                      }}
                    >
                      {/* <img
                      src={picture}
                      alt=""
                      className="dashboardPicture h-100"
                    /> */}
                      <img
                        alt="Profile Avatar"
                        className="dashboardPicture h-100"
                        src={user && user.Attachment ? filePickerService.getDownloadLink(user.Attachment.AttachmentFileHandle): 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'
                        }
                      />
                    </Link>
                  </Dropdown.Toggle>

                  {/* <Dropdown.Item ><Link to="/changepassword">Change Password</Link></Dropdown.Item> */}
                </Dropdown>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
