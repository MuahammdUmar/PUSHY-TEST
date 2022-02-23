import { gql } from "@apollo/client";

//DD MM YYYY hh:mm:ss A
export const allTags = [
  { value: "IT", label: "Information Technology" },
  { value: "BUSINESS", label: "Business" },
  { value: "CS", label: "Computer Science" },
  { value: "DATA_SCIENCE", label: "Data Science" },
  { value: "SOCIAL_SCIENCES", label: "Social Sciences" },
  { value: "HEALTH", label: "Health" },
  { value: "MATH", label: "Math" },
  { value: "ARTS", label: "Arts" }
]
export const SIGN_IN = gql`
mutation signIn($usersInput: SignInUsersInput!) {
  signIn(usersInput: $usersInput) {
    accessToken
    Firstname
    Lastname
    DOB
    Email
    ContactNo
    Address1
    Address2
    City
    Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
    id
    Country
    CreatedUserId
    CreatedDate
    UpdatedDate
    roles
  }
}
`
export const FORGOT_PASSWORD = gql`
  mutation forgetPassword($forgetPasswordInput: ForgetPasswordInput!) {
    forgetPassword(forgetPasswordInput: $forgetPasswordInput) {
      Message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
mutation changePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput) {
   Message
  }
}`;
export const NEW_PASSWORD = gql`
mutation resetPassword($resetPasswordInput: ResetPasswordInput!) {
  resetPassword(resetPasswordInput: $resetPasswordInput) {
   Message
  }
}`;


// export const CUSTOMER_SIGN_UP = gql`
//   mutation createcustomer($createcustomerInput: CreatecustomerInput!) {
//     createcustomer(createcustomerInput: $createcustomerInput) {
//       id
//       CustomerName
//       Opportunity
//       Email
//       OpportunityType
//       BusinessUnit
//       ServiceType
//       CCaccountid
//       Discription
//       EnterpriseAccountName
//       TermStarDate
//       TermEndDate
//     }
//   }
// `;

export const CUSTOMER_SIGN_UP = gql`
  mutation signUp($createUsersInput: CreateUsersInput!) {
    signUp(createUsersInput: $createUsersInput) {
      accessToken
      Firstname
      Lastname
      DOB
      Email
      ContactNo
      Address1
      Address2
      City
      id
      Country
      CreatedUserId
      CreatedDate
      UpdatedDate
      roles
      
    }
  }
`;


export const USER_SIGN_UP = gql`
  mutation signUp($createUsersInput: CreateUsersInput!) {
    signUp(createUsersInput: $createUsersInput) {
      id
      accessToken
      Firstname
      Lastname
      Email
      ContactNo
      CreatedUserId
      CreatedDate
      UpdatedDate
      roles
      Message
    }
  }
`;

export const ATTACHMENT_BY_ID = gql`
    query attachmentById($AttachmentId: String!) {
      attachmentById(AttachmentId: $AttachmentId) {
      AttachmentId
      AttachmentFileName
      AttachmentFileHandle
      AttachmentFileType
      AttachmentFileSize
      }
    }
`;
export const GET_ALL_USERS = gql`
query {
  getAllUserss {
    id
    accessToken
    Firstname
    Lastname
    Email
    ContactNo
    CreatedUserId
    CreatedDate
    UpdatedDate
    roles
    Message
    DOB
    Address1
    }
  }
`;
// getAllStudents: [Users!]!
export const GET_ALL_STUDENTS = gql`
query {
  getAllStudents {
    id
    accessToken
    Firstname
    Lastname
    Email
    ContactNo
    CreatedUserId
    CreatedDate
    UpdatedDate
    roles
    Message
    DOB
    Address1
    }
  }
`;

export const GET_ALL_NEWS = gql`
query {
  getAllNews {
    id
    Title
    Description
    NewsType
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        } 
    Status
    }
  }
`;
export const GET_USER_ID = gql`
    query UsersById($id: String!) {
      UsersById(id: $id) {
        id
        accessToken
        Firstname
        Lastname
        DOB
        Email
        ContactNo
        Country
        CardNo
        Interests
        roles
        Message
        Address1
        Address2
        Courses{
          id
          CourseName
        }
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        Interests
      }
    }
  `;

