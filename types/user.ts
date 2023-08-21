interface User {
  photoURL: string;
  isOwner: boolean;
  isAdmin: boolean;
  member: boolean;
  github: string;
  email: string;
  name: string;
  uid: string;
}

export default User;
