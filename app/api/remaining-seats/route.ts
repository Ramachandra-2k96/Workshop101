import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const TOTAL_SEATS = 70;

export async function GET() {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('ai-workshop');
    const collection = database.collection('participants');

    // Get current participant count
    const participantCount = await collection.countDocuments();
    
    // Calculate remaining seats
    const remainingSeats = Math.max(0, TOTAL_SEATS - participantCount);

    return NextResponse.json({ remainingSeats }, { status: 200 });

  } catch (error) {
    console.error('Error fetching remaining seats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.close();
  }
}