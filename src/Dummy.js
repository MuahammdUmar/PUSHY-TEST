// Students Assignmnets
<>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Student Name</th>
        <th>Assignment Title</th>
        <th>Due Date</th>
        <th>Course Name</th>
        <th>Course Timing</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {allStudentAssignments.length > 0 &&
        allStudentAssignments.map((assign, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{assign.StudentName}</td>
              <td>{assign.AssignmentName}</td>
              <td>
                {moment(assign.EndDate).format("DD MM YYYY hh:mm:ss A")}
              </td>
              <td>{assign.CourseName}</td>
              <td>Otto</td>
              {/* <td>{assign.TotalMarks ? assign.TotalMarks : 0 }</td>*/}
              <td>{assign.Status}</td>
              <td>
                <button
                  className="btn"
                  onClick={() =>
                    handleClickStudModal(assign.StudentAssignmentId)
                  }
                >
                  <MdOutlineModeEditOutline
                    fontSize={25}
                    fill="yellow"
                  />
                </button>
              </td>
            </tr>
          );
        })}
    </tbody>
  </Table>
  {/* Admin Courses */}

  <table class="table table-striped table-hover table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>Course Name <i class="fa fa-sort"></i></th>
        <th>Course Category</th>
        <th>Course Credit Hours<i class="fa fa-sort"></i></th>
        <th>Payment</th>
        <th>No of lectures <i class="fa fa-sort"></i></th>
        <th>Actions</th>

      </tr>
    </thead>
    <tbody>

      {allCourses.length > 0 && allCourses.map((course) => {
        return (
          <tr>
            <td>1</td>
            <td>{course.CourseName}</td>
            <td>{course.CourseCategory}</td>
            <td>{course.CourseCreditHours}</td>
            <td>97219</td>
            <td>9</td>
            <td>

              <button className="btn" onClick={() => openCourseModalFunc(course.id)}><MdOutlineModeEditOutline fontSize={25} fill="yellow" /></button>
              <button className="btn" onClick={() => deleteModalOpenFunc(course.id)}><MdOutlineDeleteOutline fontSize={25} fill="red" /></button>
            </td>
          </tr>
        )
      })}



    </tbody>
  </table>
  <div class="clearfix">
    <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
    <ul class="pagination">
      <li class="page-item disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>
      <li class="page-item"><a href="#" class="page-link">1</a></li>
      <li class="page-item"><a href="#" class="page-link">2</a></li>
      <li class="page-item active"><a href="#" class="page-link">3</a></li>
      <li class="page-item"><a href="#" class="page-link">4</a></li>
      <li class="page-item"><a href="#" class="page-link">5</a></li>
      <li class="page-item"><a href="#" class="page-link"><i class="fa fa-angle-double-right"></i></a></li>
    </ul>
  </div>
  {/* Loaoder */}
  {loading &&
    <div className="loading-indicator">
      <Spinner animation="border" variant="primary" />
    </div>
  }

  {/* All Tutors Table */}
  <table class="table table-striped table-hover table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>First Name <i class="fa fa-sort"></i></th>
        <th>Last Name</th>
        <th>Email<i class="fa fa-sort"></i></th>
        <th>Gender</th>
        <th>Date Of Birth <i class="fa fa-sort"></i></th>
        <th>ID Card #</th>
        <th>Address</th>
        {/* <th>Courses</th> */}
      </tr>
    </thead>
    <tbody>
      {mydata.map((user, index) => {
        return (
          <tr>
            <td>{index}</td>
            <td>{user.Firstname}</td>
            <td>{user.Lastname}</td>
            <td>{user.Email}</td>
            <td>Gender</td>
            <td>
              {user.DOB !== null
                ? user.DOB.substring(0, 10)
                : user.DOB}
            </td>
            <td>{user.CardNo}</td>
            <td>{user.Address1}</td>
            {/* <td>{user.Courses && user.Courses.map((c) => (<Badge pill bg="dark">{c.CourseName}</Badge>))}</td> */}
            <td>
              <button
                className="btn"
                onClick={() => handleShow(user.id)}
              >
                <MdOutlineModeEditOutline
                  fontSize={25}
                  fill="yellow"
                />
              </button>
              <button
                className="btn"
                onClick={() => deleteModalOpenFunc(user.id)}
              >
                <MdOutlineDeleteOutline fontSize={25} fill="red" />
              </button>
            </td>
          </tr>
        )

      }

      )}
      {loading &&
        <div className="loading-indicator">
          <Spinner animation="border" variant="primary" />
        </div>
      }
    </tbody>
  </table>

  <div class="clearfix">
    <div class="hint-text">
      Showing <b>5</b> out of <b>25</b> entries
    </div>
    <ul class="pagination">
      <li class="page-item disabled">
        <a href="#">
          <i class="fa fa-angle-double-left"></i>
        </a>
      </li>
      <li class="page-item">
        <a href="#" class="page-link">
          1
        </a>
      </li>
      <li class="page-item">
        <a href="#" class="page-link">
          2
        </a>
      </li>
      <li class="page-item active">
        <a href="#" class="page-link">
          3
        </a>
      </li>
      <li class="page-item">
        <a href="#" class="page-link">
          4
        </a>
      </li>
      <li class="page-item">
        <a href="#" class="page-link">
          5
        </a>
      </li>
      <li class="page-item">
        <a href="#" class="page-link">
          <i class="fa fa-angle-double-right"></i>
        </a>
      </li>
    </ul>
  </div>

  {/* Students */}
  <table class="table table-striped table-hover table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>
          First Name <i class="fa fa-sort"></i>
        </th>
        <th>Last Name</th>
        <th>
          Email<i class="fa fa-sort"></i>
        </th>
        <th>Gender</th>
        <th>
          Date Of Birth <i class="fa fa-sort"></i>
        </th>
        <th>ID Card #</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {allStudents.map((user, i) => (
        <>

          <tr>
            <td>{i + 1}</td>
            <td>{user.Firstname}</td>
            <td>{user.Lastname}</td>
            <td>{user.Email}</td>
            <td>Gender</td>
            <td>
              {user.DOB !== null ? user.DOB.substring(0, 10) : user.DOB}
            </td>
            <td>{user.CardNo}</td>
            <td>{user.Address1}</td>

            <td>
              <button
                className="btn"
                onClick={() => handleShow(user.id)}
              >
                <MdOutlineModeEditOutline
                  fontSize={25}
                  fill="yellow"
                />
              </button>
              <button
                className="btn"
                onClick={() => deleteModalOpenFunc(user.id)}
              >
                <MdOutlineDeleteOutline fontSize={25} fill="red" />
              </button>
            </td>
          </tr>

        </>
      ))}
    </tbody>
    <div class="clearfix">
      <div class="hint-text">
        Showing <b>5</b> out of <b>25</b> entries
      </div>
      <ul class="pagination">
        <li class="page-item disabled">
          <a href="#">
            <i class="fa fa-angle-double-left"></i>
          </a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">
            1
          </a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">
            2
          </a>
        </li>
        <li class="page-item active">
          <a href="#" class="page-link">
            3
          </a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">
            4
          </a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">
            5
          </a>
        </li>
        <li class="page-item">
          <a href="#" class="page-link">
            <i class="fa fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </table>

  {/* Tutor Calender */}

  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    eventContent={renderEventContent} // custom render function
    // editable={false}
    //displayEventEnd={true}
    events={
      user && user.roles === 1
        ? //courseData.CourseScheduler.map((item) => {
        courseData &&
        courseData.CourseScheduler !== null &&
        courseData.CourseScheduler.filter(
          (cschd) => cschd.CourseTime === selectTiming.value
        ).map((item) => {
          return {
            title: item.Title,
            start: item.SchedulerStartTime,
            end: item.SchedulerEndTime,
            description: item.Description,
            id: item.ScheduleId,
          };
        })
        : courseData &&
        courseData.CourseScheduler !== null &&
        courseData.CourseScheduler.map((item) => {
          return {
            title: item.Title,
            start: item.SchedulerStartTime,
            end: item.SchedulerEndTime,
            description: item.Description,
            id: item.ScheduleId,
          };
        })
    }
    eventClick={(eventInfo) => {
      let clickedEvent = [];
      setScheduleId(eventInfo.event._def.publicId);
      if (data.getCourseByIdWithTime.CourseScheduler !== null) {
        clickedEvent =
          data.getCourseByIdWithTime.CourseScheduler.filter(
            (eve) =>
              eve.ScheduleId === eventInfo.event._def.publicId
          );
      }
      let eventData = clickedEvent[0];
      eventData = { ...eventData, CourseName: courseData && courseData.CourseName, };
      console.log("event", eventData);
      setScheduleClickedEvent(eventData);
      setDetailModalOpen(true);
    }}
  // events={[
  //   { title: 'event 1', start: '2022-01-11T06:19:00.639Z', end: '2022-01-11T06:32:13.046Z', id: 'kjkjkjkjlkjkljkjl' },
  //   { title: 'event 2', date: '2022-01-11T06:19:00.639Z' }
  // ]}
  />
{/* EventClick */}
eventClick={(eventInfo) => {
  let clickedEvent = [];
  if (data.getCourseByIdWithTime.CourseScheduler !== null) {
    clickedEvent =
      data.getCourseByIdWithTime.CourseScheduler.filter(
        (eve) =>
          eve.ScheduleId === eventInfo.event._def.publicId
      );
  }
  let eventData = clickedEvent[0];
  eventData = {
    ...eventData,
    CourseName: courseData && courseData.CourseName,
  };
  setScheduleClickedEvent(eventData);
  setDetailModalOpen(true);
}}


</>

