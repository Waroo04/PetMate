import React, { useState, useEffect } from "react";
import { Calendar, Clock, Tag } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import FormGroup from "../common/FormGroup";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { Pet } from "../../types/supabase";
import { format } from "date-fns";

interface AppointmentFormProps {
  onSubmit: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchPets = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("pets")
          .select("*")
          .eq("owner_id", user.id);

        if (error) throw error;
        if (data) setPets(data);
      } catch (err) {
        console.error("Error fetching pets:", err);
      }
    };

    fetchPets();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add an appointment");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const appointmentId = uuidv4();
      const appointment = {
        id: appointmentId,
        owner_id: user.id,
        pet_id: petId,
        name,
        description,
        date,
        time,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase
        .from("appointments")
        .insert([appointment]);

      if (insertError) throw insertError;

      // Set notification if browser supports it
      if (window.Notification && Notification.permission === "granted") {
        const appointmentDateTime = new Date(`${date}T${time}`);
        const currentDateTime = new Date();
        const timeDiff =
          appointmentDateTime.getTime() - currentDateTime.getTime();

        if (timeDiff > 0) {
          setTimeout(() => {
            new Notification("Pet Appointment Reminder", {
              body: `Your appointment "${name}" is scheduled now!`,
              icon: "/pet-icon.svg",
            });
          }, timeDiff);
        }
      }

      onSubmit();
    } catch (err) {
      console.error("Error adding appointment:", err);
      setError("Failed to add appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const petOptions = pets.map((pet) => ({
    value: pet.id,
    label: pet.name,
  }));

  // Set default date to today
  useEffect(() => {
    setDate(format(new Date(), "yyyy-MM-dd"));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 mb-4 bg-error-50 dark:bg-error-900 dark:bg-opacity-20 text-error-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <FormGroup>
        <Input
          label="Appointment Name"
          type="text"
          placeholder="E.g., Vet Checkup"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          icon={<Tag size={18} />}
        />

        <Select
          label="Pet"
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          options={petOptions}
          required
        />

        <Input
          label="Description"
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            icon={<Calendar size={18} />}
          />

          <Input
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            icon={<Clock size={18} />}
          />
        </div>
      </FormGroup>

      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Appointment"}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
