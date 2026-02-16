"use client";

import React, { useState } from "react";
import { AppNavbar } from "./AppNavbar";
import TextField from "@/shared/ui/TextField";
import { Button } from "@/shared/ui/button";
import { Search, Plus, Grid, List } from "lucide-react";

interface LoggedInLayoutProps {
  children?: React.ReactNode;
}

interface ClassCard {
  id: string;
  name: string;
  description: string;
  subject: string;
  instructor: string;
  avatar: string;
}

export const LoggedInLayout: React.FC<LoggedInLayoutProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder class data
  const classes: ClassCard[] = [
    {
      id: "1",
      name: "Advanced Mathematics",
      description: "Calculus & Algebra",
      subject: "Mathematics",
      instructor: "Dr. Sarah Wilson",
      avatar: "AM",
    },
    {
      id: "2",
      name: "Quantum Physics",
      description: "Theoretical Physics",
      subject: "Physics",
      instructor: "Prof. James Miller",
      avatar: "QP",
    },
    {
      id: "3",
      name: "English Literature",
      description: "Victorian Era",
      subject: "Literature",
      instructor: "Ms. Emily Blunt",
      avatar: "EL",
    },
    {
      id: "4",
      name: "Intro to Programming",
      description: "Computer Science",
      subject: "CS",
      instructor: "You",
      avatar: "IP",
    },
    {
      id: "5",
      name: "Art History",
      description: "Renaissance",
      subject: "History",
      instructor: "Dr. Alan Vance",
      avatar: "AH",
    },
  ];

  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logout clicked");
  };

  const handleSettings = () => {
    // Placeholder for settings logic
    console.log("Settings clicked");
  };

  const handleNotification = () => {
    // Placeholder for notification logic
    console.log("Notification clicked");
  };

  const handleCreateClass = () => {
    // Placeholder for create class logic
    console.log("Create class clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <AppNavbar
        isLoggedIn={true}
        onLogoutClick={handleLogout}
        onSettingsClick={handleSettings}
        onNotificationClick={handleNotification}
        userEmail="subas@example.com"
        notificationCount={0}
      />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children ? (
          children
        ) : (
          <>
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Hi Subas! 👋
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Ready to learn something new today? You have{" "}
                    <span className="font-semibold text-foreground">
                      {classes.length} classes
                    </span>{" "}
                    with active discussions.
                  </p>
                </div>

                <Button
                  onClick={handleCreateClass}
                  className="shadow-lg gap-2 w-full md:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  Create Class
                </Button>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center md:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-400" />
                  <TextField
                    placeholder="Search classes, subjects, or teachers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Classes Grid / List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {classes
                .filter(
                  (cls) =>
                    cls.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    cls.subject
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    cls.instructor
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                )
                .map((cls) => (
                  <div
                    key={cls.id}
                    className={`
                      group cursor-pointer rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary
                      ${viewMode === "list" ? "flex items-center justify-between" : ""}
                    `}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {cls.avatar}
                        </span>
                      </div>

                      {/* Class Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {cls.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {cls.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block px-2 py-1 rounded bg-primary/10 text-xs font-medium text-primary">
                            {cls.subject}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {cls.instructor}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time/Status Badge (optional) */}
                    <div className="text-xs text-muted-foreground mt-2 md:mt-0 md:ml-4">
                      <span className="text-success font-medium">Active</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty State */}
            {classes.filter(
              (cls) =>
                cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cls.instructor
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            ).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No classes found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or create a new class
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default LoggedInLayout;
