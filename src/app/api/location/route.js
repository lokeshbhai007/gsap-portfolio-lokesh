import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Location from '@/models/Location';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { otp, location } = await request.json();
    
    if (!otp || !location) {
      return NextResponse.json(
        { error: 'OTP and location are required' },
        { status: 400 }
      );
    }

    // Validate location data
    if (!location.lat || !location.lng || !location.accuracy) {
      return NextResponse.json(
        { error: 'Invalid location data' },
        { status: 400 }
      );
    }

    // Delete any existing OTP (cleanup)
    await Location.deleteOne({ otp });

    // Create new location record
    const locationRecord = new Location({
      otp,
      location
    });

    await locationRecord.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Location stored successfully',
      otp,
      expiresIn: '15 minutes'
    });
    
  } catch (error) {
    console.error('MongoDB POST error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'OTP already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Database error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const otp = searchParams.get('otp');
    
    if (!otp) {
      return NextResponse.json(
        { error: 'OTP is required' },
        { status: 400 }
      );
    }

    // Find and delete the location record (one-time use)
    const locationRecord = await Location.findOneAndDelete({ otp });
    
    if (!locationRecord) {
      return NextResponse.json(
        { error: 'Invalid OTP or OTP expired' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      location: locationRecord.location,
      timestamp: locationRecord.createdAt.getTime(),
      success: true
    });
    
  } catch (error) {
    console.error('MongoDB GET error:', error);
    return NextResponse.json(
      { error: 'Database error: ' + error.message },
      { status: 500 }
    );
  }
}