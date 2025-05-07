import { NavItem } from '@/types';
export const rulesPdf = '/DUMMY_PDF.pdf';
export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Дашборд',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  // {
  //   title: 'Харилцагч',
  //   url: '/dashboard/users',
  //   icon: 'user',
  //   shortcut: ['e', 'e'],
  //   isActive: false,
  //   items: [] // No child items
  // },

  {
    title: 'Удирдах зөвлөл',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Албан тушаал',
        url: '/dashboard/employeestype',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Удирдлагууд',
        shortcut: ['l', 'l'],
        url: '/dashboard/employees',
        icon: 'login'
      }
    ]
  },

  {
    title: 'Гишүүнчлэл',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'gallery',
    isActive: true,
    items: [
      {
        title: 'МХКХ Гишүүд',
        shortcut: ['l', 'l'],
        url: '/dashboard/companies',
        icon: 'login'
      },
      {
        title: 'Үйл ажиллагааны чиглэл',
        shortcut: ['l', 'l'],
        url: '/dashboard/occupation',
        icon: 'login'
      },
      {
        title: 'Гишүүний ангилал',
        shortcut: ['l', 'l'],
        url: '/dashboard/affiliation',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Мэдээ',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Мэдээ, зөвлөмж, сургалт',
        shortcut: ['l', 'l'],
        url: '/dashboard/posts',
        icon: 'login'
      },
      {
        title: 'Гишүүнчлэл',
        shortcut: ['l', 'l'],
        url: '/dashboard/posts?page=1&categories=MEMBERPOST',
        icon: 'login'
      },
      {
        title: 'Зорилго',
        shortcut: ['l', 'l'],
        url: '/dashboard/posts?page=1&categories=VISIONS',
        icon: 'login'
      }
      // {
      //   title: 'Засаглал',
      //   shortcut: ['l', 'l'],
      //   url: '/dashboard/posts?page=1&categories=RULES',
      //   icon: 'login'
      // }
    ]
  },
  // {
  //   title: 'Он цагийн дараалал',
  //   url: '/dashboard/timeline',
  //   icon: 'settings',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  {
    title: 'Текст, зургууд',
    url: '/dashboard/static',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  // {
  //   title: 'Тэмдэглэл',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  {
    title: 'Редактор жишээ',
    url: '/dashboard/tiptap',
    icon: 'media',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];