export const UPDATE_USER = gql`
    mutation updateUser($updateUserInput: UpdateUsersInput!, $id: String!) {
      updateUser(updateUserInput: $updateUserInput, id: $id) {
        id
        accessToken
        Firstname
        Lastname
        Email
        ContactNo
        CreatedUserId
        CreatedDate
        UpdatedDate
        roles
        Message

      }
    }
  `;

export const UPDATE_NEWS = gql`
    mutation updateNews($updateNewsInput: UpdateNewsInput!, $id: String!) {
      updateNews(updateNewsInput: $updateNewsInput, id: $id) {
        id
        Title
        Description
        NewsType
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        Status

      }
    }
  `;

export const CREATE_COURSE = gql`
    mutation createCourse($createCourseInput: CreateCourseInput!) {
      createCourse(createCourseInput: $createCourseInput) {
          id
          CourseName
          CourseCategory
          CourseCreditHours
          CourseDescription
          CourseAssignments
          CourseOutcomes
          Price
          
      }
    }
  `;
export const CREATE_CONTACT_US = gql`
mutation createContactUs($createContactUsInput: CreateContactUsInput!) {
  createContactUs(createContactUsInput: $createContactUsInput) {
    id
    Email
    Description
    PhoneNo
  }
}
`;

export const CREATE_NEWS = gql`
    mutation createNews($createNewsInput: CreateNewsInput!) {
      createNews(createNewsInput: $createNewsInput) {
          Title
          id
          Description
          NewsType
          Attachment{
            AttachmentFileName
            AttachmentFileHandle
            AttachmentFileType
            AttachmentFileSize
          }
          Status
          
      }
    }
  `;

export const GET_ALL_COURSES = gql`
    query {
      getAllCourses {
        id
        CourseName
        CourseCategory
        CourseCreditHours
        CourseDescription
        CourseAssignments
        CourseTime
        AverageRating
        CourseOutcomes
        EnrolledUsers{
          id
          Firstname
        }
        CourseRatings{
          id
          Rating
        }
        Price
        CourseScheduler{
          ScheduleId
          Title
          Description
          SchedulerStartTime
          SchedulerEndTime
          CourseTime
          Tutor{
            id
            Firstname
          }
        }
        Tutors{
          id
          Firstname
        }
        EnrolledCourseTime
        IsCurrentStudentEnrolled
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        CourseImage{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }

      }
    }
  `;

export const GET_COURSE_BY_ID = gql`
    query getCourseById($id: String!) {
      getCourseById(id: $id) {
        id
        CourseName
        CourseCategory
        CourseCreditHours
        CourseDescription
        CourseAssignments
        CourseOutcomes
        CourseTime
        Price
        CourseScheduler{
          ScheduleId
          AppliedForLeave
          Title
          Description
          SchedulerStartTime
          SchedulerEndTime
          CourseTime
          Tutor{
            id
            Firstname
          }

        }
        Attachment{
        AttachmentId
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      }
    }
  `;

export const UPDATE_COURSE = gql`
    mutation updateCourse($updateCourseInput: UpdateCourseInput!, $id: String!) {
      updateCourse(updateCourseInput: $updateCourseInput, id: $id) {
        id
        CourseName
        CourseCategory
        CourseCreditHours
        CourseDescription
        CourseAssignments
        CourseOutcomes
        IsCurrentStudentEnrolled
        CourseTime
        EnrolledCourseTime
        Price
      }
    }
  `;
export const DELETE_COURSE = gql`
  mutation deleteCourse($id: String!){
    deleteCourse(id: $id)
  }`;
export const DELETE_NEWS = gql`
  mutation deleteNews($id: String!){
    deleteNews(id: $id)
  }`;
export const DELETE_USER = gql`
  mutation deleteUsers($id: String!){
    deleteUsers(id: $id)
  }`;
