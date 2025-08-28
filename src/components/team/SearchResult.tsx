import { addProjectMember } from "@/api/TeamAPI";
import type { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    member: TeamMember;
    reset: () => void
}
export default function SearchResult({ member, reset }: SearchResultProps) {

    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    
    const { mutate } = useMutation({
        mutationFn: addProjectMember,
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate(location.pathname, {replace: true});
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleAddMember = () => {
        const data = { projectId, id: member._id };
        mutate(data);
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{member.name}</p>
                <button className="text-purple-600 hover:bg-purple-200 px-10 py-3 font-bold cursor-pointer" onClick={handleAddMember}>Agregar al Proyecto</button>
            </div>
        </>
    )
}
