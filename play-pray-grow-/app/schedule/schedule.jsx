import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus, BookOpen, Plane, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// EventType and CalendarEvent shapes are represented by plain JS values/objects below.

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: "1", title: "Science Experiment Day", date: new Date(2025, 10, 20), type: "lesson" },
    { id: "2", title: "Natural History Museum", date: new Date(2025, 10, 22), type: "trip" },
    { id: "3", title: "Bake Cookies", date: new Date(2025, 10, 25), type: "snack" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", type: "lesson", notes: "" });

  const getEventIcon = (type) => {
    switch (type) {
      case "lesson": return <BookOpen className="w-4 h-4" />;
      case "trip": return <Plane className="w-4 h-4" />;
      case "snack": return <Apple className="w-4 h-4" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case "lesson": return "bg-primary/20 text-primary border-primary/30";
      case "trip": return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      case "snack": return "bg-accent/20 text-accent-foreground border-accent/30";
    }
  };

  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  const handleAddEvent = () => {
    if (newEvent.title && date) {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          title: newEvent.title,
          date: new Date(date),
          type: newEvent.type,
          notes: newEvent.notes,
        },
      ]);
      setNewEvent({ title: "", type: "lesson", notes: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <CalendarIcon className="w-10 h-10 text-primary" />
            Schedule & Calendar
          </h1>
          <p className="text-muted-foreground text-lg">
            Plan your daily and weekly activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Click a date to view or add events</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Events for {date?.toLocaleDateString()}</CardTitle>
                <CardDescription>Manage your daily schedule</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>Create a new event for {date?.toLocaleDateString()}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Event Type</Label>
                      <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lesson">📚 Lesson</SelectItem>
                          <SelectItem value="trip">🌳 Field Trip</SelectItem>
                          <SelectItem value="snack">🍎 Snack/Activity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input
                        id="notes"
                        value={newEvent.notes}
                        onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                        placeholder="Add notes"
                      />
                    </div>
                    <Button onClick={handleAddEvent} className="w-full">Add Event</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No events scheduled for this day</p>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className={`p-4 rounded-lg border ${getEventColor(event.type)}`}>
                      <div className="flex items-start gap-3">
                        {getEventIcon(event.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          {event.notes && <p className="text-sm opacity-80 mt-1">{event.notes}</p>}
                        </div>
                        <Badge variant="outline" className="capitalize">{event.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;