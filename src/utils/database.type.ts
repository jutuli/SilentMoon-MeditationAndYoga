export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          cart_id: number
          id: number
          product_id: number
          quantity: number
        }
        Insert: {
          cart_id: number
          id?: number
          product_id: number
          quantity?: number
        }
        Update: {
          cart_id?: number
          id?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          customer_id: string
          id: number
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: number
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: number
          status?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          email: string
          firstname: string | null
          id: string
          img_url: string | null
          lastname: string | null
          username: string | null
        }
        Insert: {
          email: string
          firstname?: string | null
          id?: string
          img_url?: string | null
          lastname?: string | null
          username?: string | null
        }
        Update: {
          email?: string
          firstname?: string | null
          id?: string
          img_url?: string | null
          lastname?: string | null
          username?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      meditation_reminders: {
        Row: {
          created_at: string
          day_of_week: string | null
          id: string
          time: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_of_week?: string | null
          id?: string
          time?: string | null
          type?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          day_of_week?: string | null
          id?: string
          time?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meditation_reminders_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          id: number
          price: number
          quality: string
          title: string
        }
        Insert: {
          id?: number
          price: number
          quality: string
          title: string
        }
        Update: {
          id?: number
          price?: number
          quality?: string
          title?: string
        }
        Relationships: []
      }
      session_tags: {
        Row: {
          created_at: string
          id: string
          session_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_id?: string
          tag_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_tags_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      session_tracks: {
        Row: {
          created_at: string
          id: string
          position: number | null
          session_id: string
          spotify_track_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          position?: number | null
          session_id?: string
          spotify_track_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          position?: number | null
          session_id?: string
          spotify_track_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_tracks_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_tracks_spotify_track_id_fkey"
            columns: ["spotify_track_id"]
            isOneToOne: false
            referencedRelation: "spotify_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          category_Id: string | null
          created_at: string
          description: string | null
          duration: number | null
          id: string
          image_URL: string | null
          title: string | null
        }
        Insert: {
          category_Id?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          image_URL?: string | null
          title?: string | null
        }
        Update: {
          category_Id?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          image_URL?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_category_Id_fkey"
            columns: ["category_Id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      spotify_tracks: {
        Row: {
          artist: string | null
          created_at: string
          duration: number | null
          id: string
          title: string | null
        }
        Insert: {
          artist?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          title?: string | null
        }
        Update: {
          artist?: string | null
          created_at?: string
          duration?: number | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          image_url: string | null
          last_name: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          image_url?: string | null
          last_name: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          image_url?: string | null
          last_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
