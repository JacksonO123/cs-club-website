import React from "react";

export interface AnnouncementType {
  from: string;
  fromPhotoUrl: string;
  content: string;
  date: string;
  timestamp: number;
  id?: string;
}

export interface AdminType {
  name: string;
  photoUrl: string;
  email: string;
  uid: string;
}

export interface PointHistory {
  date: string;
  timestamp: number;
  reason: string;
  amount: number;
}

export interface UserType {
  uid: string;
  name: string;
  photoUrl: string;
  history: PointHistory[];
  email: string;
}

export interface RouteType {
  path: string;
  element: React.ReactNode;
  rule?: boolean;
}

export interface PathType {
  path: string;
  name: string;
  icon: React.ReactNode;
}
