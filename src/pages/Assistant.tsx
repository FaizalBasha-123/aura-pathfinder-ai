import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Mic, Copy, Download, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import DoctorRecommendations from "@/components/DoctorRecommendations";
import BookingModal from "@/components/BookingModal";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SummaryData {
  symptoms: string[];
  duration: string;
  severity: string;
  carePathway: string;
  additionalNotes: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi, I'm Cura. I'm here to help guide you through understanding your symptoms and finding the right next step for care. Can you tell me what symptoms you're experiencing?",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [conversationStep, setConversationStep] = useState(0);
  const [summaryData, setSummaryData] = useState<SummaryData>({
    symptoms: [],
    duration: '',
    severity: '',
    carePathway: '',
    additionalNotes: ''
  });
  const [showSummary, setShowSummary] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<{id: string, name: string, specialization: string} | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<{doctorName: string, date: Date, time: string} | null>(null);
  const { toast } = useToast();

  const conversationFlow = [
    {
      question: "Thank you for sharing that. How long have you been experiencing these symptoms?",
      dataField: 'duration'
    },
    {
      question: "On a scale of 1-10, how would you rate the severity of your symptoms, with 10 being the most severe?",
      dataField: 'severity'
    },
    {
      question: "Are there any other details you'd like to share about your symptoms or how they're affecting you?",
      dataField: 'additionalNotes'
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Update summary data based on conversation step
    const newSummaryData = { ...summaryData };
    
    if (conversationStep === 0) {
      newSummaryData.symptoms = inputValue.split(',').map(s => s.trim());
    } else if (conversationStep <= conversationFlow.length) {
      const currentStep = conversationFlow[conversationStep - 1];
      if (currentStep.dataField === 'duration') {
        newSummaryData.duration = inputValue;
      } else if (currentStep.dataField === 'severity') {
        newSummaryData.severity = `${inputValue}/10`;
      } else if (currentStep.dataField === 'additionalNotes') {
        newSummaryData.additionalNotes = inputValue;
      }
    }
    
    setSummaryData(newSummaryData);

    // Simulate assistant response
    setTimeout(() => {
      let assistantResponse = '';
      
      if (conversationStep < conversationFlow.length) {
        assistantResponse = conversationFlow[conversationStep].question;
        setConversationStep(prev => prev + 1);
      } else {
  // Generate care pathway recommendation
  // Use the stored severity from the summary (e.g. "6/10") when deciding pathway.
  // Previously we parsed the latest inputValue which could be the follow-up notes (causing NaN).
  const severityNum = parseInt(newSummaryData.severity as unknown as string) || parseInt(inputValue) || 0;
        let pathway = '';
        
        if (severityNum >= 8) {
          pathway = "Emergency Care - Your symptoms seem severe. Please consider visiting an emergency room or calling emergency services immediately.";
        } else if (severityNum >= 7) {
          pathway = "Urgent Care - I recommend seeking urgent medical attention. Consider visiting an urgent care clinic or calling your doctor today.";
        } else if (severityNum >= 5) {
          pathway = "Doctor Visit - I recommend scheduling an appointment with your doctor as soon as possible.";
        } else if (severityNum >= 3) {
          pathway = "Pharmacist Consultation - Consider speaking with a pharmacist who can provide guidance and recommend over-the-counter options.";
        } else {
          pathway = "Self-Care Monitoring - Your symptoms appear mild. Monitor them closely and try gentle self-care measures.";
        }

        newSummaryData.carePathway = pathway;
        setSummaryData(newSummaryData);

        // Custom assistant response based on pathway
        if (pathway.toLowerCase().includes("self-care")) {
          assistantResponse = `Based on what you've shared, here's my recommendation: ${pathway}\n\nI've prepared a summary of our conversation that you can review.`;
        } else if (pathway.toLowerCase().includes("pharmacist")) {
          assistantResponse = `Based on what you've shared, here's my recommendation: ${pathway}\n\nNote: You may wish to consult a pharmacist for further advice.\n\nI've prepared a summary of our conversation that you can review.`;
        } else if (pathway.toLowerCase().includes("doctor") || pathway.toLowerCase().includes("urgent care")) {
          assistantResponse = `Based on what you've shared, here's my recommendation: ${pathway}\n\nI've prepared a summary and found nearby doctors who can help. Would you like to book an appointment?`;
        } else {
          assistantResponse = `Based on what you've shared, here's my recommendation: ${pathway}\n\nI've prepared a summary of our conversation that you can review.`;
        }
        setConversationStep(prev => prev + 1);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBookAppointment = (doctorId: string) => {
    // Mock doctor data for booking
    const doctors = {
      "1": { id: "1", name: "Dr. Sarah Chen", specialization: "Family Medicine" },
      "2": { id: "2", name: "Dr. Michael Rodriguez", specialization: "Internal Medicine" },
      "3": { id: "3", name: "Dr. Priya Sharma", specialization: "General Practice" }
    };
    
    const doctor = doctors[doctorId as keyof typeof doctors];
    if (doctor) {
      setSelectedDoctor(doctor);
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = (doctorId: string, date: Date, time: string) => {
    const doctorName = selectedDoctor?.name || "Doctor";
    setBookedAppointment({ doctorName, date, time });
    setBookingConfirmed(true);
    
    // Add confirmation message to chat
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant', 
      content: `Great! Your appointment with ${doctorName} has been booked for ${format(date, "EEEE, MMMM d, yyyy")} at ${time}. You'll receive a confirmation email shortly with all the details and location information.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctorName} is confirmed for ${format(date, "MMM d")} at ${time}`,
    });
  };

  const formatSummary = () => {
    return `
PATIENT SYMPTOM SUMMARY

Symptoms Reported:
• ${summaryData.symptoms.join('\n• ')}

Duration: ${summaryData.duration}
Severity Rating: ${summaryData.severity}

Care Pathway Recommended:
${summaryData.carePathway}

Additional Notes:
${summaryData.additionalNotes}

Generated by Cura Health Assistant
Date: ${new Date().toLocaleDateString()}
    `.trim();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatSummary());
      toast({
        title: "Copied to clipboard",
        description: "Summary has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([formatSummary()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cura-health-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Summary downloaded",
      description: "Your health summary has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Disclaimer Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20 py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">
            This is a demo prototype. Not a substitute for medical advice.
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col shadow-card">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="px-4">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Doctor Recommendations */}
          {conversationStep > conversationFlow.length && summaryData.carePathway && (
            <div className="mt-8 animate-fade-in">
              <DoctorRecommendations 
                carePathway={summaryData.carePathway}
                onBookAppointment={handleBookAppointment}
                showFallback={false}
              />
            </div>
          )}

          {/* Booking Confirmation */}
          {bookingConfirmed && bookedAppointment && (
            <Card className="mt-6 border-green-200 bg-green-50/50 animate-fade-in">
              <div className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">
                    ✅ Your appointment with {bookedAppointment.doctorName} has been booked for {format(bookedAppointment.date, "EEEE, MMMM d, yyyy")} at {bookedAppointment.time}.
                  </h3>
                  <Button className="btn-secondary mt-4" onClick={() => setShowSummary(true)}>
                    Return to Summary
                  </Button>
                </div>
                <div className="mt-6">
                  <Button onClick={downloadSummary} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Summary (PDF)
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Generate Summary Button */}
          {conversationStep > conversationFlow.length && (
            <div className="mt-6 text-center animate-fade-in">
              <Dialog open={showSummary} onOpenChange={setShowSummary}>
                <DialogTrigger asChild>
                  <Button className="btn-hero">
                    Generate Summary for Doctor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Doctor-Ready Summary</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {formatSummary()}
                      </pre>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} className="flex-1">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </Button>
                      <Button onClick={downloadSummary} variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
          
          {/* Booking Modal */}
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => {
              setShowBookingModal(false);
              setSelectedDoctor(null);
            }}
            doctor={selectedDoctor}
            onConfirmBooking={handleConfirmBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default Assistant;