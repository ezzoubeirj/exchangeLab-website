import { NextResponse } from "next/server";
import { createOneToOneClient } from "@/supabase/oneToOneServer";

export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = createOneToOneClient();
    const { data, error } = await supabase.rpc("complete_one_to_one_placement", {
      p_intake_token: body.intakeToken,
      p_score: body.score,
      p_level: body.level,
    });

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("One-to-one placement completion failed:", error.message);
    return NextResponse.json(
      { success: false, error: "Unable to save this placement result right now." },
      { status: 500 }
    );
  }
}