export const ENROLL_COURSE = gql`
  mutation enrolUser($courseId: String!, $courseTime: String!){
    enrolUser(courseId: $courseId, courseTime: $courseTime )
  }`;



export const GET_COURSE_BY_ROLE = gql`
query {
  getStudentCourses {
    id
    CourseName
    CourseCategory
    CourseCreditHours
    CourseDescription
    CourseAssignments
    CourseOutcomes
    CourseTime
    IsPaymentPending
    EnrolledUsers{
      Firstname
    }
    Tutors{
      id
      Firstname
    }
   
  }
}
`;
export const CREATE_COURSE_SCHEDULE = gql`
    mutation scheduleCourse($updateCourseInput: CourseSchedulerInput!, $id: String!) {
      scheduleCourse(updateCourseInput: $updateCourseInput, id: $id) {
        id
        CourseName
        CourseCategory
        CourseCreditHours
        CourseDescription
        CourseAssignments
        CourseOutcomes
        CourseGuidelines
        CourseRatings{
          Comment
        }
      }
    }
  `;

export const DELETE_COURSE_SCHEDULE = gql`
  mutation deleteCourseScheduler($schdulerId: String!, $courseId: String! ){
    deleteCourseScheduler(schdulerId: $schdulerId, courseId: $courseId)
  }`;

// editCourseScheduler(
//   updateCourseInput: CourseSchedulerInput!
//   schdulerId: String!
//   courseId: String!
//   ): String!

export const UPDATE_COURSE_SCHEDULE = gql`
    mutation editCourseScheduler($updateCourseInput: CourseSchedulerInput!, $schdulerId: String!, $courseId: String!) {
      editCourseScheduler(updateCourseInput: $updateCourseInput, schdulerId: $schdulerId, courseId: $courseId) 
    }
  `;

// RateCourse(
//   courseRatingInput: CourseRatingInput!
//   id: String!
//   ): Courses!  
export const RATE_COURSE = gql`
  mutation RateCourse($courseRatingInput: CourseRatingInput!, $id: String!) {
    RateCourse(courseRatingInput: $courseRatingInput, id: $id) {
      id
      CourseName
      CourseCategory
      CourseCreditHours
      CourseDescription
      CourseAssignments
      CourseOutcomes
      CourseGuidelines
      
    }
  }
`;

// getAllUserByCourseId(
//   courseId: String!
//   ): [Users!]!

export const GET_TUTORS_BY_COURSE = gql`
    query getAllUserByCourseId($courseId: String!) {
      getAllUserByCourseId(courseId: $courseId) {
        id
        accessToken
        Firstname
        Lastname
        DOB
        Email
        ContactNo
        CreatedUserId
        CreatedDate
        UpdatedDate
        roles
        Message
        Address1
        Address2
      }
    }
  `;

export const GET_NEWS_BY_ID = gql`
    query getNewsById($id: String!) {
      getNewsById(id: $id) {
        id
        Title
        Description
        NewsType
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        Status
      }
    }
  `;

export const GET_COURSE_BY_ID_WITH_TIME = gql`
  query getCourseByIdWithTime($id: String!) {
    getCourseByIdWithTime(id: $id) {
        id
        CourseName
        Price
        CourseCategory
        CourseCreditHours
        CourseDescription
        CourseAssignments
        CourseOutcomes
        CourseGuidelines
        IsCurrentStudentEnrolled
        IsPaymentPending
        CourseTime
        AverageRating
        EnrolledCourseTime
        CourseRatings{
          id
          Rating
        }
        EnrolledUsers{
          id
          Firstname
        }
        CourseScheduler{
          ScheduleId
          Title
          Description
          SchedulerStartTime
          SchedulerEndTime
          CourseTime
          Tutor{
            id
            Firstname
          }
        }
        
    }
  }
`;

export const GET_STUDENT_RATING = gql`
  query getStudentRatings($id: String!) {
    getStudentRatings(id: $id) {
        RatingId
        Rating
        Comment
        StudentId
        Status
        StudentName
    }
  }
`;

export const GET_APPROVED_RATING = gql`
  query{
     getApprovedRatings {
      RatingId
      Rating
      Comment
      StudentId
      Status
      StudentName
  }
}
`;

