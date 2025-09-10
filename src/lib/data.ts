import {
  CircleHelp,
  Phone,
  MessageCircleReply,
  CheckCircle,
  CircleCheck,
  CircleOff,
} from "lucide-react";

export type Campaign = {
  id: string;
  name: string;
  description?: string;
  status: "Active" | "Inactive";
  totalLeads: number;
  requestStatus: { success: number; pending: number; failed: number };
  connectionStatus: { connected: number; invited: number };
  createdAt: string;
  owner?: string;
};

export const mockCampaigns: Campaign[] = Array.from({ length: 60 }).map(
  (_, i) => {
    const id = String(i + 1);
    const success = Math.floor(Math.random() * 30);
    const pending = Math.floor(Math.random() * 20);
    const failed = Math.floor(Math.random() * 5);
    const connected = Math.floor(Math.random() * 10);
    const invited = Math.floor(Math.random() * 5);
    return {
      id,
      name: `Campaign ${i + 1}`,
      description: `Quick description for Campaign ${i + 1}`,
      status: Math.random() > 0.2 ? "Active" : "Inactive",
      totalLeads: success + pending + failed + connected,
      requestStatus: { success, pending, failed },
      connectionStatus: { connected, invited },
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
      ).toISOString(),
      owner: i % 2 === 0 ? "Marketing" : "Growth",
    };
  }
);

