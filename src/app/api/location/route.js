// Store for OTP-location mapping (in production, use a real database)
const locationStore = new Map();

// Clean expired OTPs (older than 10 minutes)
const cleanExpiredOTPs = () => {
  const now = Date.now();
  const expireTime = 10 * 60 * 1000; // 10 minutes
  
  for (const [otp, data] of locationStore.entries()) {
    if (now - data.timestamp > expireTime) {
      locationStore.delete(otp);
    }
  }
};

export async function POST(request) {
  try {
    const { otp, location } = await request.json();
    
    if (!otp || !location) {
      return Response.json(
        { error: 'OTP and location are required' },
        { status: 400 }
      );
    }

    // Clean expired OTPs before storing new one
    cleanExpiredOTPs();
    
    // Store location data with OTP
    locationStore.set(otp, {
      location,
      timestamp: Date.now()
    });

    return Response.json({ 
      success: true, 
      message: 'Location stored successfully',
      otp 
    });
    
  } catch (error) {
    return Response.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const otp = searchParams.get('otp');
    
    if (!otp) {
      return Response.json(
        { error: 'OTP is required' },
        { status: 400 }
      );
    }

    // Clean expired OTPs before checking
    cleanExpiredOTPs();
    
    const data = locationStore.get(otp);
    
    if (!data) {
      return Response.json(
        { error: 'Invalid OTP or OTP expired' },
        { status: 404 }
      );
    }

    // Delete OTP after use (one-time use)
    locationStore.delete(otp);

    return Response.json({
      location: data.location,
      timestamp: data.timestamp
    });
    
  } catch (error) {
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}