export const GET_ALL_RATING = gql`
  query{
     getAllRatings {
       id
      RatingId
      Rating
      Comment
      StudentId
      Status
      StudentName
  }
}
`;

export const GET_COURSETIME_BY_ID = gql`
    query getCourseTimeByCourseId($courseId: String!) {
      getCourseTimeByCourseId(courseId: $courseId) 
    }
  `;

// getEnrolledStudentsForCurrentUser: [Users!]!
export const GET_ALL_STUDENTS_CURRENT_TUTOR = gql`
  query {
    getEnrolledStudentsForCurrentUser {
      id
      accessToken
      Firstname
      Lastname
      DOB
      Email
      ContactNo
      Address1
      Address2
      City
      Country
      roles  
    }
  }
`;

// createAssignment(
//   createAssignmentInput: CreateAssignmentInput!
//   ): Assignments!

export const CREATE_ASSIGNMENT = gql`
    mutation createAssignment($createAssignmentInput: CreateAssignmentInput!) {
      createAssignment(createAssignmentInput: $createAssignmentInput) {
        id
        CourseId
        TutorId
        AssignmentName
        Description
        StartDate
        EndDate
        CourseTime
      }
    }
  `;

// getAllAssignments
export const GET_ALL_ASSIGNMENTS = gql`
  query {
    getAllAssignments {
      id
      CourseId
      TutorId
      AssignmentName
      Description
      StartDate
      EndDate
      CourseTime
      CourseName
      AssignStudents{
        id
        Firstname
      }
    }
  }
  `;

// getAssignmentById(
//   id: String!
//   ): Assignments!

export const GET_ASSIGNMENT_BY_ID = gql`
    query getAssignmentById($id: String!) {
      getAssignmentById(id: $id) {
        id
        CourseId
        CourseName
        TutorId
        AssignmentName
        Description
        StartDate
        EndDate
        TotalMarks
        CourseTime
        AssignStudents{
          id
          Firstname
        }
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
      }
    }
  `;

// deleteAssignment(
//   id: String!
//   ): String!

export const DELETE_ASSIGNMENT = gql`
  mutation deleteAssignment($id: String!){
    deleteAssignment(id: $id)
  }`;

// updateAssignment(
//   updateAssignmentInput: UpdateAssignmentInput!
//   id: String!
//   ): Assignments!

export const UPDATE_ASSIGNMENT = gql`
    mutation updateAssignment($updateAssignmentInput: UpdateAssignmentInput!, $id: String!) {
      updateAssignment(updateAssignmentInput: $updateAssignmentInput, id: $id) {
        id
        CourseId
        CourseName
        TutorId
        AssignmentName
        Description
        StartDate
        EndDate
        CourseTime
        
      }
    }
  `;

// getAllTutors: [Users!]!
export const GET_ALL_TUTORS = gql`
  query {
    getAllTutors {
      id
      accessToken
      Firstname
      Lastname
      DOB
      Email
      ContactNo
      Address1
      Address2
      City
      Country
      Courses{
        id
        CourseName
      }
      Interests
    }
  }
`;

// TutorById(
//   id: String!
//   ): Users!
export const GET_TUTOR_BY_ID = gql`
    query TutorById($id: String!) {
      TutorById(id: $id) {
        id
        accessToken
        Firstname
        Lastname
        DOB
        Email
        ContactNo
        Address1
        Address2
        CardNo
        City
        Country
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        Courses{
          id
          CourseName
        }
        Interests

      }
    }
  `;

// approveTutorsCourses(
//   CourseIds: [String!]!
//   id: String!
//   ): Users!
export const APPROVE_TUTOR_COURSES = gql`
    mutation approveTutorsCourses($CourseIds: [String!]!, $id: String!) {
      approveTutorsCourses(CourseIds:$CourseIds, id: $id) {
        id
        accessToken
        Firstname
        Lastname
        DOB
        Email
        ContactNo
        Address1
        Address2
        City
        Country
        Courses{
          id
          CourseName
        }
        Interests
        Status
          
      }
    }
  `;

