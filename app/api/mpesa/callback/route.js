import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  try {
    const body = await req.json();
    const result = body.Body.stkCallback;

    // ResultCode 0 means SUCCESS
    if (result.ResultCode === 0) {
      const amount = result.CallbackMetadata.Item.find(i => i.Name === 'Amount').Value;
      const mpesaReceipt = result.CallbackMetadata.Item.find(i => i.Name === 'MpesaReceiptNumber').Value;
      const phone = result.CallbackMetadata.Item.find(i => i.Name === 'PhoneNumber').Value;

      console.log(`Payment Success: ${mpesaReceipt} from ${phone}`);

      // Here is where we will eventually save the order to Supabase
      // await supabase.from('orders').insert([{ ... }])
    } else {
      console.log("Payment Failed or Cancelled by User");
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
  }
}