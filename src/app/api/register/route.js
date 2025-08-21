import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";// adjust path if needed


export async function POST(req) {
  try {
    const body = await req.json();

    if (body.finalChoice === 'submission') {
      const data =  await handleSubmission(body);
      return NextResponse.json({ success: true, data }, { status: 201 });
    }
    else if (body.finalChoice === 'lead'){
      const data = await handleLead(body);
      return NextResponse.json({ success: true, data }, { status: 201 });
    }
  } catch (err) {
    console.error("Error saving submission:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


async function handleLead(body) {
  const supabase = await createClient();

  const studentInfo = body.studentInfo  || {};
  const childInfo = body.childInfo || {};
  const parentInfo = body.parentInfo || {};

  const email = studentInfo.email  || parentInfo.email || "";
  const phone = studentInfo.phoneNumber || parentInfo.whatsappNumber || "";
  const firstname = studentInfo.firstName || childInfo.firstName || "";
  const lastname = studentInfo.lastName || childInfo.lastName || "";

  const language = body.language;
  const level = body.level;
  const audience_type = body.audience_type;
  const score = parseInt(body.score) || 0;

  const { data, error } = await supabase.rpc('create_lead_from_exchangelabui', {
    p_email: email,
    p_phone: phone,
    p_firstname: firstname,
    p_lastname: lastname,
    p_language: language,
    p_level: level,
    p_audience_type: audience_type,
    p_score: score
    // removed p_completed_at
  });

    if (error)
    {
      console.log("Error create_lead_from_exchangelabui: ", error)
      throw error;
    }
  return data;
}

async function handleSubmission(body) {
    const supabase = await createClient();
   // ✅ Extract main student/child info
    const studentInfo = body.studentInfo  || {};
    const childInfo = body.childInfo || {};
    const parentInfo = body.parentInfo || {};

    const firstname = studentInfo.firstName || childInfo.firstName || "";
    const lastname = studentInfo.lastName || childInfo.lastName || "";
    const email = studentInfo.email  || parentInfo.email || "";
    const phone = studentInfo.phoneNumber || parentInfo.whatsappNumber || "";
    const country = studentInfo.country || parentInfo.country || "";
    const age = childInfo.age ? parseInt(childInfo.age, 10) : null;

    // ✅ Parent info
    const parent_name = parentInfo.parentName || null;
    const parent_email = parentInfo.email || null;
    const parent_whatsapp = parentInfo.whatsappNumber || null;

    // ✅ Context
    const language = body.language || null;
    const reason = body.reason || null;

    // ✅ Insert into Supabase
    const { data, error } = await supabase.from("submissions").insert([
      {
        firstname,
        lastname,
        email,
        phone,
        country,
        age,
        is_synch: true,
        parent_name,
        parent_email,
        parent_whatsapp,
        language,
        reason,
      },
    ]);

    if (error)
    {
      console.log("Error submissions: ", error)
      throw error;
    }

    return data;
}
