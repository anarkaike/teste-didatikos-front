export default interface IUser {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  email_verified_at?: string | null;
  password?: string | null;
  password2?: string | null;
  created_at?: string | null;
  created_by?: number | null;
  updated_at?: string | null;
  updated_by?: number | null;
}
