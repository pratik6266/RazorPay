import dbconnect from '@/lib/db';
import userModel from '@/models/User'
import { NextRequest, NextResponse } from 'next/server';
import { genSalt, hash } from 'bcryptjs';

export async function POST(req: NextRequest){
  try {
    await dbconnect();

    const { email, password }: {
      email: string,
      password: string,
    } = await req.json();

    if(!email || !password){
      return NextResponse .json(
        {
          success: false,
          message: "All field are required"
        },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({
      email,
    });

    if(user){
      return NextResponse.json({
        success: false,
        message: "User already exists"
      }, {status: 400});
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    const newUser = await userModel.create({
      email,
      password: hashPassword,
    })

    return NextResponse.json({
      success: true,
      message: "User registered successfully"
    }, {status: 200});
  }
  catch (error) {
    console.error("Error in singup route", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong"
    }, {status: 500})
  }
}