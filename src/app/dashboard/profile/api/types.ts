type CoachProfileQueryResponse = CoachProfile;

// question for BE - @tushar should the response CoachProfileQueryResponse have been this shape instead?
// {
//   data: CoachProfile;
//   is_success: boolean;
//   message: null | string;
// };

type CoachProfile = {
  id: string;
  created_at: string;
  modified_at: string;
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
  user_id: string;
  first_name: string;
  middle_name: string;
  email?: string;
  last_name: string;
  phone_number: string;
  line_address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  profile_photo: string;
  sex: string;
  date_of_birth: string;
  height_in_cm: number;
  weight_in_gm: number;
  age: number;
  is_profile_updated: boolean;
  bio: string;
  coach_type: Array<string>;
  certifications: Array<string>;
  specializations: Array<string>;
  offered_subscription_plan_types: Array<string>;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
};

type CoachProfilePatchRequest = Partial<CoachProfile>;
