import dbConn from '@/utils/dbConn';
import Contact from '@/models/contact';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConn();

    await Contact.create(body);

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Server Error, please try again',
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
