interface AnnouncementType {
  from: string;
  fromPhotoUrl: string;
  content: string;
  timestamp: string;
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
  history: PointHistory[];
}

export type {
  AnnouncementType,
  AdminType,
  PointsType,
  PointHistory,
  UserType
}