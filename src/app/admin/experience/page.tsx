import { createClient } from "@/utils/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const revalidate = 0;

export default async function ExperiencePage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase.from("experience").select("*").order("start_date", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">Manage your work experience history.</p>
        </div>
        <Link href="/admin/experience/new" className={buttonVariants()}>Add Experience</Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Current</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences?.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className="font-medium">{exp.company}</TableCell>
                <TableCell>{exp.position}</TableCell>
                <TableCell>
                  {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : ''} - 
                  {exp.is_current ? ' Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString() : '')}
                </TableCell>
                <TableCell>
                  {exp.is_current ? <Badge>Yes</Badge> : null}
                </TableCell>
              </TableRow>
            ))}
            {(!experiences || experiences.length === 0) && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No experience entries found. Run the schema_update.sql first!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
