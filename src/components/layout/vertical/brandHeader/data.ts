// Notifications dropdown

interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
}

const notifications: notificationType[] = [
  {
    avatar: "/images/profile/user-10.png",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-2.png",
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-3.png",
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-4.png",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    avatar: "/images/profile/user-5.png",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-6.png",
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-7.png",
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-8.png",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
];

// Messages dropdown
interface messageType {
  title: string;
  subtitle: string;
  avatar: string;
  time: string;
}
const messages: messageType[] = [
  {
    avatar: "/images/profile/user-1.png",
    title: "Michell Flintoff",
    subtitle: "Just see the my new admin!",
    time: "just now",
  },
  {
    avatar: "/images/profile/user-2.png",
    title: "Bianca Anderson",
    subtitle: "Just a reminder that you have event",
    time: "5 mins ago",
  },
  {
    avatar: "/images/profile/user-3.png",
    title: "Andrew Johnson",
    subtitle: "You can customize this template as you ...",
    time: "10 mins ago",
  },
  {
    avatar: "/images/profile/user-5.png",
    title: "Miyra Strokes",
    subtitle: "Just see the my new admin!",
    time: "5 days ago",
  },
  {
    avatar: "/images/profile/user-6.png",
    title: "Jolly Cummins",
    subtitle: "Just a reminder that you have event",
    time: "Years ago",
  },
  {
    avatar: "/images/profile/user-7.png",
    title: "Eliga Rush",
    subtitle: "You can customize this template as you ...",
    time: "15 days ago",
  },
];

export { notifications, messages };
