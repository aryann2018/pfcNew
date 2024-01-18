export type ClientType = {
  id: string;
  created_at: Date;
  modified_at: Date;
  created_by: {
    id: string;
    email: string;
    last_name: string;
    user_type: string;
    first_name: string;
    middle_name: string;
    phone_number: string;
  };
  modified_by: {
    id: string;
    email: string;
    last_name: string;
    user_type: string;
    first_name: string;
    middle_name: string;
    phone_number: string;
  };
  first_name: string;
  middle_name: string;
  last_name: string;
  user_type: string;
  phone_number: string;
  email: string;
  line_address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  sex: string;
  date_of_birth: string;
  height_in_cm: number;
  weight_in_gm: number;
  age: number;
  bmi: number;
  is_profile_updated: boolean;
  allergies?: string[];
};

export type SubscriptionType = {
  id: string;
  created_at: Date;
  modified_at: Date;
  start_date: string;
  duration_in_days: number;
  end_date: string;
  is_active: boolean;
  is_paused: boolean;
  number_of_clients: number;
  inclusions: string[];
  type: string;
  clients: ClientType[];
};

export type QuerySubscriptionsResponse = {
  data: SubscriptionType[];
};
