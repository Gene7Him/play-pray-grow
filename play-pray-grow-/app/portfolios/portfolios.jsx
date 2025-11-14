import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// PortfolioItem and Student shapes are represented by plain JS objects below.
// No TypeScript types in this file.

const Portfolios = () => {
  const [students, setStudents] = useState([
    {
      id: "1",
      name: "Emma Johnson",
      grade: "5th Grade",
      portfolioItems: [
        {
          id: "1",
          title: "Science Fair Project",
          description: "Volcano eruption experiment with detailed observations",
          date: new Date(2025, 9, 15),
        },
        {
          id: "2",
          title: "Creative Writing Story",
          description: "Original short story about space exploration",
          date: new Date(2025, 10, 1),
        },
      ],
    },
    {
      id: "2",
      name: "Noah Johnson",
      grade: "3rd Grade",
      portfolioItems: [
        {
          id: "3",
          title: "Math Workbook Completion",
          description: "Completed all multiplication tables up to 12x12",
          date: new Date(2025, 10, 5),
        },
      ],
    },
  ]);
  const [activeStudent, setActiveStudent] = useState(students[0]?.id || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  const currentStudent = students.find((s) => s.id === activeStudent);

  const handleAddItem = () => {
    if (newItem.title && newItem.description && currentStudent) {
      const updatedStudents = students.map((student) =>
        student.id === activeStudent
          ? {
              ...student,
              portfolioItems: [
                ...student.portfolioItems,
                {
                  id: Date.now().toString(),
                  title: newItem.title,
                  description: newItem.description,
                  date: new Date(),
                },
              ],
            }
          : student
      );
      setStudents(updatedStudents);
      setNewItem({ title: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-primary" />
            Student Portfolios
          </h1>
          <p className="text-muted-foreground text-lg">
            Track and showcase each student's achievements
          </p>
        </div>

        {students.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="text-center py-12">
              <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No students added yet</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeStudent} onValueChange={setActiveStudent}>
            <TabsList>
              {students.map((student) => (
                <TabsTrigger key={student.id} value={student.id}>
                  {student.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {students.map((student) => (
              <TabsContent key={student.id} value={student.id} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="shadow-card lg:col-span-1">
                    <CardHeader className="text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>{student.name}</CardTitle>
                      <CardDescription>{student.grade}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Portfolio Items:</span>
                          <span className="font-semibold">{student.portfolioItems.length}</span>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="w-full gap-2 mt-4">
                              <Plus className="w-4 h-4" />
                              Add Work Sample
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Portfolio Item</DialogTitle>
                              <DialogDescription>
                                Upload work samples or projects for {student.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                  id="title"
                                  value={newItem.title}
                                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                  placeholder="Project or assignment title"
                                />
                              </div>
                              <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={newItem.description}
                                  onChange={(e) =>
                                    setNewItem({ ...newItem, description: e.target.value })
                                  }
                                  placeholder="Describe the work and achievements"
                                  rows={4}
                                />
                              </div>
                              <div>
                                <Label htmlFor="upload">Upload File (Optional)</Label>
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Click to upload images or PDFs
                                  </p>
                                </div>
                              </div>
                              <Button onClick={handleAddItem} className="w-full">
                                Add to Portfolio
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="lg:col-span-2 space-y-6">
                    {student.portfolioItems.length === 0 ? (
                      <Card className="shadow-card">
                        <CardContent className="text-center py-12">
                          <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No portfolio items yet</p>
                        </CardContent>
                      </Card>
                    ) : (
                      student.portfolioItems.map((item) => (
                        <Card key={item.id} className="shadow-card hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.date.toLocaleDateString()}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-foreground mb-4">{item.description}</p>
                            {item.imageUrl && (
                              <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                                <ImageIcon className="w-12 h-12 text-muted-foreground" />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Portfolios;
