import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Plus, FileText, Video, Link as LinkIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// ResourceSubject, ResourceFormat and AgeRange are represented by strings in JS.
// Resource shape is represented by plain JS objects in the `resources` array below.

const Resources = () => {
  const [resources, setResources] = useState([
    {
      id: "1",
      title: "Khan Academy Math",
      subject: "math",
      format: "video",
      ageRange: "3-5",
      url: "https://khanacademy.org",
      description: "Free math tutorials and practice exercises",
    },
    {
      id: "2",
      title: "Science Experiment Guide",
      subject: "science",
      format: "pdf",
      ageRange: "k-2",
      url: "#",
      description: "Collection of hands-on science experiments for elementary",
    },
    {
      id: "3",
      title: "Bible Stories for Kids",
      subject: "bible",
      format: "link",
      ageRange: "pre-k",
      url: "#",
      description: "Illustrated Bible stories with activities",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterFormat, setFilterFormat] = useState("all");
  const [newResource, setNewResource] = useState({
    title: "",
    subject: "math",
    format: "link",
    ageRange: "k-2",
    url: "",
    description: "",
  });

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      setResources([
        ...resources,
        {
          id: Date.now().toString(),
          ...newResource,
        },
      ]);
      setNewResource({
        title: "",
        subject: "math",
        format: "link",
        ageRange: "k-2",
        url: "",
        description: "",
      });
      setIsDialogOpen(false);
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case "pdf": return <FileText className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "link": return <LinkIcon className="w-4 h-4" />;
      case "document": return <FileText className="w-4 h-4" />;
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      math: "bg-primary/20 text-primary border-primary/30",
      reading: "bg-secondary/20 text-secondary-foreground border-secondary/30",
      science: "bg-accent/20 text-accent-foreground border-accent/30",
      history: "bg-muted text-muted-foreground border-muted/30",
      bible: "bg-primary/10 text-primary border-primary/20",
      art: "bg-secondary/10 text-secondary-foreground border-secondary/20",
      other: "bg-muted/50 text-muted-foreground border-muted/20",
    };
    return colors[subject];
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || resource.subject === filterSubject;
    const matchesFormat = filterFormat === "all" || resource.format === filterFormat;
    return matchesSearch && matchesSubject && matchesFormat;
  });

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <BookMarked className="w-10 h-10 text-primary" />
              Resource Library
            </h1>
            <p className="text-muted-foreground text-lg">
              Your curated collection of educational materials
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>Add a new learning resource to your library</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Resource Title</Label>
                  <Input
                    id="title"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="Enter resource title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={newResource.subject}
                      onValueChange={(value) =>
                          setNewResource({ ...newResource, subject: value })
                        }
                    >
                      <SelectTrigger id="subject">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="bible">Bible</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="format">Format</Label>
                    <Select
                      value={newResource.format}
                      onValueChange={(value) =>
                        setNewResource({ ...newResource, format: value })
                      }
                    >
                      <SelectTrigger id="format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="age">Age Range</Label>
                  <Select
                    value={newResource.ageRange}
                    onValueChange={(value) =>
                      setNewResource({ ...newResource, ageRange: value })
                    }
                  >
                    <SelectTrigger id="age">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-k">Pre-K</SelectItem>
                      <SelectItem value="k-2">K-2</SelectItem>
                      <SelectItem value="3-5">Grades 3-5</SelectItem>
                      <SelectItem value="6-8">Grades 6-8</SelectItem>
                      <SelectItem value="9-12">Grades 9-12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="url">URL or File Location</Label>
                  <Input
                    id="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    placeholder="Brief description"
                  />
                </div>
                <Button onClick={handleAddResource} className="w-full">
                  Add Resource
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-card mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="bible">Bible</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterFormat} onValueChange={setFilterFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getSubjectColor(resource.subject)}>{resource.subject}</Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {getFormatIcon(resource.format)}
                    <span className="text-xs capitalize">{resource.format}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription>Ages: {resource.ageRange}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{resource.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  Open Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookMarked className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No resources found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;