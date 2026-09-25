import {
  CalendarDays,
  FolderKanban,
  // Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import VerticalOptions from "./vertical-options";
import type { ProjectCardI } from "../types/projectTypes";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ data }: { data : ProjectCardI}) {
  const navigate = useNavigate()
  return (
    <Card className="h-57.5 overflow-hidden" >
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted">
            <FolderKanban className="size-12 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{data.name}</CardTitle>
              <Badge>Active</Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              {data.description}
            </p>
          </div>
          {/* Options */}
          <VerticalOptions data={data}/>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <Label className="text-sm text-muted-foreground">
                {new Date(data.created_at).toLocaleDateString()}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              {/* <Users className="size-4 text-muted-foreground" /> */}
              {/* <Label className="text-sm text-muted-foreground">0 members</Label> */}
            </div>
          </div>

          <Button onClick={() => navigate(`${data.id}/tickets`)}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