export const APPROVE_RATING = gql`
    mutation approveRating($id: String!, $RatingId: String!) {
      approveRating(id:$id, RatingId: $RatingId) {
        id
          
      }
    }
  `;

export const REJECT_RATING = gql`
    mutation rejectRating($id: String!, $RatingId: String!) {
      rejectRating(id:$id, RatingId: $RatingId) {
        id
          
      }
    }
  `;


export const REJECT_TUTOR_COURSES = gql`
    mutation rejectTutorsCourses($CourseIds: [String!]!, $id: String!) {
      rejectTutorsCourses(CourseIds:$CourseIds, id: $id) {
        id
        accessToken
        Firstname
        Lastname
        DOB
        Email
        ContactNo
        Address1
        Address2
        City
        Country
        Courses{
          id
          CourseName
        }
        Interests
        Status
          
      }
    }
  `;

// getStudentAssignments(
//   id: String!
//   ): [Assignments!]!
// export const GET_STUDENTS_ASSIGNMENTS = gql`
//   query getStudentAssignments($id: String!) {
//     getStudentAssignments(id: $id) {
//       id
//       CourseId
//       CourseName
//       TutorId
//       AssignmentName
//       Description
//       StartDate
//       EndDate
//       CourseTime

//     }
//   }
// `;

export const GET_STUDENTS_ASSIGNMENTS_NEW = gql`
  query {
    getCurrnetStudentAssignments{
      id
      CourseId
      CourseName
      TutorId
      AssignmentName
      Attachment{
        AttachmentId
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      Description
      StartDate
      EndDate
      CourseTime
      Tutor{
        id
        Firstname
      }
    }
  }
`;
// getCoursesOfStudentsInterest: [Courses!]!
export const GET_COURSE_BY_INTEREST = gql`
query {
  getCoursesOfStudentsInterest {
    id
    CourseName
    CourseCategory
    CourseCreditHours
    CourseDescription
    CourseAssignments
    CourseOutcomes
    EnrolledUsers{
      Firstname
    }
  }
}
`;
// createStudentAssignment(
//   createStudentAssignmentInput: CreateStudentAssignmentInput!
//   ): StudentAssignment!

export const CREATE_STUDENT_ASSIGNMENT = gql`
    mutation createStudentAssignment($createStudentAssignmentInput: CreateStudentAssignmentInput!) {
      createStudentAssignment(createStudentAssignmentInput: $createStudentAssignmentInput) {
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        id
        StudentId
        AssignmentId
      }
    }
  `;


// getStudentAssignmentsById(
//   id: String!
//   ): [StudentAssignments!]!
export const GET_STUDENT_ASSIGNMENT_BY_ID = gql`
  query getAllStudentAssignmentsById($id: String!) {
    getAllStudentAssignmentsById(id: $id) {  
      AssignmentId
      StudentAssignmentId
      CourseId
      CourseName
      TutorId
      StudentName
      AssignmentName
      Description
      StartDate
      EndDate
      Attachment{
        AttachmentId
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      StudentAttachment{
        AttachmentId
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      Tutor{
        id
        Firstname
      }
      TotalMarks
      ObtainedMarks
      TutorComment
      Status

    }
  }
`;

