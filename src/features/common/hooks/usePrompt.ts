import { useState } from "react"


export default function usePrompt() {
    const [open,setOpen] = useState<boolean>(false);
    const [promptDetails,setPromptDetails] = useState<{ title: string; description ?: string; }>({
        title: "",
        description : ""
    })

    

    return {
        open,setOpen,
        promptDetails,setPromptDetails
    }
}