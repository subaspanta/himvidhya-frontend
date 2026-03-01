// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ClassDetails } from "@/features/class/types";
// import { Button } from "@/components/ui/button";
// import ClassHeader from "@/features/class/components/classroom/ClassHeader";
// import UpcomingDeadlines from "@/features/class/components/classroom/UpcomingDeadlines";
// import ChannelTabs from "@/features/class/components/classroom/ChannelTab";
// import ClassMainFeed from "@/features/class/components/classroom/ChannelMainFeed";
// import ClassSidebar from "@/features/class/components/classroom/ClassSidebar";
// import { getClassDetails } from "@/features/home/api/home.api";

// export default function ClassDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [classData, setClassData] = useState<ClassDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("announcements");

//   useEffect(() => {
//     if (id) fetchClassDetails();
//   }, [id]);

//   const fetchClassDetails = async () => {
//     setIsLoading(true);
//     try {
//       const details = await getClassDetails(id as string);
//       setClassData(details);
//     } catch (error) {
//       console.error("Failed to load class:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading class...
//       </div>
//     );

//   if (!classData)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p className="text-xl">Class not found</p>
//         <Button onClick={() => router.push("/dashboard")}>
//           Back to Dashboard
//         </Button>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background">
//       {/* 1. Navigation & Header (Top Bar) */}
//       <ClassHeader classData={classData} />

//       {/* 2. Hero Section: Upcoming Deadlines */}
//       <UpcomingDeadlines deadlines={[]} />

//       {/* 3. Secondary Navigation (Tabs) */}
//       <ChannelTabs activeTab={activeTab} onTabChange={setActiveTab} />

//       {/* 4. Main Content Area (Two-Column Grid) */}
//       <div className="w-full">
//         <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
//             {/* Left Column: Feed (70% Width on large screens) */}
//             <div className="lg:col-span-8">
//               <ClassMainFeed activeTab={activeTab} classData={classData} />
//             </div>

//             {/* Right Column: Sidebar (30% Width on large screens) */}
//             <aside className="lg:col-span-4">
//               <ClassSidebar classData={classData} />
//             </aside>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

const page = () => {
  return <div></div>;
};

export default page;
