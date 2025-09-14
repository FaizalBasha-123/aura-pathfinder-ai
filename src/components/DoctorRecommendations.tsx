import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Stethoscope, AlertCircle } from "lucide-react";
import DoctorCard from "./DoctorCard";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  distance: string;
  nextAvailability: string;
  rating: number;
}

interface DoctorRecommendationsProps {
  carePathway: string;
  onBookAppointment: (doctorId: string) => void;
  showFallback?: boolean;
}

const DoctorRecommendations = ({ carePathway, onBookAppointment, showFallback = false }: DoctorRecommendationsProps) => {
  // Mock doctor data
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      specialization: "Family Medicine",
      distance: "1.2 km away",
      nextAvailability: "Tomorrow at 2:00 PM",
      rating: 4.8
    },
    {
      id: "2", 
      name: "Dr. Michael Rodriguez",
      specialization: "Internal Medicine",
      distance: "2.3 km away", 
      nextAvailability: "Today at 4:30 PM",
      rating: 4.9
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialization: "General Practice",
      distance: "0.8 km away",
      nextAvailability: "Tomorrow at 10:00 AM", 
      rating: 4.7
    }
  ];

  // Check if the care pathway suggests seeing a doctor
  const shouldShowDoctors = carePathway.toLowerCase().includes('doctor') || 
                           carePathway.toLowerCase().includes('physician') ||
                           carePathway.toLowerCase().includes('urgent care');

  if (!shouldShowDoctors) {
    return null;
  }

  if (showFallback) {
    return (
      <Card className="card-feature border-amber-200 bg-amber-50/50 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">
              Doctor Booking Coming Soon!
            </h3>
            <p className="text-amber-700 text-sm">
              We're expanding our network! Doctor booking will be available soon. 
              For now, here's your summary to take to any clinic.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Trust & Safety Disclaimer */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 mb-2">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <span>
          These doctor listings are for demonstration only. Always verify availability with your local healthcare provider.
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center shadow-soft">
          <Stethoscope className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Nearby Doctors Who Can Help
          </h3>
          <p className="text-muted-foreground text-sm">
            Based on your symptoms, here are available healthcare providers with booking options below.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={onBookAppointment}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorRecommendations;