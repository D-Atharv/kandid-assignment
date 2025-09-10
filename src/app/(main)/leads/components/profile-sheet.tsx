"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Minus, Send, Briefcase, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLeadsStore } from "@/app/store/use-leads-store";

interface TimelineEvent {
  title: string;
  status: "completed" | "pending" | "rejected";
  content?: string;
}

interface Sender {
  name: string;
  email: string;
  avatar?: {
    src: string;
    fallback: string;
  };
}

interface LeadProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLead: {
    id: string | number;
    name: string;
    email?: string;
    phone?: string;
    title?: string;
    company?: string;
    avatar?: {
      src: string;
      fallback: string;
    };
    author?: string;
    lastAction?: string;
    status?: string;
    sender?: Sender;
    timeline?: TimelineEvent[];
  } | null;
  onUpdateStatus: (leadId: string | number, newStatus: string) => void; // Callback
}

const StatusIcon = ({ status }: { status: TimelineEvent["status"] }) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-6 w-6 text-blue-500 bg-white z-10" />;
    case "pending":
      return (
        <div className="h-6 w-6 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-gray-200 border-4 border-white z-10" />
        </div>
      );
    default:
      return <Minus className="h-6 w-6 text-gray-400 bg-white z-10" />;
  }
};

export function LeadProfileSheet({
  open,
  onOpenChange,
  selectedLead,
  onUpdateStatus,
}: LeadProfileSheetProps) {
  const { newStatus, setNewStatus } = useLeadsStore();

  if (!selectedLead) return null;

  const timeline = selectedLead.timeline || [];
  const statusOptions = ["Pending", "Contacted", "Responded", "Converted"];

  const handleStatusChange = (status: string) => {
    setNewStatus(status);
    onUpdateStatus(selectedLead.id, status);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 overflow-y-auto"
      >
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-lg">Lead Profile</SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-4">
          <div className="relative bg-white rounded-xl shadow-lg p-6 space-y-4">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={selectedLead.avatar?.src}
                  alt={selectedLead.name}
                />
                <AvatarFallback className="text-xl">
                  {selectedLead.avatar?.fallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{selectedLead.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedLead.title} at {selectedLead.company}
                </p>
                {selectedLead.author && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Author: {selectedLead.author}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-medium border-none py-1 px-2.5 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1.5" />
                    {selectedLead.company}
                  </Badge>
                  {selectedLead.lastAction && (
                    <Badge
                      variant="outline"
                      className="bg-orange-100 text-orange-800 border-orange-200 font-medium py-1 px-2.5 flex items-center"
                    >
                      <Send className="w-3 h-3 mr-1.5" />
                      {selectedLead.lastAction}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-around gap-3 mt-4">
              <Button
                variant="default"
                onClick={() => alert(`Contacting ${selectedLead.name}...`)}
              >
                Contact
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {newStatus || selectedLead.status || "Update Status"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {statusOptions.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => handleStatusChange(status)}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {selectedLead.sender && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="font-medium text-base py-2 hover:no-underline">
                    Additional Profile Info
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center gap-3 pt-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedLead.sender.avatar?.src}
                          alt={selectedLead.sender.name}
                        />
                        <AvatarFallback>
                          {selectedLead.sender.avatar?.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {selectedLead.sender.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedLead.sender.email}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <div>
            {timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <StatusIcon status={event.status} />
                  {index < timeline.length - 1 && (
                    <div className="w-px flex-grow bg-gray-200" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="font-medium text-gray-800">{event.title}</p>
                  {event.content && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Message: {event.content}...
                      <span className="text-blue-600 cursor-pointer ml-1">
                        See More
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
