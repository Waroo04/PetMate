import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Weight,
  Ruler,
  Heart,
  Activity,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";
import Card, { CardBody, CardHeader } from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import AppointmentForm from "../components/appointment/AppointmentForm";
import PetForm from "../components/pet/PetForm";
import { supabase } from "../lib/supabase";
import { Pet, Appointment } from "../types/supabase";

const PetProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!id) return;

    try {
      const [petResponse, appointmentsResponse] = await Promise.all([
        supabase.from("pets").select("*").eq("id", id).single(),
        supabase
          .from("appointments")
          .select("*")
          .eq("pet_id", id)
          .order("date", { ascending: true }),
      ]);

      if (petResponse.error) throw petResponse.error;
      if (appointmentsResponse.error) throw appointmentsResponse.error;

      setPet(petResponse.data);
      setAppointments(appointmentsResponse.data || []);
    } catch (err) {
      console.error("Error fetching pet data:", err);
      setError("Failed to load pet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeletePet = async () => {
    if (!pet) return;

    try {
      // Delete all appointments first
      const { error: appointmentsError } = await supabase
        .from("appointments")
        .delete()
        .eq("pet_id", pet.id);

      if (appointmentsError) throw appointmentsError;

      // Then delete the pet
      const { error: petError } = await supabase
        .from("pets")
        .delete()
        .eq("id", pet.id);

      if (petError) throw petError;

      navigate("/");
    } catch (err) {
      console.error("Error deleting pet:", err);
      setError("Failed to delete pet");
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointmentId);

      if (error) throw error;

      setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setError("Failed to delete appointment");
    }
  };

  // Chart data preparation
  const appointmentTypes = appointments.reduce(
    (acc: Record<string, number>, curr) => {
      const type = curr.name.toLowerCase().includes("checkup")
        ? "Checkup"
        : curr.name.toLowerCase().includes("vaccine")
        ? "Vaccination"
        : curr.name.toLowerCase().includes("grooming")
        ? "Grooming"
        : "Other";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieChartData = Object.entries(appointmentTypes).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"];

  const appointmentTimeline = appointments.map((apt) => ({
    date: format(new Date(apt.date), "MMM dd"),
    name: apt.name,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-nunito font-bold text-neutral-800 dark:text-white mb-4">
          Pet not found
        </h2>
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-nunito font-bold text-neutral-800 dark:text-white">
            {pet.name}'s Profile
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {pet.breed} • {pet.type}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            icon={<Edit2 size={18} />}
          >
            {""} {/* Empty string to satisfy the children prop */}
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(true)}
            variant="outline"
            className="text-error-500 border-error-500 hover:bg-error-50"
            icon={<Trash2 size={18} />}
          >
            {""} {/* Empty string to satisfy the children prop */}
          </Button>
          <Button
            onClick={() => setIsAppointmentModalOpen(true)}
            variant="primary"
            icon={<Plus size={18} />}
          >
            {""} {/* Empty string to satisfy the children prop */}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 text-error-500 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-nunito font-semibold text-neutral-800 dark:text-white">
              Basic Information
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Weight className="text-primary-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Weight
                  </p>
                  <p className="font-semibold">{pet.weight || "N/A"} kg</p>
                </div>
              </div>
              <div className="flex items-center">
                <Ruler className="text-secondary-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Height
                  </p>
                  <p className="font-semibold">{pet.height || "N/A"} cm</p>
                </div>
              </div>
              <div className="flex items-center">
                <Heart className="text-accent-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Sex
                  </p>
                  <p className="font-semibold">{pet.sex}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Activity className="text-primary-500 mr-2" size={20} />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Age
                  </p>
                  <p className="font-semibold">{pet.age || "N/A"} years</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-nunito font-semibold text-neutral-800 dark:text-white">
              Upcoming Appointments
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{appointment.name}</p>
                      <p className="text-sm text-neutral-500">
                        {format(new Date(appointment.date), "MMM dd, yyyy")} at{" "}
                        {appointment.time.substring(0, 5)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-error-500 hover:bg-error-50"
                      icon={<Trash2 size={16} />}
                    >
                      {""} {/* Empty string to satisfy the children prop */}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-neutral-500">
                  No upcoming appointments
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-nunito font-semibold text-neutral-800 dark:text-white">
              Appointment Types
            </h2>
          </CardHeader>
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-nunito font-semibold text-neutral-800 dark:text-white">
              Appointment Timeline
            </h2>
          </CardHeader>
          <CardBody>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={appointmentTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="name" stroke="#4CAF50" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title={`Add Appointment for ${pet.name}`}
        size="lg"
      >
        <AppointmentForm
          onSubmit={() => {
            setIsAppointmentModalOpen(false);
            fetchData();
          }}
        />
      </Modal>

      {/* Edit Pet Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${pet.name}'s Information`}
        size="lg"
      >
        <PetForm
          pet={pet}
          onSubmit={() => {
            setIsEditModalOpen(false);
            fetchData();
          }}
        />
      </Modal>

      {/* Delete Pet Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Pet"
        size="md"
      >
        <div className="p-4">
          <p className="text-neutral-700 dark:text-neutral-300 mb-6">
            Are you sure you want to delete {pet.name}? This action cannot be
            undone and will also delete all associated appointments.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="text-error-500 border-error-500 hover:bg-error-50"
              onClick={handleDeletePet}
            >
              Delete Pet
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PetProfilePage;
