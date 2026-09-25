import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '../../../../lib/db';
import { json,field,email,rate,fail,RequestError } from '../../../../lib/api';
export async function POST(req:NextRequest){try{const data=await json(req);await rate(req,'lookup',20);const order=await queryOne('SELECT id,status,total,created_at FROM orders WHERE id=$1 AND email=$2',[field(data.id,'broj narudžbe',5,60).toUpperCase(),email(data.email)]) as {id:string;status:string;total:number;created_at:string}|undefined;if(!order)throw new RequestError('Narudžba nije pronađena. Provjerite broj i email adresu.',404);return NextResponse.json({id:order.id,status:order.status,total:order.total/100,createdAt:order.created_at})}catch(e){return fail(e)}}
