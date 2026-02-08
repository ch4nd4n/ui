import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { tools } from "@/lib/tools";

export function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Local-AiHub</h1>
        <p className="mt-2 text-muted-foreground">
          Simple, focused, offline-capable AI tools powered by local models.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.id} to={tool.path}>
            <Card className="transition-colors hover:border-primary/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <tool.icon className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