// studentAssignmentById(
//   id: String!
//   ): StudentAssignment!
// getStudentAssignmentsById(
//   id: String!
//   ): StudentAssignments!
export const GET_STUD_ASSIGNMENT_BY_ID_STUD = gql`
  query getStudentAssignmentsById($id: String!) {
    getStudentAssignmentsById(id: $id) {
      AssignmentId
      StudentAssignmentId
      CourseId
      CourseName
      TutorId
      StudentName
      AssignmentName
      Description
      StartDate
      EndDate
      CourseTime
      Attachment{
        AttachmentId
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      StudentAttachment{
        AttachmentId
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      Tutor{
        id
        Firstname
      }
      TotalMarks
      ObtainedMarks
      TutorComment
      Status
    }
  }
`;
export const GET_STUD_ASSIGNMENT_BY_ID = gql`
  query getStudentAssignmentsByStudentAssignmentId($StudentAssignmentId: String!) {
    getStudentAssignmentsByStudentAssignmentId(StudentAssignmentId: $StudentAssignmentId) {
      AssignmentId
      StudentAssignmentId
      CourseId
      CourseName
      TutorId
      StudentName
      AssignmentName
      Description
      StartDate
      EndDate
      CourseTime
      AssignStudentsIds
      TotalMarks
      ObtainedMarks
      Status

    }
  }
`;
// updateStudentAssignment(
//   updateStudentAssignmentInput: UpdateStudentAssignmentInput!
//   id: String!
//   ): StudentAssignment!
export const UPDATE_STUDENT_ASSIGNMENT = gql`
    mutation updateStudentAssignment($updateStudentAssignmentInput: UpdateStudentAssignmentInput!, $id: String!) {
      updateStudentAssignment(updateStudentAssignmentInput: $updateStudentAssignmentInput, id: $id) {
        id
        StudentId
        AssignmentId
        Attachment{
          AttachmentId
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
      }
    }
  `;

// getAssignmentsByStudentAssignmentId(
//   StudentAssignmentId: String!
//   ): StudentAssignments!

export const GET_ASSIGN_BY_STU_ASSIGN = gql`
    query getAssignmentsByStudentAssignmentId($StudentAssignmentId: String!) {
      getAssignmentsByStudentAssignmentId(StudentAssignmentId: $StudentAssignmentId) {
        AssignmentId
        StudentAssignmentId
        CourseId
        CourseName
        TutorId
        StudentName
        AssignmentName
        Description
        StartDate
        EndDate
        Attachment {
          AttachmentId
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        StudentAttachment{
          AttachmentId
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        TotalMarks
        ObtainedMarks
        TutorComment
        Status
      }
    }
  `;

export const GET_ALL_TUTORS_COURSES = gql`
  query {
    getAllCoursesForCurrentTutor {
      id
      CourseName
      CourseCategory
      CourseCreditHours
      CourseDescription
      CourseAssignments
      CourseOutcomes
      CourseGuidelines
      CourseTime
      EnrolledCourseTime
      CourseScheduler{
        ScheduleId
        Title
        Description
        
        SchedulerStartTime
        SchedulerEndTime
        CourseTime
        Tutor{
          id
          Firstname
        }
      }
      EnrolledUsers{
        id
        Firstname
      }
    }
  }
`;

// approveTutorsCourse(
//   CourseId: String!
//   id: String!
//   ): Users!
export const APPROVE_TUTOR_SINGLE_COURSE = gql`
    mutation approveTutorsCourse($CourseId: String!, $id: String!) {
      approveTutorsCourse(CourseId:$CourseId, id: $id) {
        id
        accessToken
        Firstname
        Lastname
        DOB
        Email
        ContactNo
        Address1
        Address2
        City
        Country
        Courses{
          id
          CourseName
        }
        Interests
        Status
          
      }
    }
  `;

// rejectTutorsCourse(
//   CourseId: String!
//   id: String!
//   ): Users!

export const REJECT_TUTOR_SINGLE_COURSE = gql`
  mutation rejectTutorsCourse($CourseId: String!, $id: String!) {
    rejectTutorsCourse(CourseId:$CourseId, id: $id) {
      id
      accessToken
      Firstname
      Lastname
      DOB
      Email
      ContactNo
      Address1
      Address2
      City
      Country
      Courses{
        id
        CourseName
      }
      Interests
      Status
        
    }
  }
`;


// getAllCoursesForTutor
// Query.getAllCoursesForTutor(
// id: String!
// ): [Courses!]!

export const GET_TUTOR_COURSES_BY_ID = gql`
    query getAllCoursesForTutor($id: String!) {
      getAllCoursesForTutor(id: $id) {
        id
        CourseName
        CourseCategory
        CourseCreditHours
        CourseDescription
        CourseAssignments
        CourseOutcomes
        Status
      }
    }
  `;
