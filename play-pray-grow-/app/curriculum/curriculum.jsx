import { useState } from "react";
import { BookOpen, CheckCircle2, Circle, FileText, Video, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Resource and Lesson shapes are documented in JS objects below. No TypeScript types in this file.

const subjects = {
  math: {
    name: "Mathematics",
    icon: "➕",
    color: "primary",
    lessons: [
      {
        id: "m1",
        title: "Week 1: Multiplication Fundamentals",
        objectives: [
          "Understand multiplication as repeated addition",
          "Memorize times tables 1-5",
          "Solve word problems involving multiplication",
        ],
        resources: [
          { type: "video", title: "Introduction to Multiplication", url: "#" },
          { type: "pdf", title: "Practice Worksheets", url: "#" },
        ],
        completed: true,
      },
      {
        id: "m2",
        title: "Week 2: Division Basics",
        objectives: [
          "Understand division as sharing equally",
          "Learn relationship between multiplication and division",
          "Practice simple division problems",
        ],
        resources: [
          { type: "video", title: "Division Made Easy", url: "#" },
          { type: "link", title: "Interactive Division Games", url: "#" },
        ],
        completed: false,
      },
    ],
  },
  reading: {
    name: "Reading & Literature",
    icon: "📚",
    color: "secondary",
    lessons: [
      {
        id: "r1",
        title: "Week 1: Story Elements",
        objectives: [
          "Identify main characters and setting",
          "Understand plot structure",
          "Make predictions about story outcomes",
        ],
        resources: [
          { type: "pdf", title: "Reading Comprehension Guide", url: "#" },
          { type: "link", title: "Online Reading Library", url: "#" },
        ],
        completed: true,
      },
    ],
  },
  science: {
    name: "Science",
    icon: "🔬",
    color: "accent",
    lessons: [
      {
        id: "s1",
        title: "Week 1: Plant Life Cycles",
        objectives: [
          "Learn stages of plant growth",
          "Understand photosynthesis basics",
          "Conduct seed germination experiment",
        ],
        resources: [
          { type: "video", title: "How Plants Grow", url: "#" },
          { type: "pdf", title: "Experiment Instructions", url: "#" },
        ],
        completed: false,
      },
    ],
  },
  bible: {
    name: "Bible Studies",
    icon: "✝️",
    color: "primary",
    lessons: [
      {
        id: "b1",
        title: "Week 1: Stories of Courage",
        objectives: [
          "Study the story of David and Goliath",
          "Discuss what courage means",
          "Memorize Psalm 27:1",
        ],
        resources: [
          { type: "video", title: "David and Goliath Story", url: "#" },
          { type: "pdf", title: "Discussion Questions", url: "#" },
        ],
        completed: false,
      },
    ],
  },
};

const Curriculum = () => {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [completedLessons, setCompletedLessons] = useState(new Set(["m1", "r1"]));

  const toggleLesson = (lessonId) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          Curriculum Planner
        </h1>
        <p className="text-muted-foreground text-lg">
          Organize lessons, track progress, and access resources
        </p>
      </div>

  <Tabs value={selectedSubject} onValueChange={(v) => setSelectedSubject(v)}>
        <TabsList className="grid w-full grid-cols-4 mb-8 h-auto p-2">
          {Object.entries(subjects).map(([key, subject]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <span className="mr-2">{subject.icon}</span>
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(subjects).map(([key, subject]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {subject.lessons.map((lesson) => {
              const isCompleted = completedLessons.has(lesson.id);
              
              return (
                <Card key={lesson.id} className="shadow-card border-2 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-secondary mt-1" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground mt-1" />
                        )}
                        <div>
                          <CardTitle className="text-xl">{lesson.title}</CardTitle>
                          <CardDescription className="mt-2">Weekly Objectives</CardDescription>
                        </div>
                      </div>
                      <Button
                        variant={isCompleted ? "secondary" : "outline"}
                        onClick={() => toggleLesson(lesson.id)}
                      >
                        {isCompleted ? "Completed" : "Mark Complete"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Objectives */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Learning Objectives:</h4>
                      <ul className="space-y-2">
                        {lesson.objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Resources:</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {lesson.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all"
                          >
                            <div className="p-2 rounded bg-primary/10 text-primary">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground truncate">
                                {resource.title}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {resource.type}
                              </Badge>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Curriculum;