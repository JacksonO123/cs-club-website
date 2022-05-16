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

export type {
  AnnouncementType,
  AdminType,
  PointsType
}