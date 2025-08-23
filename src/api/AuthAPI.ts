import { isAxiosError } from "axios";
import type { ConfirmToken, ForgotPasswordForm, NewPasswordF, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";
import api from "@/lib/axios";

export async function createAccount(formData: UserRegistrationForm)
{
    try 
    {
        const { data } = await api.post<string>('/auth/create-account', formData);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(token: ConfirmToken)
{
    try 
    {
        const { data } = await api.post<string>('/auth/confirm-account', token);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestNewCode(email: RequestConfirmationCodeForm)
{
    try 
    {
        const { data } = await api.post<string>('/auth/request-code', email);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}


export async function login(userData: UserLoginForm)
{
    try 
    {
        const { data } = await api.post<string>('/auth/login', userData);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function forgotPassword(email: ForgotPasswordForm)
{
    try 
    {
        const { data } = await api.post<string>('/auth/forgot-password', email);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function validateToken(token: ConfirmToken)
{
    try 
    {
        const { data } = await api.post<string>('/auth/validate-token', token);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePassword({newPassword, token}: {newPassword: NewPasswordF,token: ConfirmToken['token']})
{
    try 
    {
        const { data } = await api.post<string>(`/auth/update-password/${token}`, newPassword);
        return data;
    } 
    catch (error) 
    {
        if(isAxiosError(error) && error.response)
        {
            throw new Error(error.response.data.error);
        }
    }
}