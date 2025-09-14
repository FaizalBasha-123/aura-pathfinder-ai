import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialization: string;
    distance: string;
    nextAvailability: string;
    rating: number;
    image?: string;
  };
  onBookAppointment: (doctorId: string) => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  return (
    <Card className="card-feature hover:border-primary/20 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center shadow-soft flex-shrink-0">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              {doctor.name}
            </h3>
            <Badge variant="secondary" className="mt-1">
              {doctor.specialization}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>{doctor.distance}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>Next: {doctor.nextAvailability}</span>
            </div>
          </div>
          
          <Button 
            onClick={() => onBookAppointment(doctor.id)}
            className="btn-secondary w-full"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;