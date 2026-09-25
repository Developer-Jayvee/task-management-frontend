import { useQuery } from "@tanstack/react-query";
import { identityCheck } from "../services/identity-checker";

export default function useVerifyIdentity() {
    return useQuery({
        queryKey: ['identity-verify'],
        queryFn: identityCheck,
        retry:false
    });
}