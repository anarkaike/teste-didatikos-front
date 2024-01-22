export default interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  brand_id?: number;
  brand_name?: string;
  stock?: number;
  city_id?: number;
  city_name?: string;
  created_by?: number;
  updated_by?: number;
  created_at?: string;
  updated_at?: string;
}
