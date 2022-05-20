interface AnnouncementType {
  from: string;
  fromPhotoUrl: string;
  content: string;
  date: string;
  timestamp: number;
  id?: string;
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
  photoUrl: string;
  history: PointHistory[];
  email: string;
}

export type {
  AnnouncementType,
  AdminType,
  PointsType,
  PointHistory,
  UserType
}