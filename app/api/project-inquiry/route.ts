import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

type ProjectInquiry = {
  project_type: string;
  business_name: string;
  website?: string;
  description: string;
  changed: string;
  next_direction: string;
  investment: string;
  timing: string;
  contact_name: string;
  email: string;
  extra?: string;
};

const requiredFields: Array<keyof ProjectInquiry> = [
  "project_type",
  "business_name",
  "description",
  "changed",
  "next_direction",
  "investment",
  "timing",
  "contact_name",
  "email",
];

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatParagraph(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const inquiryEmail = process.env.INQUIRY_EMAIL;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error("Missing Supabase environment variables.");

      return NextResponse.json(
        { error: "The inquiry service is not configured correctly." },
        { status: 500 },
      );
    }

    const body = await request.json();

    const inquiry: ProjectInquiry = {
      project_type: cleanText(body.project_type),
      business_name: cleanText(body.business_name),
      website: cleanText(body.website),
      description: cleanText(body.description),
      changed: cleanText(body.changed),
      next_direction: cleanText(body.next_direction),
      investment: cleanText(body.investment),
      timing: cleanText(body.timing),
      contact_name: cleanText(body.contact_name),
      email: cleanText(body.email).toLowerCase(),
      extra: cleanText(body.extra),
    };

    const missingFields = requiredFields.filter(
      (field) => !inquiry[field],
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
          missingFields,
        },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(inquiry.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      },
    );

    const { data: savedInquiry, error: databaseError } = await supabase
      .from("project_inquiries")
      .insert(inquiry)
      .select("id, created_at")
      .single();

    if (databaseError) {
      console.error("Supabase inquiry error:", databaseError);

      return NextResponse.json(
        { error: "Your inquiry could not be saved. Please try again." },
        { status: 500 },
      );
    }

    let emailsSent = false;

    if (
      resendApiKey &&
      inquiryEmail &&
      resendFromEmail
    ) {
      const resend = new Resend(resendApiKey);

      const ownerEmail = resend.emails.send({
        from: resendFromEmail,
        to: [inquiryEmail],
        replyTo: inquiry.email,
        subject: `New Lex & Hue inquiry — ${inquiry.business_name}`,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #111111; line-height: 1.6; max-width: 680px; margin: 0 auto;">
            <p style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #f15a24;">
              New project inquiry
            </p>

            <h1 style="font-family: Georgia, serif; font-size: 34px; font-weight: 400; margin-bottom: 8px;">
              ${escapeHtml(inquiry.business_name)}
            </h1>

            <p style="margin-top: 0; color: #666666;">
              Submitted by ${escapeHtml(inquiry.contact_name)}
            </p>

            <hr style="border: 0; border-top: 1px solid #dddddd; margin: 28px 0;" />

            <h2 style="font-size: 16px;">Project type</h2>
            <p>${formatParagraph(inquiry.project_type)}</p>

            <h2 style="font-size: 16px;">Current website</h2>
            <p>${inquiry.website
              ? formatParagraph(inquiry.website)
              : "Not provided"}</p>

            <h2 style="font-size: 16px;">About the business</h2>
            <p>${formatParagraph(inquiry.description)}</p>

            <h2 style="font-size: 16px;">What has changed</h2>
            <p>${formatParagraph(inquiry.changed)}</p>

            <h2 style="font-size: 16px;">Where the business is going next</h2>
            <p>${formatParagraph(inquiry.next_direction)}</p>

            <h2 style="font-size: 16px;">Investment range</h2>
            <p>${formatParagraph(inquiry.investment)}</p>

            <h2 style="font-size: 16px;">Preferred timing</h2>
            <p>${formatParagraph(inquiry.timing)}</p>

            <h2 style="font-size: 16px;">Additional information</h2>
            <p>${inquiry.extra
              ? formatParagraph(inquiry.extra)
              : "Nothing additional provided"}</p>

            <hr style="border: 0; border-top: 1px solid #dddddd; margin: 28px 0;" />

            <p>
              <strong>Contact:</strong>
              ${escapeHtml(inquiry.contact_name)}
            </p>

            <p>
              <strong>Email:</strong>
              <a href="mailto:${escapeHtml(inquiry.email)}">
                ${escapeHtml(inquiry.email)}
              </a>
            </p>

            <p style="font-size: 12px; color: #777777;">
              Inquiry ID: ${escapeHtml(savedInquiry.id)}
            </p>
          </div>
        `,
      });

      const clientEmail = resend.emails.send({
        from: resendFromEmail,
        to: [inquiry.email],
        replyTo: inquiryEmail,
        subject: "We received your Lex & Hue inquiry",
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #111111; line-height: 1.7; max-width: 620px; margin: 0 auto;">
            <p style="font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #f15a24;">
              Lex & Hue
            </p>

            <h1 style="font-family: Georgia, serif; font-size: 36px; font-weight: 400;">
              Your next chapter starts here.
            </h1>

            <p>Hi ${escapeHtml(inquiry.contact_name)},</p>

            <p>
              Thank you for reaching out about
              <strong>${escapeHtml(inquiry.business_name)}</strong>.
              Your project inquiry has been received.
            </p>

            <p>
              I’ll review what you shared, consider where your business is
              now and where it is ready to go next, and follow up with the
              appropriate next steps.
            </p>

            <p>
              This is not an automated booking confirmation. It confirms
              that your inquiry was successfully submitted.
            </p>

            <p style="margin-top: 32px;">
              Shawna<br />
              <strong>Lex & Hue</strong>
            </p>
          </div>
        `,
      });

      const emailResults = await Promise.allSettled([
        ownerEmail,
        clientEmail,
      ]);

      emailsSent = emailResults.every(
        (result) =>
          result.status === "fulfilled" &&
          !result.value.error,
      );

      if (!emailsSent) {
        console.error(
          "Inquiry saved, but one or more emails failed:",
          emailResults,
        );
      }
    } else {
      console.warn(
        "Inquiry saved without email because Resend variables are missing.",
      );
    }

    return NextResponse.json(
      {
        success: true,
        inquiryId: savedInquiry.id,
        emailsSent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Project inquiry route error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}