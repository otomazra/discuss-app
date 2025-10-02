'use server';
import * as auth from "@/auth";

export async function signIn(){
    auth.signIn('github');
}