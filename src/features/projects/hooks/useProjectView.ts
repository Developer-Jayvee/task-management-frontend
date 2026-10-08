import { useState } from "react";
import { getProjectQuery } from "../services/queryService";


export default function useProjectView() {
    const [selected,setSelected] = useState<string|undefined>();
    const showProjectQuery = getProjectQuery(selected)

    const setSelectedProject = (id ?: string) => {
        setSelected(id);
    }
    
    return { 
        data: showProjectQuery.data,
        setSelectedProject
    }
}