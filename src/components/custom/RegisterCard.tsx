import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCard = () => {
  const navigate = useNavigate();
  const setToken = useTokenStore((state)=> state.setToken)

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      console.log("login success",response);
      //navigate
      setToken(response.data.accessToken)

      navigate("/dashboard/dash");
    },
  });

  const handleRegister = () => {

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //server call
    console.log("data", { email, password ,name});

    if (!name || !email || !password) {
      return alert("please enter all fields");
    }

    mutation.mutate({ email, password,name });
  };



  return (
    <>
      <Card className="mx-auto max-w-sm py-10 border-none rounded-lg ">
        <CardContent>
        {mutation.error && (
            <span className="text-red-500 text-sm break-before-auto">
              {mutation.error.message}
            </span>
          )}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-lg" htmlFor="first-name">
                  First name
                </Label>
                <Input ref={nameRef} id="first-name" placeholder="Ashish" required />
              </div>
              <div className="grid gap-2">
                <Label className="text-lg" htmlFor="last-name">
                  Last name
                </Label>
                <Input id="last-name" placeholder="Raj" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-lg" htmlFor="email">
                Email
              </Label>
              <Input
              ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-lg" htmlFor="password">
                Password
              </Label>
              <Input ref={passwordRef} id="password" type="password" />
            </div>
            <Button onClick={handleRegister}
              className="w-full rounded-full text-md py-6 px-8 mt-10"
              type="submit"
              disabled={mutation.isPending}
            >
             {mutation.isPending && <LoaderCircle className=" animate-spin" />}
            <span className="ml-2">Sign Up</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterCard;
