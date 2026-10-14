

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { resetPasswordMutation } from "@/features/reset-password/services/queryService"
import { type ResetPasswordAPIData, type ResetPasswordData, resetPasswordSchema } from "@/features/reset-password/types/resetPassword.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function ResetPasswordPage() {
    const query = resetPasswordMutation();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register
    } = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordSchema)
    })
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if(!token && !email) return <Navigate to="/" replace/>
    
    const onSubmit: SubmitHandler<ResetPasswordData> = async (data: ResetPasswordData) => {
        try {
            const formData = {
                ...data,
                token,
                email
            } as ResetPasswordAPIData
            await query.mutateAsync(formData);
            toast.success('Password reset successfully');
        } catch (error) {
            toast.error('Error upon reset. Please contant your admin for assistance');
            console.warn('Error in:',error);
        } finally {
            navigate('/login')
        }
    }
    return (
        <main className="flex min-h-screen items-center justify-center bg-transparent px-4 py-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset your password</CardTitle>
                    <CardDescription>
                        Enter and confirm your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="password">New password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    {...register('password')}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirm-password">
                                    Confirm password
                                </FieldLabel>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    {...register('password_confirmation')}
                                />
                            </Field>
                            <Button type="submit" className="w-full">
                                Reset password
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}