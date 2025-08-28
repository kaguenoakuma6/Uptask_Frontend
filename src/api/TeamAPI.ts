import { isAxiosError } from "axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";
import api from "@/lib/axios";


export async function findUserByEmail({projectId, userEmail}: {projectId: Project['_id'], userEmail: TeamMemberForm}) 
{
    try 
    {
        const { data } = await api.post(`/projects/${projectId}/team/find`, userEmail);
        
        return data;
    }
    catch (error) 
    {
        if (isAxiosError(error) && error.response) 
        {
            throw new Error(error.response.data.error);
        }
    }
}


export async function addProjectMember({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) 
{
    try 
    {
        const { data } = await api.post<string>(`/projects/${projectId}/team`, {id});
        
        return data;
    }
    catch (error) 
    {
        if (isAxiosError(error) && error.response) 
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeProjectMember({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) 
{
    try 
    {
        const { data } = await api.delete<string>(`/projects/${projectId}/team/${id}`);
        
        return data;
    }
    catch (error) 
    {
        if (isAxiosError(error) && error.response) 
        {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectTeam(projectId: Project['_id']) 
{
    try 
    {
        const { data } = await api(`/projects/${projectId}/team`);
        const response = teamMembersSchema.safeParse(data);
        if(response.success)
        {
            return response.data;
        }
    }
    catch (error) 
    {
        if (isAxiosError(error) && error.response) 
        {
            throw new Error(error.response.data.error);
        }
    }
}