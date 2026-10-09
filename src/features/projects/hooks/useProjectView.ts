import { useState } from "react";
import { getProjectQuery } from "../services/queryService";


export default function useProjectView() {
    const [selected,setSelected] = useState<string|undefined|null>();
    const showProjectQuery = getProjectQuery(selected)

    const setSelectedProject = (id ?: string|null) => {
        setSelected(id);
    }
    
    return { 
        data: showProjectQuery.data ?? null,
        setSelectedProject
    }
}