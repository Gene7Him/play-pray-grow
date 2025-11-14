import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Brainstorm = () => {
  const [ideas, setIdeas] = useState([
    {
      id: "1",
      title: "Solar System Model",
      description: "Create a 3D model of the solar system using styrofoam balls and paint",
      category: "project",
      rating: 5,
      createdAt: new Date(2025, 10, 10),
    },
    {
      id: "2",
      title: "American Revolution Unit",
      description: "Deep dive into the Revolutionary War with primary sources and reenactment",
      category: "unit-study",
      rating: 4,
      createdAt: new Date(2025, 10, 12),
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    category: "project",
  });
  const [activeTab, setActiveTab] = useState("all");

  const handleAddIdea = () => {
    if (newIdea.title && newIdea.description) {
      setIdeas([
        ...ideas,
        {
          id: Date.now().toString(),
          title: newIdea.title,
          description: newIdea.description,
          category: newIdea.category,
          rating: 0,
          createdAt: new Date(),
        },
      ]);
      setNewIdea({ title: "", description: "", category: "project" });
      setIsDialogOpen(false);
    }
  };

  const handleRating = (id, rating) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, rating } : idea)));
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "project": return "bg-primary/20 text-primary border-primary/30";
      case "unit-study": return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      case "activity": return "bg-accent/20 text-accent-foreground border-accent/30";
      case "field-trip": return "bg-muted text-muted-foreground border-muted/30";
    }
  };

  const filteredIdeas = activeTab === "all" ? ideas : ideas.filter((idea) => idea.category === activeTab);

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Lightbulb className="w-10 h-10 text-primary" />
              Brainstorm Hub
            </h1>
            <p className="text-muted-foreground text-lg">
              Capture and organize your homeschooling ideas
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Idea
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Idea</DialogTitle>
                <DialogDescription>Capture your creative homeschooling inspiration</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                    placeholder="Enter idea title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newIdea.category}
                onValueChange={(value) => setNewIdea({ ...newIdea, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="unit-study">Unit Study</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="field-trip">Field Trip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newIdea.description}
                    onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                    placeholder="Describe your idea in detail"
                    rows={4}
                  />
                </div>
                <Button onClick={handleAddIdea} className="w-full">
                  Add Idea
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Ideas</TabsTrigger>
            <TabsTrigger value="project">Projects</TabsTrigger>
            <TabsTrigger value="unit-study">Unit Studies</TabsTrigger>
            <TabsTrigger value="activity">Activities</TabsTrigger>
            <TabsTrigger value="field-trip">Field Trips</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getCategoryColor(idea.category)}>{idea.category}</Badge>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 cursor-pointer transition-colors ${
                              star <= idea.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => handleRating(idea.id, star)}
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{idea.title}</CardTitle>
                    <CardDescription className="text-xs">
                      Added {idea.createdAt.toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{idea.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredIdeas.length === 0 && (
              <div className="text-center py-12">
                <Lightbulb className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No ideas yet. Start brainstorming!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Brainstorm;