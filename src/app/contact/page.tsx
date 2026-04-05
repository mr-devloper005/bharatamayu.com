"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const contactOptions = useMemo(
    () => [
      { title: "Support", detail: `support@${SITE_CONFIG.domain}`, tag: "Email" },
      { title: "Partnerships", detail: `partners@${SITE_CONFIG.domain}`, tag: "Business" },
      { title: "Press", detail: `press@${SITE_CONFIG.domain}`, tag: "Media" },
    ],
    []
  );

  return (
    <PageShell
      title="Contact"
      description={`Reach the ${SITE_CONFIG.name} team for support, partnerships, or media queries.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                toast({
                  title: "Message sent",
                  description: `Thanks for reaching out to ${SITE_CONFIG.name}. We will reply soon.`,
                });
              }}
            >
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input className="mt-2" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input className="mt-2" placeholder="you@example.com" type="email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea className="mt-2 min-h-[140px]" placeholder="Tell us how we can help" />
              </div>
              <Button type="submit">Send Message</Button>
              {submitted && (
                <p className="text-sm text-muted-foreground">
                  Thanks! We will reply within two business days.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {contactOptions.map((option) => (
            <Card key={option.title} className="border-border bg-card">
              <CardContent className="p-6">
                <Badge variant="secondary">{option.tag}</Badge>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{option.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
