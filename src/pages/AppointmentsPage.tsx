import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Button from "../components/common/Button";
import AppointmentCard from "../components/appointment/AppointmentCard";
import AppointmentForm from "../components/appointment/AppointmentForm";
import Modal from "../components/common/Modal";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Appointment, Pet } from "../types/supabase";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } =
          await supabase
            .from("appointments")
            .select("*")
            .eq("owner_id", user.id)
            .order("date", { ascending: true });

        if (appointmentsError) throw appointmentsError;

        // Fetch pets
        const { data: petsData, error: petsError } = await supabase
          .from("pets")
          .select("*")
          .eq("owner_id", user.id);

        if (petsError) throw petsError;

        setAppointments(appointmentsData || []);
        setPets(petsData || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getPetName = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    return pet ? pet.name : "Unknown Pet";
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    // Refresh appointments after adding a new one
    if (user) {
      supabase
        .from("appointments")
        .select("*")
        .eq("owner_id", user.id)
        .order("date", { ascending: true })
        .then(({ data }) => {
          if (data) setAppointments(data);
        });
    }
  };

  // Request notification permission
  useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-nunito font-bold text-neutral-800 dark:text-white">
          Appointments
        </h1>
        <div className="flex justify-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="accent"
            icon={<Plus size={18} />}
          >
            Appointment
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-pulse flex justify-center">
            <div className="h-12 w-12 bg-accent-200 dark:bg-accent-700 rounded-full"></div>
          </div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Loading appointments...
          </p>
        </div>
      ) : appointments.length > 0 ? (
        <div>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              petName={getPetName(appointment.pet_id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-500 mb-4">
            <Calendar size={32} />
          </div>
          <h2 className="text-xl font-nunito font-semibold text-neutral-800 dark:text-white mb-2">
            No appointments scheduled
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Add your first appointment to stay on top of your pet's health and
            care schedule.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="accent"
              icon={<Plus size={18} />}
            >
              Schedule Appointment
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Appointment"
        size="lg"
      >
        <AppointmentForm onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

const Calendar = ({ size }: { size: number }) => (
  <svg
    width={size + 6}
    height={size + 6}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export default AppointmentsPage;
