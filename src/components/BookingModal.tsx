import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onConfirmBooking: (doctorId: string, date: Date, time: string) => void;
}

const BookingModal = ({ isOpen, onClose, doctor, onConfirmBooking }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  // Simulate available time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleConfirm = () => {
    if (doctor && selectedDate && selectedTime) {
      onConfirmBooking(doctor.id, selectedDate, selectedTime);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    onClose();
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-lg font-semibold">{doctor.name}</div>
              <Badge variant="secondary" className="text-xs">
                {doctor.specialization}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <label className="text-sm font-medium">Select Date</label>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => 
                date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              }
              initialFocus
              className={cn("rounded-md border pointer-events-auto")}
            />
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Available Times - {format(selectedDate, "EEEE, MMMM d")}
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "text-xs",
                      selectedTime === time && "bg-primary text-primary-foreground"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation */}
          {selectedDate && selectedTime && (
            <div className="bg-muted rounded-lg p-4 animate-fade-in">
              <h4 className="font-medium mb-2">Appointment Summary</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Doctor:</strong> {doctor.name}</p>
                <p><strong>Date:</strong> {format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="btn-hero flex-1"
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;