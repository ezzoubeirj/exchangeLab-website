import { NextResponse } from "next/server";
import { createOneToOneClient } from "@/supabase/oneToOneServer";

export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createOneToOneClient();
    const { data, error } = await supabase.rpc("create_one_to_one_intake", {
      p_submission_key: body.submissionKey,
      p_email: body.email,
      p_phone: body.phone,
      p_first_name: body.firstName,
      p_last_name: body.lastName,
      p_audience_type: body.audienceType,
      p_language: body.language,
      p_form_data: body.formData,
      p_schedule: body.schedule,
    });

    if (error) throw error;
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("One-to-one intake failed:", error.message);
    return NextResponse.json(
      { success: false, error: "Unable to save this enrollment right now." },
      { status: 500 }
    );
  }
}
