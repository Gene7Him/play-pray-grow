import { Calendar, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-homeschool.jpg";

const Dashboard = () => {
  const weeklyQuote = "Education is not the filling of a pail, but the lighting of a fire.";
  const weeklyScripture = "Train up a child in the way he should go; even when he is old he will not depart from it. - Proverbs 22:6";

  const todaysLessons = [
    { subject: "Math", topic: "Multiplication Tables", completed: true },
    { subject: "Reading", topic: "Chapter 3: The Adventure Begins", completed: true },
    { subject: "Science", topic: "Plant Biology", completed: false },
    { subject: "Bible", topic: "Stories of Courage", completed: false },
  ];

  const upcomingEvents = [
    { title: "Nature Walk", date: "Tomorrow", type: "field-trip" },
    { title: "Science Fair Prep", date: "Friday", type: "project" },
    { title: "Library Visit", date: "Next Monday", type: "activity" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden rounded-b-3xl">
        <img 
          src={heroImage} 
          alt="Homeschool learning space" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center px-12">
          <div className="text-primary-foreground max-w-2xl">
            <h1 className="text-4xl font-bold mb-2">Welcome Back! 🌟</h1>
            <p className="text-lg opacity-90">Let's make today a great learning day</p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Inspiration Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-accent/30 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <CardTitle className="text-lg">Quote of the Week</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground italic">"{weeklyQuote}"</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/30 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                <CardTitle className="text-lg">Scripture of the Week</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground italic">{weeklyScripture}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Lessons */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Today's Lessons
              </CardTitle>
              <CardDescription>Your progress for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysLessons.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      lesson.completed ? "bg-secondary" : "bg-accent"
                    }`} />
                    <div>
                      <h4 className="font-semibold text-foreground">{lesson.subject}</h4>
                      <p className="text-sm text-muted-foreground">{lesson.topic}</p>
                    </div>
                  </div>
                  {lesson.completed && (
                    <Badge variant="secondary" className="bg-secondary/20">
                      Complete
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Coming Up
              </CardTitle>
              <CardDescription>This week's events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <h4 className="font-semibold text-foreground">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-soft">
            <BookOpen className="w-5 h-5 mr-2" />
            Start Today's Lessons
          </Button>
          <Button size="lg" variant="outline">
            <Calendar className="w-5 h-5 mr-2" />
            View Full Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;