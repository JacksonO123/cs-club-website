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

export type {
  AnnouncementType,
  AdminType
}