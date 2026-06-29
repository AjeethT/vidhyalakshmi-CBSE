import { NextRequest, NextResponse } from 'next/server';

/**
 * Image proxy route for local development
 * In production, this route is NOT used - images load directly from CDN
 * In development, this proxies CDN requests to bypass CORS/ORB restrictions
 * 
 * Usage: /api/image?url=encoded-cdn-url
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL parameter is required' },
        { status: 400 }
      );
    }

    // Decode the URL
    const decodedUrl = decodeURIComponent(imageUrl);

    // Validate it's from our CDN
    if (!decodedUrl.includes('cdn.vidhyalakshmi.cus.firrham.com')) {
      return NextResponse.json(
        { error: 'Invalid image source' },
        { status: 403 }
      );
    }

    // Fetch the image from CDN
    const response = await fetch(decodedUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: response.status }
      );
    }

    // Get content type
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    // Return the image with proper headers
    return new NextResponse(await response.arrayBuffer(), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
