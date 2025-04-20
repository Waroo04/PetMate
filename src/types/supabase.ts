export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string;
          avatar_url?: string | null;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          updated_at?: string;
          created_at?: string;
        };
      };
      pets: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          type: 'Dog' | 'Cat' | 'Parrot' | 'Turtle';
          breed: string;
          weight: number | null;
          height: number | null;
          age: number | null;
          sex: 'Male' | 'Female' | 'Unknown';
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          type: 'Dog' | 'Cat' | 'Parrot' | 'Turtle';
          breed: string;
          weight?: number | null;
          height?: number | null;
          age?: number | null;
          sex?: 'Male' | 'Female' | 'Unknown';
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          type?: 'Dog' | 'Cat' | 'Parrot' | 'Turtle';
          breed?: string;
          weight?: number | null;
          height?: number | null;
          age?: number | null;
          sex?: 'Male' | 'Female' | 'Unknown';
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          owner_id: string;
          pet_id: string;
          name: string;
          description: string | null;
          date: string;
          time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          pet_id: string;
          name: string;
          description?: string | null;
          date: string;
          time: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          pet_id?: string;
          name?: string;
          description?: string | null;
          date?: string;
          time?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Pet = Database['public']['Tables']['pets']['Row'];
export type NewPet = Database['public']['Tables']['pets']['Insert'];
export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type NewAppointment = Database['public']['Tables']['appointments']['Insert'];
export type Profile = Database['public']['Tables']['profiles']['Row'];