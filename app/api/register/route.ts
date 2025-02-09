import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Connect to MongoDB
    await client.connect();
    const database = client.db('ai-workshop');
    const collection = database.collection('participants');

    // Check if the workshop is full
    const participantCount = await collection.countDocuments();
    if (participantCount >= 70) {
      return NextResponse.json({ error: 'Workshop is full' }, { status: 400 });
    }

    // Check if the user already exists based on email or USN
    const existingUser = await collection.findOne({
      $or: [{ email: body.email }, { usn: body.usn }],
    });
    if (existingUser) {
      return NextResponse.json({ error: 'You are already registered, Check your email for more deatils' }, { status: 400 });
    }

    // Insert the new participant
    await collection.insertOne(body);

    // Prepare the email payload for Brevo API (Sendinblue)
    const emailPayload = {
      sender: {
      name: process.env.BREVO_FROM_NAME || "LangChain Workshop Team",
      email: process.env.BREVO_FROM_EMAIL,
      },
      to: [
      {
      email: body.email,
      name: body.name,
      },
      ],
      subject: "Welcome to the LangChain Workshop! - Important Details Inside",
      htmlContent: `
      <html>
      <body style="background-color:#f5f5f5; font-family: Arial, sans-serif; margin:0; padding:0;">
      <div style="max-width:600px; margin:0 auto; padding:20px; background:#ffffff; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
        <div style="display:flex; align-items:center; justify-content:center; margin-bottom:20px;">
        <img src="https://th.bing.com/th?id=ODLS.7ced16d3-fb98-4fed-8868-734e99e0b1eb" alt="LangChain Logo" style="width:50px;height: 50px; margin-right:15px; border-radius:5px;">
        <h1 style="color:#2c3e50; margin:0;">Welcome to the LangChain Workshop!</h1>
        </div>
        
        <div style="background-color:#f8f9fa; padding:15px; border-radius:5px; margin:15px 0;">
        <p style="color:#2c3e50;">Dear <strong>${body.name}</strong> (USN: <strong>${body.usn}</strong>),</p>
        <p>Your registration has been confirmed! Here are the important details:</p>
        </div>

        <div style="background-color:#e8f4f8; padding:15px; border-radius:5px; margin:15px 0;">
        <h3 style="color:#2c3e50;">🗓️ Event Details</h3>
        <ul style="color:#34495e;">
        <li>Date: January 20th, 2024</li>
        <li>Time: 9:00 AM - 4:00 PM</li>
        <li>Venue: CS Seminar Hall, 3rd Floor</li>
        <li>Website: <a href="https://langchain-workshop.vercel.app" style="color:#3498db;">langchain-workshop.vercel.app</a></li>
        </ul>
        </div>

        <div style="background-color:#f0f7f4; padding:15px; border-radius:5px; margin:15px 0;">
        <h3 style="color:#2c3e50;">🔍 Prerequisites</h3>
        <ul style="color:#34495e;">
        <li>Laptop with charger (mandatory)</li>
        <li>Python 3.8 or higher installed</li>
        <li>Basic Python knowledge</li>
        <li>Mobile phone (if 2FA enabled for email)</li>
        </ul>
        </div>

        <div style="text-align:center; margin:20px 0;">
        <a href="https://t.me/langchain_workshop" style="display:inline-block; margin:10px;">
        <img src="https://th.bing.com/th?id=OSK.6f6ae071ce602cc99047297a8127b476" alt="Telegram" style="width:40px;">
        <br>Join Telegram Group
        </a>
        <a href="https://chat.whatsapp.com/workshop_group" style="display:inline-block; margin:10px;">
        <img src="https://th.bing.com/th?id=OSAAS.E589693F606AE4CB3E982768E2BA23AD" alt="WhatsApp" style="width:40px;">
        <br>Join WhatsApp Group
        </a>
        </div>

        <div style="background-color:#fff3cd; padding:15px; border-radius:5px; margin:15px 0;">
        <h3 style="color:#2c3e50;">⚠️ Important Notes</h3>
        <ul style="color:#34495e;">
        <li>Your attendance will be tracked using your USN: ${body.usn}</li>
        <li>For any queries, contact: +91 8867004280</li>
        <li>Please arrive 15 minutes early</li>
        </ul>
        </div>

        <p style="color:#7f8c8d; text-align:center; margin-top:20px;">Looking forward to an exciting learning experience!</p>
        
        <div style="text-align:center; margin-top:20px; padding-top:20px; border-top:1px solid #eee;">
        <p style="color:#95a5a6; font-size:12px;">© 2024 LangChain Workshop Team</p>
        </div>
      </div>
      </body>
      </html>
      `,
    };

    // Send the email via Brevo API (Sendinblue)
    if (!process.env.BREVO_API_KEY) {
      throw new Error('Brevo API key is not configured');
    }

    const brevoResponse = await fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      } as HeadersInit,
      body: JSON.stringify(emailPayload),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Brevo API error:", errorText);
      // Optionally, you can return an error response here or log it for further investigation.
    }

    return NextResponse.json({ message: 'Registration successful,Check your email for more deatils' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close(); // Ensure the MongoDB client is closed after the operation
  }
}
