import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { phone, amount } = await req.json();

    // 1. Get Access Token from Safaricom
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` }
    });
    const { access_token } = await tokenResponse.json();

    // 2. Prepare the STK Push request
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    const password = Buffer.from(
      process.env.MPESA_TILL_NUMBER + process.env.MPESA_PASSKEY + timestamp
    ).toString('base64');

    const stkResponse = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // Use this for Till Numbers
        Amount: Math.round(amount),
        PartyA: phone, // User's phone number
        PartyB: "174379", // Till Number
        PhoneNumber: phone,
        CallBackURL: "https://webhook.site/7171084a-8df6-42b2-9a96-5ffd72457785",
        AccountReference: "OlmarithiBags",
        TransactionDesc: "Payment for Bags"
      })
    });

    const data = await stkResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}