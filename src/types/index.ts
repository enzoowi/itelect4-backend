import type { Types } from "mongoose";

export const UserRole = {
    Client: "Client",
    Worker: "Worker",
    Admin: "Admin",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const JobStatus = {
    Open: "Open",
    InProgress: "InProgress",
    Completed: "Completed",
    Cancelled: "Cancelled",
} as const;
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export type ID = string | number;
export type Money = number;

export interface User {
    id: ID;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
}

export interface Job {
    id: ID;
    title: string;
    description: string;
    budget: Money;
    clientId: ID;
    status: JobStatus;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export type JobDoc = Omit<Job, "id" | "clientId"> & {
  clientId: Types.ObjectId;
};

export type NewJobBody = Pick<Job, "title" | "description" | "budget" | "status">;