// getAllScheduler: [SchedulerType!]!
export const GET_ALL_SCHEDULES = gql`
  query {
    getAllScheduler{
      Description
      ScheduleId
      Title
      SchedulerStartTime
      SchedulerEndTime
      CourseTime
    }
  }
`;
export const SAVE_PAYMENT = gql`
mutation createPayment($createPaymentInput: CreatePaymentInput!) {
  createPayment(createPaymentInput: $createPaymentInput) {
    CourseId
    FirstName
    LastName
    Zipcode
    Country
    City
    Address
      
  }
}`

// submitPayment(
//   submitPaymentInput: SubmitPaymentInput!
//   ): Payments!
export const SUBMIT_PAYMENT = gql`
mutation submitPayment($submitPaymentInput: SubmitPaymentInput!) {
  submitPayment(submitPaymentInput: $submitPaymentInput) {
    CourseId
    FirstName
    LastName
    Zipcode
    Country
    City
    Address
      
  }
}`

// getAllPayments: [Payments!]!
export const GET_ALL_STU_PAYMENTS = gql`
query {
  getCurrentStudentPayments {
    id
    CourseId
    StudentId
    FirstName
    LastName
    Zipcode
    Country
    City
    Address
    Attachment{
      AttachmentFileName
      AttachmentFileHandle
      AttachmentFileType
      AttachmentFileSize
    }
    Status
    IsSubmitted
    CourseName
    StudentName
    }
  }
`;

export const GET_ALL_SUBMITTED_PAYMENTS = gql`
query {
  getSubmittedPayments {
    id
    CourseId
    StudentId
    Price
    FirstName
    LastName
    Zipcode
    Country
    City
    Address
    Attachment{
      AttachmentFileName
      AttachmentFileHandle
      AttachmentFileType
      AttachmentFileSize
    }
    Status
    IsSubmitted
    CourseName
    StudentName
    }
  }
`;

// Mutation.approvePayment(
//   id: String!
//   ): Payments!
//   Mutation.rejectPayment(
//   id: String!
//   ): Payments!

export const APPROVE_PAYMENT = gql`
    mutation approvePayment($id: String!, $studentId: String!) {
      approvePayment(id:$id, studentId:$studentId) {
        id
          
      }
    }
  `;

export const REJECT_PAYMENT = gql`
    mutation rejectPayment($id: String!, $studentId: String!) {
      rejectPayment(id:$id, studentId:$studentId) {
        id 
      }
    }
  `;
// getPaymentById(
//   id: String!
//   ): Payments!
export const GET_PAYMENT_BY_ID_STUD = gql`
  query getPaymentById($id: String!) {
    getPaymentById(id: $id) {
      StudentId
      FirstName
      LastName
      Zipcode
      Country
      City
      Address
      Attachment{
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      Status
      IsSubmitted
      CourseName
      StudentName
      Price
  }
}
`;

// getPaymentByCourseId(
//   id: String!
//   ): Payments!
export const GET_PAYMENT_BY_ID_COURSE = gql`
  query getPaymentByCourseId($id: String!) {
    getPaymentByCourseId(id: $id) {
      id
      CourseId
      StudentId
      FirstName
      LastName
      Zipcode
      Country
      City
      Address
      Attachment{
        AttachmentFileName
        AttachmentFileHandle
        AttachmentFileType
        AttachmentFileSize
      }
      Status
      IsSubmitted
      CourseName
      StudentName
      CourseCreditHours
      Price
      AverageRating
  }
}
`;

// updatePayment(
//   updatePaymentInput: UpdatePaymentInput!
//   id: String!
//   ): Payments!
export const UPDATE_PAYMENT_STU = gql`
    mutation updatePayment($updatePaymentInput: UpdatePaymentInput!, $id: String!) {
      updatePayment(updatePaymentInput: $updatePaymentInput, id: $id) {
        id
        CourseId
        StudentId
        FirstName
        LastName
        Zipcode
        Country
        City
        Address
        Attachment{
          AttachmentFileName
          AttachmentFileHandle
          AttachmentFileType
          AttachmentFileSize
        }
        Status
        IsSubmitted
        CourseName
        StudentName
        Price
      }
    }
  `;

