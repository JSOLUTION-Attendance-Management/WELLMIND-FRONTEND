export type ProfileCardItem = {
  id: string
  name: string
  photo: string
  email: string
  buttonMod: 'MESSAGE' | 'EDIT'
  onButtonClick: (id: string) => void
  onClick: (id: string) => void
}

export type GraphItem = {
  time: string[]
  date: string[]
  type: 'small' | 'big'
}

export type MenuButtonItem = {
  content: string
  color: 'light' | 'dark'
  onButtonClick: () => void
}

export type MainReportItem = {
  id: string
  date: string
  name: string
  type: string
  progress: string
  isNew: boolean
}

export type MainReportTable = MainReportItem[]

export type CommuteReportItem = {
  id: string
  date: string
  type: string
  goTime: string
  leaveTime: string
  isLate: boolean
}

export type CommuteReportTable = CommuteReportItem[]

export type PaginationItem = {
  currentPage: number
  totalPage: number
}

export type TransferDeptItem = {
  id: string
  date: string
  type: string
  previous: string
  update: string
  reason: string
  recipient: string
}

export type TransferDeptTable = TransferDeptItem[]

export type EmployeeReportItem = {
  id: number
  date: string
  name: string
  type: string
  progress: 'Waiting' | 'Done'
  comment: boolean
  onClick: (id: number) => void
}

export type LoginRequest = {
  employeeId: string
  password: string
}

export type MyProfileResponse = {
  data: {
    name: string
    departName: string
    positionName: string
    email: string
    phoneNum: string
    authType: 'M' | 'N'
    photo?: string
    address?: {
      postalCode: string
      address: string
      address_detail: string
    }
  }
}

type Attendance = {
  date: string
  time: string
}

export type RecentAttendancesResponse = {
  data: Attendance[]
}

export type PagingRequestParams = {
  page?: number
  size?: number
  sort?: string[]
}

export type CommuteItem = {
  attendStatus: string
  date: string
  time: string
  timeSec: string
}

export type CommuteResponseParams = {
  data: {
    content: CommuteItem[]
    totalElements: number
    totalPages: number
  }
}

export type TransferItem = {
  id: number
  managerName: string
  modDate: string
  newPosition: string
  previousPosition: string
  transferReason: string
  transferType: string
}

export type TransferResponseType = {
  content: TransferItem[]
  totalElements: number
  totalPages: number
}

export type ProfileReportItem = {
  reportId: number
  registeredDate: string
  modifiedDate: string
  reportType: string
}

export type ProfileReportResponseType = {
  data: ProfileReportItem[]
}

export type MyReportItem = {
  reportId: number
  registeredDate: string
  reportType: string
  reportedEmployeeId: string
  reportedEmployeeName: string
}

export type MyReportDetailItem = {
  data: {
    reportId: number
    registeredDate: string
    modifiedDate: string
    aiComment: string
    managerComment: string
    reportType: string
    reportedEmployeeId: string
    reportedEmployeeName: string
    keywords: string[][]
    departmentAndPosition: string
    hireDate: string
    email: string
    birthDate: string
  }
}

export type SimpleEmployeeItem = {
  name: string
  email: string
  id: number
  photo: string
  departName: string
  positionName: string
  employeeId: string
}

export type SimpleEmployeeType = {
  content: SimpleEmployeeItem[]
}

export type MyProfileDetailItem = {
  employeeId: string
  education: string[]
  regNumberFor: string
  regNumberLat: string
  userInfo: {
    hobby: string
    long: boolean
    significant: string
    hireDate: string
  }
  userSignificant: {
    chronicDiseases: string[]
    jobCategory: string
    maritalStatus: string
    skipBreakfast: boolean
    sllepHours: number
    smokier: boolean
  }
}

export type MyProfileDetailType = {
  data: MyProfileDetailItem
}

export type EmployeeDetailItem = {
  departName: string
  positionName: string
  education: string[]
  userInfo?: {
    address: {
      address: string
      address_detail: string
      postalCode: string
    }
    hireDate: string
    hobby: string
    long: boolean
    photo: string
    significant: string
  }
  userTopDto?: {
    authType: 'M' | 'N'
    email: string
    employeeId: string
    name: string
    phoneNum: string
  }
}

export type EmployeeDetailType = {
  data: EmployeeDetailItem
}

export type SimpleReportItem = {
  registeredDate: string
  reportId: number
  reportType: string
  reportedEmployeeId: string
  reportedEmployeeName: string
}

export type ReportsType = {
  data: {
    content: SimpleReportItem[]
  }
}

export type NewEmployeeItem = {
  email: string
  name: string
  phoneNum: string
  authType: string
  employeeId: string
  departName: string
  positionName: string
}

export type NewEmployeeResponse = {
  message: string
  data: NewEmployeeItem | null
  count: number | null
  state: string | null
}

export type ModifyPasswordItem = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}
