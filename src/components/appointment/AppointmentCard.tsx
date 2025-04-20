import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Card, { CardBody } from '../common/Card';
import { Appointment } from '../../types/supabase';
import { format, parseISO } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
  petName: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, petName }) => {
  // Format date and time
  const formattedDate = format(parseISO(appointment.date), 'MMM dd, yyyy');
  const formattedTime = appointment.time.substring(0, 5);

  return (
    <Card className="mb-4 animate-fade-in">
      <CardBody>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-nunito font-bold text-neutral-800 dark:text-white">{appointment.name}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-open-sans">
              For: {petName}
            </p>
            {appointment.description && (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-open-sans">
                {appointment.description}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-accent-500">
              <Calendar size={16} className="mr-1" />
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>
            <div className="flex items-center text-secondary-500 mt-1">
              <Clock size={16} className="mr-1" />
              <span className="text-sm font-medium">{formattedTime}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AppointmentCard;