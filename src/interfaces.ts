interface AnnouncementType {
  from: string;
  fromPhotoUrl: string;
  content: string;
  date: string;
  timestamp: number;
}

interface AdminType {
  name: string;
  photoUrl: string;
  email: string;
  uid: string;
}

interface PointsType {
  name: string;
  points: number;
}

interface PointHistory {
  date: string;
  timestamp: number;
  reason: string;
  amount: number;
}

interface UserType {
  uid: string;
  name: string;
  points: number;
  photoUrl: string;
  history: PointHistory[];
}

export type {
  AnnouncementType,
  AdminType,
  PointsType,
  PointHistory,
  UserType
}