// getSchedulerById(
//   scheduleId: String!
//   courseId: String!
//   ): SchedulerType!
export const GET_SCHEDULE_BY_ID_COURSE = gql`
  query getSchedulerById($scheduleId: String!,  $courseId: String!) {
    getSchedulerById(scheduleId: $scheduleId, courseId: $courseId,) {
      ScheduleId
      Title
      Description
      SchedulerStartTime
      SchedulerEndTime
      CourseTime
      AbsentReason
      Tutor{
        id
        Firstname
      }

      AppliedForLeave
  }
}
`;
// applyLeave(
//   createLeaveAttendanceInput: CreateLeaveAttendanceInput!
//   ): Attendances!
export const APPLY_LEAVE_TUTOR = gql`
mutation applyLeave($createLeaveAttendanceInput: CreateLeaveAttendanceInput!) {
  applyLeave(createLeaveAttendanceInput: $createLeaveAttendanceInput) {
    id
    ScheduleId
    CourseName
    TutorId
    StudentId
    Attendance
    Status
    AbsentReason 
  }
}
`;
// Mutation.approveLeave(
//   id: String!
//   ): Attendances!


export const APPROVE_LEAVE = gql`
    mutation approveLeave($id: String!) {
      approveLeave(id:$id) {
        id
        ScheduleId
        CourseName
        TutorId
        StudentId
        Attendance
        Status
        AbsentReason
        Tutor{
          id
          Firstname
        }
        Student{
          id
          Firstname
        }
          
      }
    }
  `;

//   Mutation.rejectLeave(
//   id: String!
//   ): Attendances!
export const REJECT_LEAVE = gql`
    mutation rejectLeave($id: String!) {
      rejectLeave(id:$id) {
        id
        ScheduleId
        CourseName
        TutorId
        StudentId
        Attendance
        Status
        AbsentReason
        Tutor{
          id
          Firstname
        }
        Student{
          id
          Firstname
        }
      }
    }
  `;

//getLeaveApplications: [Attendances!]!
export const GET_ALL_LEAVE_APPLICATIONS = gql`
  query {
    getLeaveApplications {
      id
      ScheduleId
      CourseName
      TutorId
      StudentId
      Attendance
      Status
      AbsentReason
      Tutor {
        id
        Firstname
      }
      Student {
        id
        Firstname
      }
    }
  }
`;

export const GET_STUDENT_LEAVE_APPLICATIONS = gql`
  query {
    getStudentLeaveApplications {
      id
      ScheduleId
      CourseName
      TutorId
      StudentId
      Attendance
      Status
      AbsentReason
      Tutor {
        id
        Firstname
      }
      Student {
        id
        Firstname
      }
      Course
      {
        id
        CourseName
      }
      CourseTiming
      StartTime
      EndTime

      
    }
  }
`;

// getLeaveApplicationByScheduleId(
//   tutorId: String!
//   id: String!
//   ): Attendances!
export const GET_LEAVE_APPL_BY_ID = gql`
  query getLeaveApplicationByScheduleId($tutorId: String!, $id: String!) {
    getLeaveApplicationByScheduleId(tutorId:$tutorId, id: $id) {
      id
      ScheduleId
      CourseName
      TutorId
      StudentId
      Attendance
      Status
      AbsentReason
      Tutor {
        id
        Firstname
      }
      Student {
        id
        Firstname
      }
  }
}
`;

export const FILE_STACK = {
  filePickerApi: {
    key: 'Azh60Bs63QBaRdYNUTQ8iz',
    policy: 'eyJleHBpcnkiOjQ3OTY3MDEyMDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdG9yZSIsImNvbnZlcnQiXX0=',
    signature: '88318b70beba88dd421b10fd815d91c17f5f9af84de33386f28900f056a637d1',
  },
}



export const GET_ALL_CONTACTUS = gql`
query {
  getAllContactUs {
    id
    Email
    Description
    PhoneNo
    
  }
}
`;