export const campaignStatusStyles = {
  Active: {
    icon: CircleCheck,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  Inactive: {
    icon: CircleOff,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

export type Lead = {
  id: string;
  name: string;
  title: string;
  avatar: { src: string; fallback: string };
  email: string;
  company: string;
  campaignName: string;
  activity: number;
  status: "Pending" | "Contacted" | "Responded" | "Converted";
  lastContactDate: Date;
  author?: string;
  lastAction?: string;
  sender?: {
    name: string;
    email: string;
    avatar?: { src: string; fallback: string };
  };
  timeline?: Array<{
    title: string;
    status: "completed" | "pending" | "rejected";
    content?: string;
  }>;
};
/**
 * Mock data representing a list of enriched lead objects for testing or development purposes.
 *
 * Each lead contains detailed information including:
 * - Personal and professional details (name, title, email, company)
 * - Campaign and activity metadata
 * - Status and last contact information
 * - Author and sender details
 * - Timeline of interactions, with status and content for each step
 *
 * This mock dataset is useful for simulating CRM, outreach, or sales pipeline scenarios.
 *
 * @remarks
 * The structure assumes the existence of a `Lead` type/interface describing the shape of each lead object.
 *
 * @example
 * ```typescript
 * import { mockLeads } from './data';
 * 
 * // Access the first lead's name
 * const firstLeadName = mockLeads[0].name;
 * ```
 */
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
    author: "रंग और यादें",
    lastAction: "Replied 2 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Alia, connecting you for Q4 Launch...",
      },
      {
        title: "Connection Status",
        status: "completed",
        content: "Connection accepted",
      },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Did you get the proposal?",
      },
      {
        title: "Reply",
        status: "completed",
        content: "Thanks, looking forward to collaborating",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "Deal Closed 1 day ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Ben, let's connect for Lead Gen 2025",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      { title: "Follow-up 1", status: "completed", content: "Shared proposal" },
      {
        title: "Follow-up 2",
        status: "completed",
        content: "Received approval",
      },
      {
        title: "Converted",
        status: "completed",
        content: "Deal successfully closed",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "Message sent 3 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Catherine, connecting for Enterprise Outreach",
      },
      {
        title: "Connection Status",
        status: "completed",
        content: "Connection pending",
      },
      {
        title: "Follow-up 1",
        status: "pending",
        content: "Follow-up message scheduled",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "Connection sent 2 days ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi David, let's connect for Q4 Launch",
      },
      {
        title: "Connection Status",
        status: "pending",
        content: "Waiting for connection acceptance",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "Replied 4 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Eva, connecting for Hiring Drive opportunity",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Sent hiring proposal",
      },
      {
        title: "Reply",
        status: "completed",
        content: "Interested, let's schedule a call",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "No response yet",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Frank, connecting for tech partnership",
      },
      {
        title: "Connection Status",
        status: "pending",
        content: "No response received",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "Follow-up sent 5 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Grace, connecting for developer opportunities",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Shared developer resources",
      },
      {
        title: "Follow-up 2",
        status: "pending",
        content: "Awaiting response on collaboration",
      },
    ],
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
    author: "रंग और यादें",
    lastAction: "Replied 1 day ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Henry, exploring logistics partnership",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Reply",
        status: "completed",
        content: "Interested in discussing partnership terms",
      },
    ],
  },
  {
    id: "9",
    name: "Isabel Martinez",
    title: "Financial Analyst",
    avatar: { src: "https://i.pravatar.cc/150?u=18", fallback: "IM" },
    email: "isabel.m@example.com",
    company: "Finance Plus",
    campaignName: "Investment Series",
    activity: 3,
    status: "Converted",
    lastContactDate: new Date("2025-09-10"),
    author: "रंग और यादें",
    lastAction: "Contract signed 6 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Isabel, connecting for investment opportunities",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Sent investment proposal",
      },
      {
        title: "Converted",
        status: "completed",
        content: "Investment agreement finalized",
      },
    ],
  },
  {
    id: "10",
    name: "Jack Thompson",
    title: "VP Sales",
    avatar: { src: "https://i.pravatar.cc/150?u=19", fallback: "JT" },
    email: "jack.t@example.com",
    company: "Growth Corp",
    campaignName: "Scale Up 2025",
    activity: 5,
    status: "Responded",
    lastContactDate: new Date("2025-09-08"),
    author: "रंग और यादें",
    lastAction: "Replied 3 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Jack, connecting for Scale Up initiative",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Shared scaling strategies",
      },
      {
        title: "Reply",
        status: "completed",
        content: "Great insights, let's discuss implementation",
      },
    ],
  },
  {
    id: "11",
    name: "Kelly Johnson",
    title: "Design Lead",
    avatar: { src: "https://i.pravatar.cc/150?u=20", fallback: "KJ" },
    email: "kelly.j@example.com",
    company: "Creative Studios",
    campaignName: "Brand Refresh",
    activity: 2,
    status: "Contacted",
    lastContactDate: new Date("2025-09-04"),
    author: "रंग और यादें",
    lastAction: "Message sent 7 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Kelly, connecting for brand refresh project",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "pending",
        content: "Awaiting response on design proposal",
      },
    ],
  },
  {
    id: "12",
    name: "Lucas Brown",
    title: "Data Scientist",
    avatar: { src: "https://i.pravatar.cc/150?u=21", fallback: "LB" },
    email: "lucas.b@example.com",
    company: "Analytics Hub",
    campaignName: "Data Insights",
    activity: 1,
    status: "Pending",
    lastContactDate: new Date("2025-08-25"),
    author: "रंग और यादें",
    lastAction: "Connection sent 5 days ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Lucas, connecting for data analytics collaboration",
      },
      {
        title: "Connection Status",
        status: "pending",
        content: "Waiting for connection acceptance",
      },
    ],
  },
  {
    id: "13",
    name: "Maria Rodriguez",
    title: "Account Manager",
    avatar: { src: "https://i.pravatar.cc/150?u=22", fallback: "MR" },
    email: "maria.r@example.com",
    company: "Client Success",
    campaignName: "Retention Drive",
    activity: 4,
    status: "Converted",
    lastContactDate: new Date("2025-09-09"),
    author: "रंग और यादें",
    lastAction: "Deal closed 8 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Maria, connecting for client retention solutions",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Presented retention strategies",
      },
      {
        title: "Converted",
        status: "completed",
        content: "Retention contract finalized",
      },
    ],
  },
  {
    id: "14",
    name: "Nathan Clark",
    title: "DevOps Engineer",
    avatar: { src: "https://i.pravatar.cc/150?u=23", fallback: "NC" },
    email: "nathan.c@example.com",
    company: "Cloud Systems",
    campaignName: "Infrastructure 2025",
    activity: 3,
    status: "Responded",
    lastContactDate: new Date("2025-09-03"),
    author: "रंग और यादें",
    lastAction: "Replied 12 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Nathan, connecting for infrastructure upgrade",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Shared infrastructure roadmap",
      },
      {
        title: "Reply",
        status: "completed",
        content: "Excellent plan, ready to proceed",
      },
    ],
  },
  {
    id: "15",
    name: "Olivia Davis",
    title: "Marketing Director",
    avatar: { src: "https://i.pravatar.cc/150?u=24", fallback: "OD" },
    email: "olivia.d@example.com",
    company: "Brand Builders",
    campaignName: "Digital Transform",
    activity: 2,
    status: "Contacted",
    lastContactDate: new Date("2025-08-30"),
    author: "रंग और यादें",
    lastAction: "Follow-up sent 1 day ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Olivia, connecting for digital transformation",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "pending",
        content: "Awaiting response on digital strategy",
      },
    ],
  },
  {
    id: "16",
    name: "Peter Wilson",
    title: "Chief Strategy Officer",
    avatar: { src: "https://i.pravatar.cc/150?u=25", fallback: "PW" },
    email: "peter.w@example.com",
    company: "Strategic Partners",
    campaignName: "Growth Strategy",
    activity: 0,
    status: "Pending",
    lastContactDate: new Date("2025-08-18"),
    author: "रंग और यादें",
    lastAction: "No activity yet",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Peter, connecting for strategic growth planning",
      },
      {
        title: "Connection Status",
        status: "pending",
        content: "No response received",
      },
    ],
  },
  {
    id: "17",
    name: "Quinn Taylor",
    title: "UX Designer",
    avatar: { src: "https://i.pravatar.cc/150?u=26", fallback: "QT" },
    email: "quinn.t@example.com",
    company: "Design Co.",
    campaignName: "User Experience",
    activity: 5,
    status: "Converted",
    lastContactDate: new Date("2025-09-11"),
    author: "रंग और यादें",
    lastAction: "Project started 4 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Quinn, connecting for UX design project",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Presented UX requirements",
      },
      {
        title: "Converted",
        status: "completed",
        content: "UX design project initiated",
      },
    ],
  },
  {
    id: "18",
    name: "Rachel Green",
    title: "Business Analyst",
    avatar: { src: "https://i.pravatar.cc/150?u=27", fallback: "RG" },
    email: "rachel.g@example.com",
    company: "Business Intelligence",
    campaignName: "Process Optimization",
    activity: 3,
    status: "Responded",
    lastContactDate: new Date("2025-09-05"),
    author: "रंग और यादें",
    lastAction: "Replied 6 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Rachel, connecting for process optimization",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Shared optimization framework",
      },
      {
        title: "Reply",
        status: "completed",
        content: "Framework looks promising, let's implement",
      },
    ],
  },
  {
    id: "19",
    name: "Samuel Anderson",
    title: "Security Engineer",
    avatar: { src: "https://i.pravatar.cc/150?u=28", fallback: "SA" },
    email: "samuel.a@example.com",
    company: "SecureTech",
    campaignName: "Cybersecurity Focus",
    activity: 1,
    status: "Contacted",
    lastContactDate: new Date("2025-08-27"),
    author: "रंग और यादें",
    lastAction: "Message sent 2 days ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Samuel, connecting for cybersecurity solutions",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "pending",
        content: "Awaiting response on security proposal",
      },
    ],
  },
  {
    id: "20",
    name: "Tina White",
    title: "Operations Manager",
    avatar: { src: "https://i.pravatar.cc/150?u=29", fallback: "TW" },
    email: "tina.w@example.com",
    company: "Efficiency Corp",
    campaignName: "Workflow Optimization",
    activity: 4,
    status: "Converted",
    lastContactDate: new Date("2025-09-07"),
    author: "रंग और यादें",
    lastAction: "Implementation started 10 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Tina, connecting for workflow optimization",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Presented workflow solutions",
      },
      {
        title: "Converted",
        status: "completed",
        content: "Workflow optimization project approved",
      },
    ],
  },
  {
    id: "21",
    name: "Victor Kumar",
    title: "AI Research Lead",
    avatar: { src: "https://i.pravatar.cc/150?u=30", fallback: "VK" },
    email: "victor.k@example.com",
    company: "AI Innovations",
    campaignName: "Future Tech",
    activity: 2,
    status: "Pending",
    lastContactDate: new Date("2025-08-22"),
    author: "रंग और यादें",
    lastAction: "Connection sent 7 days ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Victor, connecting for AI research collaboration",
      },
      {
        title: "Connection Status",
        status: "pending",
        content: "Waiting for connection acceptance",
      },
    ],
  },
  {
    id: "22",
    name: "Wendy Phillips",
    title: "Content Manager",
    avatar: { src: "https://i.pravatar.cc/150?u=31", fallback: "WP" },
    email: "wendy.p@example.com",
    company: "Content Creators",
    campaignName: "Content Strategy",
    activity: 3,
    status: "Responded",
    lastContactDate: new Date("2025-09-06"),
    author: "रंग और यादें",
    lastAction: "Replied 14 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Wendy, connecting for content strategy project",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Shared content framework",
      },
      {
        title: "Reply",
        status: "completed",
        content: "Love the content approach, let's proceed",
      },
    ],
  },
  {
    id: "23",
    name: "Xavier Chen",
    title: "Mobile Developer",
    avatar: { src: "https://i.pravatar.cc/150?u=32", fallback: "XC" },
    email: "xavier.c@example.com",
    company: "Mobile First",
    campaignName: "App Development",
    activity: 4,
    status: "Contacted",
    lastContactDate: new Date("2025-09-01"),
    author: "रंग और यादें",
    lastAction: "Follow-up sent 16 hrs ago",
    sender: {
      name: "Jivesh Lakhani",
      email: "jivesh@gmail.com",
      avatar: { src: "", fallback: "JL" },
    },
    timeline: [
      {
        title: "Invitation Request",
        status: "completed",
        content: "Hi Xavier, connecting for mobile app development",
      },
      { title: "Connection Status", status: "completed", content: "Connected" },
      {
        title: "Follow-up 1",
        status: "completed",
        content: "Shared app development requirements",
      },
      {
        title: "Follow-up 2",
        status: "pending",
        content: "Awaiting response on development timeline",
      },
    ],
  },
  // ... continue for the remaining leads (4-28) in the same enriched structure
];

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
