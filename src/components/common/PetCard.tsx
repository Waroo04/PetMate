import React from "react";
import { Pet } from "../../types/supabase";
import Card, { CardBody } from "./Card";
import { PET_IMAGES } from "../../types/pet";

interface PetCardProps {
  pet: Pet;
  appointmentCount?: number;
  onClick?: () => void;
}

const PetCard: React.FC<PetCardProps> = ({
  pet,
  appointmentCount = 0,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="w-full max-w-xs mx-auto transition-transform duration-200 hover:-translate-y-1 animate-fade-in"
    >
      <div className="h-36 overflow-hidden">
        <img
          src={pet.image_url || PET_IMAGES[pet.type]}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardBody>
        <h3 className="text-lg font-nunito font-bold text-neutral-800 dark:text-white">
          {pet.name}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 font-open-sans">
          {pet.breed}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300">
            {pet.type}
          </span>
          <div className="flex items-center space-x-1">
            <span className="font-nunito text-accent-500 font-semibold">
              {appointmentCount}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {appointmentCount === 1 ? "Appointment" : "Appointments"}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PetCard;
