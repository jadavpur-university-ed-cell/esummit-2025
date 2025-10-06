import { Role } from '@/types/all';

type Permission =
    | "READ_USERS"
    | "CRUD_USERS"
    | "VERIFY_PAYMENTS"
    | "DOWNLOAD_EXCEL"
    | "SEND_EMAIL"
    | "OPEN_REGISTRATION"
    | "CLOSE_REGISTRATION"
    | "MANAGE_MERCHANDISE"
    | "CRUD_ADMINS"
    | "ISSUE_CERTIFICATES"
    | "ISSUE_ID_CARDS";

const adminPermissions = [
    "SEND_EMAIL",
    "DOWNLOAD_EXCEL",
    "READ_USERS",
    "CRUD_USERS",
    "OPEN_REGISTRATION",
    "CLOSE_REGISTRATION",
    "VERIFY_PAYMENTS",
] as const;

const rolePermissions: Record<Role, Permission[]> = {
    [Role.USER]: [],
    [Role.REFERRED_USER]: [],
    [Role.CAMPUS_AMBASSADOR]: [],
    [Role.ADMIN]: [...adminPermissions],
    [Role.SUPER_ADMIN]: [...adminPermissions, "MANAGE_MERCHANDISE", "CRUD_ADMINS", "ISSUE_CERTIFICATES", "ISSUE_ID_CARDS"],
};

export function checkPermission(userRole: Role, permission: Permission): boolean {
  return rolePermissions[userRole].includes(permission);
}