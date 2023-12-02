export type SubscriptionType = {
  id: string;
  created_at: string;
  modified_at: string;
  subscription_plan: {
    id: string;
    created_at: string;
    modified_at: string;
    type: string;
    description: string;
    inclusions: any[];
    price: string;
    duration_in_days: number;
    number_of_clients: number;
  };
  client: {
    id: string;
    created_at: string;
    modified_at: string;
    created_by: {
      property1: any;
      property2: any;
    };
    modified_by: {
      property1: any;
      property2: any;
    };
    first_name: string;
    middle_name: string;
    user_type: string;
    phone_number: string;
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
    is_profile_updated: true;
    activity_level: string;
    somatotype: string;
    dietary_habits: string;
    fitness_notes: string;
    medical_conditions: string;
    allergies: string;
    bmi: number;
    bmi_category: string;
    bmr: number;
    tdee: number;
  };
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_paused: boolean;
};

export type QuerySubscriptionsResponse = {
  data: SubscriptionType[];
};
