import {
  CircleHelp,
  Phone,
  MessageCircleReply,
  CheckCircle,
} from "lucide-react";

export type Lead = {
  id: string;
  name: string;
  title: string;
  avatar: {
    src: string;
    fallback: string;
  };
  email: string;
  company: string;
  campaignName: string;
  activity: number;
  status: "Pending" | "Contacted" | "Responded" | "Converted";
  lastContactDate: Date;
};

export const statusStyles = {
  Pending: {
    icon: CircleHelp,
    color: "bg-gray-200 text-gray-800 border-gray-300",
  },
  Contacted: {
    icon: Phone,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  Responded: {
    icon: MessageCircleReply,
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  Converted: {
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 border-green-200",
  },
};

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Alia Sharma",
    title: "Marketing Head",
    avatar: { src: "https://i.pravatar.cc/150?u=10", fallback: "AS" },
    email: "alia.s@example.com",
    company: "Innovate Inc.",
    campaignName: "Q4 Launch",
    activity: 3,
    status: "Responded",
    lastContactDate: new Date("2025-09-05"),
  },
  {
    id: "2",
    name: "Ben Carter",
    title: "Sales Director",
    avatar: { src: "https://i.pravatar.cc/150?u=11", fallback: "BC" },
    email: "ben.c@example.com",
    company: "Solutions Co.",
    campaignName: "Lead Gen 2025",
    activity: 4,
    status: "Converted",
    lastContactDate: new Date("2025-09-02"),
  },
  {
    id: "3",
    name: "Catherine D'souza",
    title: "CEO",
    avatar: { src: "https://i.pravatar.cc/150?u=12", fallback: "CD" },
    email: "c.dsouza@example.com",
    company: "Global Tech",
    campaignName: "Enterprise Outreach",
    activity: 2,
    status: "Contacted",
    lastContactDate: new Date("2025-09-07"),
  },
  {
    id: "4",
    name: "David Lee",
    title: "Product Manager",
    avatar: { src: "", fallback: "DL" },
    email: "david.lee@example.com",
    company: "Innovate Inc.",
    campaignName: "Q4 Launch",
    activity: 1,
    status: "Pending",
    lastContactDate: new Date("2025-08-20"),
  },
  {
    id: "5",
    name: "Eva Green",
    title: "HR Manager",
    avatar: { src: "https://i.pravatar.cc/150?u=14", fallback: "EG" },
    email: "eva.g@example.com",
    company: "People First",
    campaignName: "Hiring Drive",
    activity: 3,
    status: "Responded",
    lastContactDate: new Date("2025-09-06"),
  },
  {
    id: "6",
    name: "Frank Miller",
    title: "CTO",
    avatar: { src: "https://i.pravatar.cc/150?u=15", fallback: "FM" },
    email: "frank.m@example.com",
    company: "Global Tech",
    campaignName: "Enterprise Outreach",
    activity: 0,
    status: "Pending",
    lastContactDate: new Date("2025-08-15"),
  },
  {
    id: "7",
    name: "Grace Hopper",
    title: "Software Engineer",
    avatar: { src: "https://i.pravatar.cc/150?u=16", fallback: "GH" },
    email: "grace.h@example.com",
    company: "Tech Solutions",
    campaignName: "Dev Outreach",
    activity: 4,
    status: "Contacted",
    lastContactDate: new Date("2025-09-01"),
  },
  {
    id: "8",
    name: "Henry Ford",
    title: "Operations Lead",
    avatar: { src: "https://i.pravatar.cc/150?u=17", fallback: "HF" },
    email: "henry.f@example.com",
    company: "Logistics Pro",
    campaignName: "Partnership Drive",
    activity: 2,
    status: "Responded",
    lastContactDate: new Date("2025-08-28"),
  },
];
