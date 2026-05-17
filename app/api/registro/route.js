import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      nombre,
      whatsapp,
      email,
      capital,
      mensaje
    } = body;

    const { error } =
      await supabase
      .from("Registros")
      .insert([
        {
          nombre,
          whatsapp,
          email,
          capital,
          mensaje
        }
      ]);

    if(error){

      return Response.json({
        ok:false,
        error:error.message
      });

    }

    return Response.json({
      ok:true
    });

  } catch(err){

    return Response.json({
      ok:false,
      error:"Error interno"
    });

  }

}
