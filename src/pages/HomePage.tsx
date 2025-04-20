import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PetCard from '../components/common/PetCard';
import Button from '../components/common/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Pet, Appointment } from '../types/supabase';

const HomePage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch pets
        const { data: petsData, error: petsError } = await supabase
          .from('pets')
          .select('*')
          .eq('owner_id', user.id);
          
        if (petsError) throw petsError;
        
        // Fetch appointments
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*')
          .eq('owner_id', user.id);
          
        if (appointmentsError) throw appointmentsError;
        
        setPets(petsData || []);
        setAppointments(appointmentsData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const countAppointmentsForPet = (petId: string) => {
    return appointments.filter(app => app.pet_id === petId).length;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-nunito font-bold text-neutral-800 dark:text-white">
          My Pets
        </h1>
        <Button
          onClick={() => navigate('/add-pet')}
          variant="primary"
          icon={<Plus size={18} />}
        >
          Add Pet
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-pulse flex justify-center">
            <div className="h-12 w-12 bg-primary-200 dark:bg-primary-700 rounded-full"></div>
          </div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading your pets...</p>
        </div>
      ) : pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map(pet => (
            <PetCard 
              key={pet.id}
              pet={pet}
              appointmentCount={countAppointmentsForPet(pet.id)}
              onClick={() => navigate(`/pets/${pet.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-500 mb-4">
            <PawPrintIcon size={32} />
          </div>
          <h2 className="text-xl font-nunito font-semibold text-neutral-800 dark:text-white mb-2">
            No pets added yet
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Start by adding your first pet to keep track of their information and appointments.
          </p>
          <Button
            onClick={() => navigate('/add-pet')}
            variant="primary"
            icon={<Plus size={18} />}
          >
            Add Your First Pet
          </Button>
        </div>
      )}
    </div>
  );
};

const PawPrintIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
    <path d="M11.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    <path d="M15.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    <path d="M12 16v-3" />
    <path d="M7.5 10.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    <path d="M19.5 10.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
  </svg>
);

export default HomePage;