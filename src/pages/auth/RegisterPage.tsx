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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useRegister from "@/features/auth/hooks/useRegister"
import { verifyLinkQuery } from "@/features/user-management/services/queryService"

import { useEffect, useState } from "react"

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue
  } = useRegister()
  const [link,setLink] = useState<string|undefined>();
  const verifyLink = verifyLinkQuery(link);
  const params = new URLSearchParams(window.location.search);
  const urlLink = params.get('link');


  const verifyInvitation = () => {
    if(! urlLink ) return;
    setLink(urlLink);
  }
  useEffect(() => {
    verifyInvitation()
  },[]);
  if(verifyLink.data && urlLink) {
    setValue('company',verifyLink.data.slug)
    setValue('link',urlLink)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" 
                {...register('name')}
              />
              <FieldError errors={[errors.name]}/>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
              <FieldError errors={[errors.email]}/>

            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register('password')} />
            
              <FieldError errors={[errors.password]}/>

            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" {...register('cpassword')} />
             
              <FieldError errors={[errors.cpassword]}/>

            </Field>
            <Field>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input id="company" type="text" placeholder="e.g. Company inc" 
              readOnly={!!link}
                {...register('company')}
              />
              <FieldError errors={[errors.company]}/>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
