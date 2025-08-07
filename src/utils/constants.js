export const UserRolesEnum = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student"
}

export const AvailableUserRoles = Object.values(UserRolesEnum)


export const AnnouncementPriorityEnum = {
    NORMAL: "normal",
    HIGH: "high"
}

export const AvailablePriority = Object.values(AnnouncementPriorityEnum)


export const ResultStatusEnum = {
    PASS: "pass",
    FAIL: "fail"
}

export const CurrentStatus = Object.values(ResultStatusEnum)